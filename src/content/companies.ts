export type Company = {
  name: string;
  what: string;
  website?: string;
  // Big moments, newest first. Keep to clear wins.
  milestones?: { when: string; text: string; href?: string }[];
  // "Launch video" unless videoLabel says otherwise.
  video?: string;
  videoLabel?: string;
  launchPost?: string;
  linkedin?: string;
  x?: string;
};

// Companies with milestones first, then the rest alphabetically.
export const COMPANIES: Company[] = [
  {
    name: "Reason Machines",
    what: "Formerly Ara. A coding agent that works alongside other agents such as Claude Code, Codex and Cursor.",
    website: "https://reasonmachines.com/",
    milestones: [
      {
        when: "Mar 2026",
        text: "Into Y Combinator, the first company from the hub",
        href: "https://www.shifter.no/nyheter/gullalder-for-norske-team-pa-prestisjefylt-startupprogram-vi-er-inne-i-et-generasjonsskifte/456046",
      },
    ],
    video: "https://youtu.be/6ASb9QW2QEw",
    launchPost: "https://www.ycombinator.com/launches/Qcm-ara-the-world-s-first-self-driving-ide",
    linkedin: "https://www.linkedin.com/company/reasonmachines",
    x: "https://x.com/reasonmachines",
  },
  {
    name: "Audun",
    what: "Automates the follow-up of unpaid invoices and debt collection, from first reminder to payment plan.",
    website: "https://audun.co/",
    milestones: [
      {
        when: "Jul 2026",
        text: "Into Y Combinator, a month after the company was started",
        href: "https://www.shifter.no/nyheter/enda-en-norsk-startup-tas-opp-i-y-combinator/470228",
      },
    ],
    video: "https://drive.google.com/file/d/1X9mVp2ZyJMUhCcHN6NadzMNLV5S63Wpv/view?usp=sharing",
    launchPost: "https://www.ycombinator.com/launches/Sx3-audun-ai-native-debt-collection",
  },
  {
    name: "Native",
    what: "Creates, publishes and improves a business’s social media content.",
    website: "https://native.no/",
    milestones: [
      {
        when: "Autumn 2026",
        text: "Into Y Combinator, the third company from the hub",
        href: "https://nordic9.com/news/native-norway-joined-y-combinator-fall-2026/",
      },
    ],
    video: "https://youtu.be/YTpaKxp1NOs",
    launchPost: "https://www.ycombinator.com/launches/Vdd-native-artificial-intuition-for-marketing",
    linkedin: "https://www.linkedin.com/company/trynative/",
    x: "https://x.com/trynativeapp",
  },
  {
    name: "Benford",
    what: "An audit firm that runs statutory audits on its own software, signed by qualified auditors.",
    website: "https://benford.tech/",
    milestones: [
      {
        when: "Sep 2026",
        text: "Raised €5M, led by firstminute capital",
        href: "https://tech.eu/2026/09/22/benford-raises-eur5m-to-rebuild-financial-audit-from-the-ground-up/",
      },
    ],
    linkedin: "https://www.linkedin.com/company/benford-audit/",
  },
  {
    name: "Mimir",
    what: "An AI agent that handles customer service for online stores.",
    website: "https://trymimir.com/",
    milestones: [
      {
        when: "Jun 2026",
        text: "Raised a $600k pre-seed, already profitable",
        href: "https://bebeez.eu/2026/06/12/profitable-oslo-based-ai-startup-mimir-raises-e518-3k-pre-seed-to-automate-e-commerce-operations/",
      },
    ],
    video: "https://static.trymimir.com/Mimir_presanyasjonsfilm2_edit1.mp4_1080p.mp4",
    launchPost: "https://trymimir.com/articles/mimir-launch",
  },
  {
    name: "Tilura",
    what: "A virtual data room for due diligence in M&A. Now Orgbrain VDR.",
    website: "https://tilura.com/",
    milestones: [
      {
        when: "Oct 2026",
        text: "Acquired by Orgbrain",
        href: "https://www.shifter.no/nyheter/orgbrain-kjoper-opp-founders-hub-selskap/477560",
      },
    ],
    linkedin: "https://www.linkedin.com/company/tilura/",
  },
  {
    name: "Daymaker",
    what: "Researches sales prospects and sends each one a personal gift. Known for pitches printed on cakes.",
    website: "https://daymaker.com/",
    milestones: [
      {
        when: "Apr 2026",
        text: "Profiled in Inc., Forbes and Sifted",
        href: "https://www.inc.com/mariapaula-gonzalez/this-founder-used-ai-to-build-a-thriving-business-out-of-customized-cake-pitches/91325967",
      },
    ],
    linkedin: "https://www.linkedin.com/company/daymakerhq",
    x: "https://x.com/daymakerguy",
  },
  {
    name: "Agentset",
    what: "An open-source platform for building AI chat and search over your own documents.",
    website: "https://agentset.ai/",
    linkedin: "https://www.linkedin.com/company/agentset",
    x: "https://x.com/agentset_ai",
  },
  {
    name: "Ask Poppy",
    what: "A voice-first AI without a screen that helps kids think through homework instead of giving answers.",
    website: "https://askpoppy.ai/",
  },
  {
    name: "Astar",
    what: "Builds AI systems for companies, and runs the Norwegian AI Championship.",
    website: "https://www.astar.sh/",
    linkedin: "https://www.linkedin.com/company/astarconsulting/",
    x: "https://x.com/AstarNo",
  },
  {
    name: "Aurora",
    what: "A career platform that maps your skills against the role you want.",
    website: "https://auroraguide.ai/",
  },
  {
    name: "DataFabric",
    what: "An AI and data consultancy in Oslo.",
    website: "https://datafabric.no/",
  },
  {
    name: "DealSharp",
    what: "A negotiation tool for lawyers and M&A advisors: rehearsal, help in live meetings and tracking of open items.",
    website: "https://www.dealsharp.ai/",
    video: "https://www.dealsharp.ai/videos/flight-simulator-hd.mp4",
    videoLabel: "Demo video",
  },
  {
    name: "Drippa",
    what: "Roadmap, specs, tickets and testing in one tool, shared by a team and its AI agents.",
    website: "https://drippa.ai/",
  },
  {
    name: "Homi",
    what: "A home search that gathers listings, costs, notes and group chats in one place.",
    website: "https://www.homi.so/",
    video: "https://www.youtube.com/watch?v=8NnYznlcuNc",
    videoLabel: "Demo video",
    linkedin: "https://linkedin.com/company/homi-hq",
    x: "https://x.com/use_homi",
  },
  {
    name: "KA Labs",
    what: "AI agents that check invoices against agreements before payment, to catch overcharges.",
    website: "https://ka-labs.io/",
    linkedin: "https://www.linkedin.com/company/k-a-labs/",
  },
  {
    name: "Livity",
    what: "A preventive doctor service at the workplace.",
    website: "https://www.livity.no/",
  },
  {
    name: "Meso Manufacturing",
    what: "Designs and 3D-prints large polymer parts in Trondheim.",
    website: "https://www.mesomanufacturing.com/",
    linkedin: "https://www.linkedin.com/company/meso-manufacturing",
    x: "https://x.com/mesomanu",
  },
  {
    name: "MyPattern",
    what: "An app with personal sound therapy and soundscapes for focus and rest.",
    website: "https://www.mypattern.app/",
  },
  {
    name: "Qaf",
    what: "An AI assistant for learning and asking questions about Islam.",
    website: "https://qaf.ai/",
    x: "https://x.com/qafdotai",
  },
  {
    name: "Ryra",
    what: "An app for working with AI agents on your own computer or server.",
    website: "https://ryra.dev/",
  },
  {
    name: "Skriptr",
    what: "An AI workspace where students learn courses, prepare for exams and write papers.",
    website: "https://skriptr.ai/",
    video: "https://www.youtube.com/watch?v=u1EPDaQ2Jtc",
    linkedin: "https://linkedin.com/company/skriptr",
    x: "https://x.com/useskriptr",
  },
  {
    name: "Tidepoint",
    what: "Turns data from the salmon value chain into real-time supply information and weekly estimates.",
    website: "https://tidepoint.no/",
    linkedin: "https://www.linkedin.com/company/tidepoint-asa/",
  },
  {
    name: "TO SEE",
    what: "A learning platform that combines course authoring and delivery, built around AI agents.",
    website: "https://tosee.co/",
    video: "https://tosee.co/videos/landing/meet-tosee-nb.mp4",
    videoLabel: "Intro video",
    linkedin: "https://www.linkedin.com/company/tosee-as/",
  },
  {
    name: "toolbar",
    what: "Keeps track of a company’s software subscriptions, access, renewals and spend.",
    website: "https://www.toolbar.no/",
  },
  {
    name: "Vai",
    what: "A case-handling system for municipalities, where AI reviews documents, maps and rules and drafts decisions.",
    website: "https://vedtak.ai/",
    linkedin: "https://www.linkedin.com/company/vedtak-ai",
  },
];

// The id of a YouTube video, when the launch video is hosted there.
export function youtubeId(url?: string): string | null {
  if (!url) return null;
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
  return m ? m[1] : null;
}
