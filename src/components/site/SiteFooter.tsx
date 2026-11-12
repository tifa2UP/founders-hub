import Link from "next/link";

import { EMAIL, LINKEDIN } from "./links";

export default function SiteFooter() {
  return (
    <footer>
      <div className="foot mono" style={{ borderTop: "1px solid var(--line)" }}>
        <Link href="/launches">Launches</Link>
        <Link href="/news">News</Link>
        <Link href="/faq">FAQ</Link>
        <a href={`mailto:${EMAIL}`}>Contact</a>
        <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">
          LinkedIn ↗
        </a>
        <span>Mesh Youngstorget, Oslo</span>
      </div>
    </footer>
  );
}
