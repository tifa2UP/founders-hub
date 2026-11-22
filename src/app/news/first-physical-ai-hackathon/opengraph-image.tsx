import { shareImage, shareSize, shareType } from "@/components/site/shareImage";

export const alt = "Founders Hub: Five women won Norway’s first physical AI hackathon";
export const size = shareSize;
export const contentType = shareType;

export default function Image() {
  return shareImage("News · 9 Nov 2026", "Five women won Norway’s first physical AI hackathon");
}
