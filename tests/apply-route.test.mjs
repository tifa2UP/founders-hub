import { afterAll, afterEach, beforeEach, describe, expect, mock, spyOn, test } from "bun:test";

const send = mock();
const createResend = mock();
mock.module("resend", () => ({
  Resend: class {
    constructor() {
      createResend();
    }
    emails = { send };
  },
}));

const { POST } = await import("../src/app/api/apply/route.ts");
const envKeys = ["RESEND_API_KEY", "APPLICATION_RECIPIENTS", "APPLICATION_FROM_EMAIL"];
const originalEnv = Object.fromEntries(envKeys.map((key) => [key, process.env[key]]));
let consoleError;

beforeEach(() => {
  process.env.RESEND_API_KEY = "test-key";
  process.env.APPLICATION_RECIPIENTS = " admin@example.com, second-admin@example.com ";
  process.env.APPLICATION_FROM_EMAIL = "Founders Hub <applications@example.com>";
  send.mockReset();
  send.mockResolvedValue({ data: { id: "test-email" }, error: null });
  createResend.mockClear();
  consoleError = spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => consoleError.mockRestore());
afterAll(() => {
  for (const key of envKeys) {
    if (originalEnv[key] === undefined) delete process.env[key];
    else process.env[key] = originalEnv[key];
  }
});

function submit(payload) {
  return POST(new Request("https://example.com/api/apply", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }));
}

function expectNoNotification() {
  expect(createResend).not.toHaveBeenCalled();
  expect(send).not.toHaveBeenCalled();
}

describe("submission spam protection", () => {
  test.each(["https://example.com", "https://www.example.com/in/person"])(
    "blocks the observed random-domain submission pattern: %s",
    async (linkedin) => {
      // Synthetic fixture with the same shape as the spam; no applicant data.
      const response = await submit({
        email: "a.pplicant@example.com",
        linkedin,
        notes: "qRfTkZmWxYpLsNvB",
      });
      expect(response.status).toBe(400);
      expect((await response.json()).error).toContain("LinkedIn profile or company URL");
      expectNoNotification();
    },
  );

  test.each([
    "https://linkedin.com.example.com/in/person",
    "https://example.com/linkedin.com/in/person",
    "https://notlinkedin.com/in/person",
    "https://linkedin.com@www.example.com/in/person",
    "https://person:password@linkedin.com/in/person",
    "https://linkedin.com:443/in/person",
    "http://linkedin.com:80/in/person",
    "https://linkedin.com:8443/in/person",
    "https://linkedin.com./in/person",
    "https://www.no.linkedin.com/in/person",
    "https://evil.linkedin.com/in/person",
    "ftp://linkedin.com/in/person",
    "javascript:alert(1)",
    "//linkedin.com/in/person",
    "linkedin.com/in/person",
    "https:linkedin.com/in/person",
    "https://linkedin.com\\in\\person",
    "https://linke\ndin.com/in/person",
    "https://linkedin.com/",
    "https://linkedin.com/in/",
    "https://linkedin.com/in/person/extra",
    "https://linkedin.com/in/person%2Fextra",
    "https://linkedin.com/in/%ZZ",
    "https://linkedin.com/in/%20",
    "https://linkedin.com/in/person/../other",
    "https://linkedin.com/in/%2E%2E/in/person",
    "https://linkedin.com/pub/person/one/two",
  ])("rejects deceptive or malformed LinkedIn URLs without sending: %s", async (linkedin) => {
    const response = await submit({ email: "applicant@example.com", linkedin });
    expect(response.status).toBe(400);
    expectNoNotification();
  });

  test("acknowledges a filled honeypot without validating or emailing the bot payload", async () => {
    const response = await submit({
      email: "invalid",
      linkedin: "https://example.com",
      website: "https://example.com",
    });
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
    expectNoNotification();
  });
});

