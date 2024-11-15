import React from "react";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Instruments",
  description: "Music Instruments for your needs",
};

export default function Page() {
  return (
    <main className="text-center pt-32 px-5">
      <h2 className="text-4xl md:text-5xl font-bold mb-5">Music Instruments</h2>
    </main>
  );
}
