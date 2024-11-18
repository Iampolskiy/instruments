import React from "react";
import Link from "next/link";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/config/firebase.config";
import { instrumentConverter } from "@/converter/instrumentConverter";
import type { Metadata } from "next";

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
        <li className="mb-5 list-none" key={instrument.id}>
          <Link className="inline-block" href={`/instruments/${instrument.id}`}>
            <div className="text-3xl">{instrument.name}</div>
          </Link>
        </li>
      ))}
    </main>
  );
}
