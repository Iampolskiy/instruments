import React from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/config/firebase.config";
import type { Metadata } from "next";
import Link from "next/link";

import { instrumentConverter } from "@/converter/instrumentConverter";

export const metadata: Metadata = {
  title: "My Instruments",
  description: "Music Instruments for your needs",
};

export default async function instrumentsPage() {
  const instrumentsRef = collection(db, "Instruments").withConverter(
    instrumentConverter
  );
  const instrumentsQuery = query(instrumentsRef, orderBy("id", "asc"));
  const querySnapshot = await getDocs(instrumentsQuery);

  const instruments = querySnapshot.docs.map((doc) => doc.data());

  return (
    <main className="text-center pt-32 px-5">
      <h2 className="text-4xl md:text-5xl font-bold mb-16">
        Music Instruments
      </h2>
      {instruments.map((instrument) => (
        <li key={instrument.id} className="mb-5">
          <Link href={`/instrument/${instrument.id}`}>
            {instrument.name} -{instrument.price}
          </Link>
        </li>
      ))}
    </main>
  );
}
