import type { Metadata } from "next";
import Link from "next/link";

import SitePage from "@/components/site/SitePage";

const TITLE = "Five women won Norway’s first physical AI hackathon";
const LEAD =
  "Five women beat the rest of NTNU’s AI talent when Founders Hub held Norway’s first physical AI hackathon in Trondheim. Four of them now plan to keep building together.";
const PATH = "/news/first-physical-ai-hackathon";

export const metadata: Metadata = {
  title: TITLE,
  description: LEAD,
  alternates: { canonical: PATH },
  openGraph: { title: TITLE, description: LEAD, type: "article", url: PATH, publishedTime: "2026-11-09" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  headline: TITLE,
  description: LEAD,
  datePublished: "2026-11-09",
  inLanguage: "en",
  mainEntityOfPage: `https://www.founder-hub.com${PATH}`,
  author: { "@id": "https://www.founder-hub.com/#organization" },
  publisher: { "@id": "https://www.founder-hub.com/#organization" },
};

export default function HackathonArticle() {
  return (
    <SitePage label="News · 9 Nov 2026" title={TITLE} variant="article">
      <article className="article">
        <p className="lead">{LEAD}</p>

        <p>
          On Thursday 5 November, 50 hand-picked students stood on the top floor of Digs in Trondheim with four hours on
          the clock. The task was to build something that actually works, hardware and software both, and then convince
          the jury that someone would pay for it.
        </p>
        <p>
          It is the first time a Norwegian hackathon has combined the two. The teams were given hardware kits from the
          Danish company Atech and AI tools from Anthropic, and had to make artificial intelligence work out in the
          physical world, not only on a screen. That is what physical AI means.
        </p>

        <h2>A clear win</h2>
        <p>
          As at most hackathons, most of those who applied and turned up were men. The winners were five women, and it
          was not close.
        </p>
        <p>
          Robot Sense, five NTNU students of whom several are part of Women in AI, built a device that collects data for
          training models in tactile sensing for robots. Tactile sensing means that a robot can feel what it is holding,
          not just see it. The device does not measure touch directly. It uses sound: it records echoes and reports how
          different materials in a room reflect them. The jury pointed to the technical level and to the fact that the
          project goes after a real problem in robotics.
        </p>
        <p>
          The prize was 15,000 kroner, access to the Founders Hub network and the chance of a seat in the hub. After the
          cheque was handed over, four of them decided to continue together. They are now mapping the market for tactile
          sensing, with the aim of starting something in physical AI.
        </p>
        <blockquote>
          <p>
            “None of us had been to a hackathon before, but when the chance came up we just had to go for it. We started
            Women in AI to get more women into tech, so we have to sign up ourselves too. The response we got made us
            want more, and it showed that thinking ambitiously pays off. When we can build something that works in four
            hours with AI tools and hardware, it is fun to think about what we could do with a hundred times the time
            and resources.”
          </p>
          <p>
            “There are far too few female founders in tech. Everyone talks about how important diversity is, and
            everyone is going to use AI, so everyone has to take part in building it too. A homogeneous group cannot
            build a product for everyone. We want to be role models, and we hope more people see that signing up for a
            hackathon is not that scary.”
          </p>
          <footer>Ida Tomine Berg, Women in AI NTNU, master’s student in physics and mathematics at NTNU</footer>
        </blockquote>

        <h2>“They have what it takes”</h2>
        <blockquote>
          <p>
            “These are fourth- and fifth-year students with skills in robotics and AI. They went straight for the
            hardest problem and got it working in four hours. It was extremely impressive. Norway has more than enough
            talent like this. The problem is that far too many of them go straight into a safe job. We believe everyone
            on this team has what it takes to build the next generation of Norwegian startups, and we will follow up
            all five. These are exactly the people we exist for.”
          </p>
          <footer>Andreas Staune-Mittet, head of Founders Hub</footer>
        </blockquote>
        <p>Jon Kåre Stene, partner at Skyfall Ventures, opened the evening and stayed until the last pitch.</p>
        <blockquote>
          <p>
            “There was something in that room. Fifty students who just get going and make things work in a few hours.
            The room for young founders has never been bigger than it is now. With AI, a small team can build things
            that took a whole company a few years ago. But someone has to bring them together and show them it can be
            done. That is why initiatives like Founders Hub matter, and why we need more events like this.”
          </p>
          <footer>Jon Kåre Stene, partner, Skyfall Ventures</footer>
        </blockquote>
        <p>
          The hackathon was a pilot, held together with DNB and the hub’s other partners. The aim is to get more of
          NTNU’s strongest students to build companies instead of going straight into an ordinary job after their
          studies. The hub will do more of this from here on.
        </p>

        <p className="mono note">
          Robot Sense: Lone Mæland, Andrea Gladhaug, Elvin Günes Kader, Ida Tomine Berg and Kristine Skinlo. Quotes
          translated from Norwegian.
        </p>
        <Link className="mono src" href="/news">
          ← All news
        </Link>
      </article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </SitePage>
  );
}
