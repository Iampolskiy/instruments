import React from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/config/firebase.config";
import { instrumentConverter } from "@/converter/instrumentConverter";
import { Params } from "next/dist/server/request/params";

export default async function page({ params }: { params: Params }) {
  const instrumentsRef = collection(db, "Instruments").withConverter(
    instrumentConverter
  );
  const instrumentsQuery = query(instrumentsRef, orderBy("id", "asc"));
  const querySnapshot = await getDocs(instrumentsQuery);

  const instruments = querySnapshot.docs.map((doc) => doc.data());
  const instrumentId = params.id;
  const instrument = instruments.find(
    (instrument) => instrument.id === instrumentId
  );

  if (!instrument) {
    return (
      <main className="text-center pt-32 px-5">
        <h2 className="text-4xl md:text-5xl font-bold mb-5">
          Instrument not found
        </h2>
      </main>
    );
  }

  return (
    <main className=" text-center px-7 pt-24 ">
      <h1 className="max-w-[750px] mx-auto text-5xl font-semibold mb-7 break-words whitespace-normal ">
        {instrument?.name}
      </h1>
      <p className="max-w-[750px] mx-auto break-words">{instrument?.price}</p>
    </main>
  );
}
