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
    <main className=" pt-32 px-5">
      <h2 className="text-center text-4xl md:text-5xl font-bold mb-16">
        Categories
      </h2>
      <div className="flex flex-row justify-center flex-wrap gap-5">
        {instruments.map((instrument) => (
          <Link
            className=" mb-5 border border-zinc-400 rounded-lg p-5"
            href={`/${instrument.name}`}
            key={instrument.name}
          >
            <p>{instrument.name}</p>

            <Image
              className="w-[120px] h-[120px]"
              src={instrument.image ?? ""}
              width="120"
              height="120"
              alt="Instrument"
            />
          </Link>
        ))}
      </div>
    </main>
  );
}
