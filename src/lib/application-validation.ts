/** Accept LinkedIn profile and company URLs, including regional and legacy links. */
export function isLinkedInUrl(value: string): boolean {
  // URL() normalizes backslashes, whitespace, ports, and dot segments. Check the
  // original authority and path as well so those forms cannot disguise a URL.
  if (/[\s\\]/u.test(value)) return false;

  const parts = value.match(/^https?:\/\/([^/?#]+)(\/[^?#]*)?(?:[?#].*)?$/i);
  if (!parts) return false;

  try {
    const url = new URL(value);
    if (
      !/^(?:(?:www|[a-z]{2})\.)?linkedin\.com$/i.test(url.hostname) ||
      parts[1].toLowerCase() !== url.hostname ||
      url.username ||
      url.password ||
      url.port
    ) {
      return false;
    }

    const path = decodeURIComponent(parts[2] ?? "");
    return (
      /^\/(?:in|company)\/[\p{L}\p{M}\p{N}_-]+\/?$/u.test(path) ||
      /^\/pub\/[\p{L}\p{M}\p{N}_-]+\/[a-z0-9]+\/[a-z0-9]+\/[a-z0-9]+\/?$/iu.test(path)
    );
  } catch {
    return false;
  }
}
