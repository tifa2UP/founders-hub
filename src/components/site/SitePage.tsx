import Link from "next/link";

import "../home/home.css";
import "./pages.css";
import SiteFooter from "./SiteFooter";

// Shared frame for the plain text pages (FAQ, News): same header, type and footer as the homepage.
export default function SitePage({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="fh-home fh-page">
      <header className="nav">
        <Link href="/" className="brand">
          <b>FOUNDERS HUB</b>
        </Link>
        <ul className="mono">
          <li>
            <Link href="/news">News</Link>
          </li>
          <li>
            <Link href="/faq">FAQ</Link>
          </li>
          <li>
            <Link href="/apply">Apply</Link>
          </li>
        </ul>
      </header>
      <main className="wrap">
        <span className="mono page-label">{label}</span>
        <h1>{title}</h1>
        {children}
        <div className="page-cta">
          <Link className="apply-btn" href="/apply">
            Apply <span>→</span>
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
