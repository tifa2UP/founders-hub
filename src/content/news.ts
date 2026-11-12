export type NewsItem = {
  when: string;
  title: string;
  summary: string;
  source?: { label: string; href: string };
  // Path to a full story on this site.
  story?: string;
};

// Newest first. Add new stories at the top.
export const NEWS: NewsItem[] = [
  {
    when: "5 Nov 2026",
    title: "Five women win Norway’s first physical AI hackathon",
    summary: "Fifty hand-picked NTNU students had four hours in Trondheim, with hardware from Atech and AI tools from Anthropic. Robot Sense won with a device that helps robots learn to feel what they touch.",
    story: "/news/first-physical-ai-hackathon",
  },
  {
    when: "Autumn 2026",
    title: "Native joins Y Combinator",
    summary: "Native gets into Y Combinator’s Fall 2026 batch. It is the third company from the hub to be accepted this year.",
    source: { label: "Nordic 9", href: "https://nordic9.com/news/native-norway-joined-y-combinator-fall-2026/" },
  },
  {
    when: "1 Oct 2026",
    title: "Orgbrain acquires Tilura",
    summary: "Orgbrain buys Tilura, the virtual data room company from the hub. The product continues as Orgbrain VDR.",
    source: {
      label: "Shifter",
      href: "https://www.shifter.no/nyheter/orgbrain-kjoper-opp-founders-hub-selskap/477560",
    },
  },
  {
    when: "22 Sep 2026",
    title: "Benford raises €5M to rebuild financial audit",
    summary: "Benford is a licensed Norwegian audit firm that builds its own software. firstminute capital, Global Founders Capital and Sondo put in €5M before the company had turned one.",
    source: {
      label: "Tech.eu",
      href: "https://tech.eu/2026/09/22/benford-raises-eur5m-to-rebuild-financial-audit-from-the-ground-up/",
    },
  },
  {
    when: "25 Aug 2026",
    title: "An A on a master’s thesis written by AI",
    summary: "Anders Rodem had an AI system write six master’s theses. Five passed and one got an A. The story ran in Aftenposten, DN and Universitetsavisa.",
    source: {
      label: "Aftenposten",
      href: "https://www.aftenposten.no/norge/i/oE8aWK/fikk-a-paa-masteroppgave-skrevet-av-ki",
    },
  },
  {
    when: "Aug 2026",
    title: "DNB joins Founders Hub",
    summary: "Norway’s largest bank becomes a partner, along with Amesto. “Perhaps a little un-Norwegian,” says the Shifter headline.",
    source: {
      label: "Shifter",
      href: "https://www.shifter.no/nyheter/dnb-gar-inn-i-founders-hub-det-er-kanskje-litt-unorsk/474817",
    },
  },
  {
    when: "9 Aug 2026",
    title: "Noah, 22, leaves EY for Benford",
    summary: "A summer job at EY was meant to be the start of a consulting career. Noah Syrdal quit when Benford offered him a job. DN writes about him in a piece on young people changing jobs.",
    source: {
      label: "DN",
      href: "https://www.dn.no/arbeidsliv/arbeidsliv/konsulenter/utdanning/flere-unge-vil-bytte-jobb-noah-22-sa-opp-konsulentjobben/2-1-2022171",
    },
  },
  {
    when: "10 Jul 2026",
    title: "Audun joins Y Combinator",
    summary: "Four Norwegian founders get into Y Combinator a month after starting the company. Audun does debt collection with AI, and is the second company from the hub to be accepted.",
    source: {
      label: "Shifter",
      href: "https://www.shifter.no/nyheter/enda-en-norsk-startup-tas-opp-i-y-combinator/470228",
    },
  },
  {
    when: "23 Jun 2026",
    title: "New head, and 25 fixed seats",
    summary: "Andreas Staune-Mittet, a former professional cyclist, takes over as head of Founders Hub. The hub grows from 23 founders to 25 fixed seats and 15 flex desks.",
    source: {
      label: "Shifter",
      href: "https://www.shifter.no/nyheter/tidligere-proffsyklist-blir-ny-sjef-for-satsehub/467988",
    },
  },
  {
    when: "12 Jun 2026",
    title: "Mimir raises $600k pre-seed",
    summary: "Mimir handles customer service and operations for online stores, and was already profitable when it raised. Sondo Capital led the round, with angels from VILLOID, Kry, Enode and Whitson.",
    source: {
      label: "BeBeez",
      href: "https://bebeez.eu/2026/06/12/profitable-oslo-based-ai-startup-mimir-raises-e518-3k-pre-seed-to-automate-e-commerce-operations/",
    },
  },
  {
    when: "13 Apr 2026",
    title: "Daymaker’s pitch cakes in Inc. and Forbes",
    summary: "William Lindholm, 20, sends personalised cakes to investors on behalf of founders. Inc., Forbes and Sifted have written about how he built the company with AI.",
    source: {
      label: "Inc.",
      href: "https://www.inc.com/mariapaula-gonzalez/this-founder-used-ai-to-build-a-thriving-business-out-of-customized-cake-pitches/91325967",
    },
  },
  {
    when: "6 Mar 2026",
    title: "Ara joins Y Combinator",
    summary: "Shifter writes about a golden age for Norwegian teams at Y Combinator and names Ara as one of three new ones. Ara is the first company from the hub to get in.",
    source: {
      label: "Shifter",
      href: "https://www.shifter.no/nyheter/gullalder-for-norske-team-pa-prestisjefylt-startupprogram-vi-er-inne-i-et-generasjonsskifte/456046",
    },
  },
  {
    when: "16 Jan 2026",
    title: "Podcast: the beginning of Founders Hub",
    summary: "Anders Mjåset and Trond Haugå explain why they started Founders Hub, in the first episode of Astar’s podcast Til Ungdommen. Recorded at Slush in Helsinki, in Norwegian.",
    source: { label: "Spotify", href: "https://open.spotify.com/episode/7EjPjdmNLCJydl0gH4rB0d" },
  },
  {
    when: "15 Nov 2025",
    title: "An “Olympiatoppen” for founders",
    summary: "Finansavisen on the plan behind Founders Hub: Anders Mjåset and Trond Haugå want to do for founders what Olympiatoppen does for Norway’s elite athletes. The doors opened in January 2026.",
    source: {
      label: "Finansavisen",
      href: "https://www.finansavisen.no/teknologi/2025/11/15/8306979/anders-mjaseth-og-trond-hauga-vil-skape-olympiatoppen-for-gruendere-gjennom-den-nye-satsingen-founders-hub",
    },
  },
];
