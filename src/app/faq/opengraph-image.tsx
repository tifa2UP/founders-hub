import { shareImage, shareSize, shareType } from "@/components/site/shareImage";

export const alt = "Founders Hub: Questions, answered";
export const size = shareSize;
export const contentType = shareType;

export default function Image() {
  return shareImage("FAQ", "Questions, answered.");
}
