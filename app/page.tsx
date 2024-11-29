import React from "react";

import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/config/firebase.config";

/* import { instrumentConverter } from "@/converter/instrumentConverter";
 */

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Categories",
  description: "Music Instruments for your needs",
};

export default async function instrumentsPage() {
  const instrumentsRef = collection(db, "Categories"); /* .withConverter(
    instrumentConverter
  ); */
  const instrumentsQuery = query(instrumentsRef);
  const querySnapshot = await getDocs(instrumentsQuery);

  const instruments = querySnapshot.docs.map((doc) => doc.data());

  console.log(instruments);

  return (
    <main className="text-center pt-32 px-5">
      <h2 className="text-4xl md:text-5xl font-bold mb-16">Categories</h2>
      {instruments.map((instrument) => (
        <Link
          href={`/${instrument.name}`}
          className="mb-5"
          key={instrument.name}
        >
          <p>{instrument.name}</p>

          <Image
            className="mx-auto w-[80px] h-[80px]"
            src={instrument.image ?? ""}
            width="120"
            height="120"
            alt="Instrument"
          />
        </Link>
      ))}
    </main>
  );
}
