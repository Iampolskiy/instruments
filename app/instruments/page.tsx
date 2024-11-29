import React from "react";

import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/config/firebase.config";
import { instrumentConverter } from "@/converter/instrumentConverter";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "My Instruments",
  description: "Music Instruments for your needs",
};

export default async function instrumentsPage() {
  const instrumentsRef = collection(db, "Categories").withConverter(
    instrumentConverter
  );
  const instrumentsQuery = query(instrumentsRef);
  const querySnapshot = await getDocs(instrumentsQuery);

  const instruments = querySnapshot.docs.map((doc) => doc.data());

  return (
    <main className="text-center pt-32 px-5">
      <h2 className="text-4xl md:text-5xl font-bold mb-16">
        Music Instruments
      </h2>
      {instruments.map((instrument) => (
        <li className="mb-5 list-none" key={instrument.name}>
          <p>{instrument.name}</p>

          <Image
            className="mx-auto"
            src={instrument.image ?? ""}
            width={40}
            height={40}
            alt="Instrument"
          />
        </li>
      ))}
    </main>
  );
}
