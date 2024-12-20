import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase.config";
import Link from "next/link";
import Image from "next/image";

type Params = {
  name: string;
  image: string;
};

export default async function accordion({ params }: { params: Params }) {
  const categoryRef = collection(db, "Categories");
  const q = query(categoryRef, where("name", "==", params.name));
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => doc.data());
  /* console.log("querySnap", querySnapshot);
  console.log("data", data); */

  return (
    <>
      <h4 className="text-4xl md:text-5xl mb-16 mx-auto">{params.name}</h4>

      <div className="mx-auto ">
        {data.map((name, index) => (
          <Link href={name.image} key={index}>
            <Image src={name.image} width={160} height={160} alt="Instrument" />
          </Link>
        ))}
      </div>
    </>
  );
}
