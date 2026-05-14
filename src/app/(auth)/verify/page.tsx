import type { Metadata } from "next";
import VerifyContent from "./verify-content";

export const metadata: Metadata = {
  title: "Verify Email",
  description: "Verify your email address to activate your Nosey Palate account.",
  robots: { index: false, follow: false },
};

export default function VerifyPage() {
  return <VerifyContent />;
}
