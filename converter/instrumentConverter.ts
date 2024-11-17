import {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { Instrument } from "../types/types";

export const instrumentConverter: FirestoreDataConverter<Instrument> = {
  toFirestore(instrument: Instrument): Record<string, any> {
    return {
      name: instrument.name,
      category: instrument.category,
      price: instrument.price,
      description: instrument.description || null,
      image: instrument.image || null,
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): Instrument {
    const data = snapshot.data();
    return {
      id: data.id, // HIER IN "id: snapshot.id," ändern um die Original-ID von Firestore zu verwenden (sonst: "id:data.id")
      name: data.name,
      category: data.category,
      price: data.price,
      description: data.description || null,
      image: data.image || null,
    };
  },
};
