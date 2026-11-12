export type Launch = {
  company: string;
  what: string;
  // Where the video opens. "file" plays in place on this page.
  on: "YouTube" | "X" | "LinkedIn" | "file";
  href: string;
  // Still image shown before the video is opened. Without one, the company name is shown instead.
  thumb?: string;
  note?: string;
};

// A short, strict selection: the launch videos that travelled furthest. Not a list of every company.
export const LAUNCHES: Launch[] = [
  {
    company: "Qaf",
    what: "Ask any Islamic question and get an answer researched across more than 8,000 books, with citations.",
    on: "X",
    href: "https://x.com/Abdella6if/status/2085061612285632853",
    thumb: "https://pbs.twimg.com/amplify_video_thumb/2085058976954060800/img/LBLikFTbW4wMXiHG?format=jpg&name=medium",
    note: "4.7 million views",
  },
  {
    company: "Reason Machines",
    what: "Launched as Ara, the self-driving IDE, when it joined Y Combinator.",
    on: "YouTube",
    href: "https://youtu.be/6ASb9QW2QEw",
    thumb: "https://i.ytimg.com/vi/6ASb9QW2QEw/hqdefault.jpg",
  },
  {
    company: "Native",
    what: "Introducing Norn, artificial intuition for marketing.",
    on: "YouTube",
    href: "https://youtu.be/YTpaKxp1NOs",
    thumb: "https://i.ytimg.com/vi/YTpaKxp1NOs/hqdefault.jpg",
  },
  {
    company: "Audun",
    what: "Out of stealth: debt collection rebuilt from the ground up.",
    on: "LinkedIn",
    href: "https://www.linkedin.com/posts/auduncollection_out-of-stealth-today-were-rebuilding-debt-activity-7497717618397614080-Pu0A",
    thumb: "https://drive.google.com/thumbnail?id=1X9mVp2ZyJMUhCcHN6NadzMNLV5S63Wpv&sz=w960",
  },
  {
    company: "Daymaker",
    what: "Finds your prospects, reads their digital footprint and sends the one gift that gets you the meeting.",
    on: "LinkedIn",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7519005264386240512",
    thumb: "https://media.licdn.com/dms/image/v2/D4E05AQEOWCOnQ8NDhg/videocover-high/B4EaFe3zFgGsBM-/0/1792593075218?e=2147483647&v=beta&t=eHvvSDzETR0DL6ic50x4wagQrC8ieuyoE-i5-1oR4iA",
  },
  {
    company: "Dagny",
    what: "The new Dagny: an interface for AI that builds itself around the work you are doing.",
    on: "X",
    href: "https://x.com/einar_m/status/2118317994598178894",
  },
  {
    company: "Skriptr",
    what: "The AI workspace for students, open to every student.",
    on: "YouTube",
    href: "https://www.youtube.com/watch?v=u1EPDaQ2Jtc",
    thumb: "https://i.ytimg.com/vi/u1EPDaQ2Jtc/hqdefault.jpg",
  },
  {
    company: "Mimir",
    what: "The AI agent that takes over customer service for online stores.",
    on: "LinkedIn",
    href: "https://www.linkedin.com/posts/jrgenhalse_today-were-proud-to-launch-mimir-fast-growing-ugcPost-7447932284625801217-HRCY/",
    thumb: "https://media.licdn.com/dms/image/v2/D4E05AQFBZzO14ZINNg/videocover-high/B4EZ1xfC9zJUBY-/0/1775725463484?e=2147483647&v=beta&t=NrquGUJRQzFB3ER3YxQY-sjROyMTQXuHbQ41Kyv47MU",
  },
];
