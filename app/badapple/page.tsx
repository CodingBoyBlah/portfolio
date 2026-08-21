import type { Metadata } from "next";
import type React from "react";
import BadAppleClient from "./BadAppleClient";

export const metadata: Metadata = {
  title: "Bad Apple!! — 17×9",
};

export default function BadApplePage() {
  return (
    <main
      className="flex min-h-screen items-center justify-center bg-[#262629] p-10 sm:p-20"
      aria-label="Bad Apple played on a 17 by 9 pixel grid"
    >
      <BadAppleClient />
    </main>
  );
}
