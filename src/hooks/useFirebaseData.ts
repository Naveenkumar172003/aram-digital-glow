import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  onSnapshot,
  QueryConstraint,
} from "firebase/firestore";
import { db } from "@/config/firebase";

interface UseFirebaseDataOptions {
  collectionName: string;
  queryConstraints?: QueryConstraint[];
}

interface UseFirebaseDataReturn<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  add: (data: T) => Promise<string>;
  update: (id: string, data: Partial<T>) => Promise<void>;
  delete: (id: string) => Promise<void>;
  refetch: () => Promise<void>;
}

export const useFirebaseData = <T extends { id?: string }>({
  collectionName,
  queryConstraints = [],
}: UseFirebaseDataOptions): UseFirebaseDataReturn<T> => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const collectionRef = collection(db, collectionName);

  // Real-time listener
  useEffect(() => {
    try {
      setLoading(true);
      const q = query(collectionRef, ...queryConstraints);

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as T[];
        setData(docs);
        setError(null);
      });

      setLoading(false);
      return unsubscribe;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
      setLoading(false);
    }
  }, [collectionName]);

  const add = async (newData: T): Promise<string> => {
    try {
      const docRef = await addDoc(collectionRef, newData);
      return docRef.id;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        throw err;
      }
      throw new Error("Unknown error occurred");
    }
  };

  const update = async (id: string, updatedData: Partial<T>) => {
    try {
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, updatedData);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        throw err;
      }
      throw new Error("Unknown error occurred");
    }
  };

  const deleteItem = async (id: string) => {
    try {
      const docRef = doc(db, collectionName, id);
      await deleteDoc(docRef);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        throw err;
      }
      throw new Error("Unknown error occurred");
    }
  };

  const refetch = async () => {
    try {
      setLoading(true);
      const q = query(collectionRef, ...queryConstraints);
      const snapshot = await getDocs(q);
      const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as T[];
      setData(docs);
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, add, update, delete: deleteItem, refetch };
};
