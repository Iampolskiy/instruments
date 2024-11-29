import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase.config";
import Link from "next/link";

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
      <h3>{params.name}</h3>
      <div>
        {data.map((name, index) => (
          <Link href={name.image} key={index}>
            {name.name}
            {name.image}
          </Link>
        ))}
      </div>
    </>
  );
}
