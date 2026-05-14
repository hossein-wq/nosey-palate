import type { Metadata } from "next";
import SignupForm from "./signup-form";

export const metadata: Metadata = {
  title: "Join the Community",
  description: "Apply to join The Nosey Palate — a private wine membership community of curated tastings, dinners, and global experiences.",
  alternates: { canonical: "/signup" },
  openGraph: {
    title: "Join The Nosey Palate",
    description: "Apply to join an exclusive wine membership community. Curated tastings, private dinners, and global wine experiences.",
  },
};

export default function SignupPage() {
  return <SignupForm />;
}