describe("legitimate applications", () => {
  test.each([
    "https://linkedin.com/in/person",
    "https://www.linkedin.com/in/person/",
    "http://www.linkedin.com/in/person",
    "https://no.linkedin.com/in/person",
    "https://uk.linkedin.com/in/person/",
    "HTTPS://WWW.LINKEDIN.COM/in/person",
    "https://linkedin.com/in/ren%C3%A9-person",
    "https://linkedin.com/in/rené-person",
    "https://linkedin.com/in/person?utm_source=share#profile",
    "https://linkedin.com/pub/person/12/abc/34/",
    "https://no.linkedin.com/pub/ren%C3%A9-person/12/abc/34/",
    "https://www.linkedin.com/company/example-company/",
    "  https://linkedin.com/in/person  ",
  ])("notifies admins for supported LinkedIn links: %s", async (linkedin) => {
    const response = await submit({
      email: "a.pplicant@example.com",
      linkedin,
      notes: "I am building a startup and looking for an Oslo workspace.",
      website: "",
    });
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
    expect(send).toHaveBeenCalledTimes(1);
    expect(send.mock.calls[0][0]).toMatchObject({
      to: ["admin@example.com", "second-admin@example.com"],
      replyTo: "a.pplicant@example.com",
    });
    expect(send.mock.calls[0][0].text).toContain(`LinkedIn: ${linkedin.trim()}`);
  });

  test.each([
    { email: "applicant@example.com" },
    { email: "applicant@example.com", linkedin: "", notes: "", website: "" },
    { email: "applicant@example.com", linkedin: "   ", website: "   " },
    { email: "applicant@example.com", notes: "I run https://example.com and am looking for a desk." },
  ])("preserves optional fields and older clients: %j", async (payload) => {
    const response = await submit(payload);
    expect(response.status).toBe(200);
    expect(send).toHaveBeenCalledTimes(1);
  });

  test("preserves plain text and escapes user content in the admin email", async () => {
    const notes = 'Building <script>alert("example")</script> & a product';
    await submit({ email: "applicant@example.com", notes });
    const message = send.mock.calls[0][0];
    expect(message.text).toContain(notes);
    expect(message.html).toContain("&lt;script&gt;");
    expect(message.html).not.toContain("<script>");
  });
});

describe("existing errors", () => {
  test.each([
    ["invalid email", { email: "invalid" }],
    ["null LinkedIn", { email: "applicant@example.com", linkedin: null }],
    ["oversized notes", { email: "applicant@example.com", notes: "x".repeat(5001) }],
    ["nonstring honeypot", { email: "applicant@example.com", website: false }],
    ["null payload", null],
  ])("rejects %s without notification", async (_description, payload) => {
    const response = await submit(payload);
    expect(response.status).toBe(400);
    expectNoNotification();
  });

  test("returns 400 for malformed JSON", async () => {
    const response = await POST(new Request("https://example.com/api/apply", {
      method: "POST", body: "{",
    }));
    expect(response.status).toBe(400);
    expectNoNotification();
  });

  test.each(envKeys)("returns 503 when %s is missing", async (key) => {
    delete process.env[key];
    const response = await submit({ email: "applicant@example.com" });
    expect(response.status).toBe(503);
    expectNoNotification();
  });

  test("returns 503 for an empty recipient list", async () => {
    process.env.APPLICATION_RECIPIENTS = " , ";
    const response = await submit({ email: "applicant@example.com" });
    expect(response.status).toBe(503);
    expectNoNotification();
  });

  test("returns 502 when the email provider rejects a genuine application", async () => {
    send.mockResolvedValueOnce({ error: { message: "test rejection" } });
    const response = await submit({ email: "applicant@example.com" });
    expect(response.status).toBe(502);
    expect(send).toHaveBeenCalledTimes(1);
  });

  test("returns 500 when the email provider throws", async () => {
    send.mockRejectedValueOnce(new Error("test provider failure"));
    const response = await submit({ email: "applicant@example.com" });
    expect(response.status).toBe(500);
    expect(send).toHaveBeenCalledTimes(1);
  });
});
