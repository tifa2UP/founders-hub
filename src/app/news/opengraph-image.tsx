import { shareImage, shareSize, shareType } from "@/components/site/shareImage";

export const alt = "Founders Hub: News from the hub";
export const size = shareSize;
export const contentType = shareType;

export default function Image() {
  return shareImage("News", "From the hub.");
}
