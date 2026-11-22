import { shareImage, shareSize, shareType } from "@/components/site/shareImage";

export const alt = "Founders Hub: Apply for Residency";
export const size = shareSize;
export const contentType = shareType;

export default function Image() {
  return shareImage("Apply", "Apply for Residency");
}
