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

  // Real-time listener with Firestore rules compliance
  useEffect(() => {
    let unsubscribe: (() => void) | null = null;

    const setupListener = async () => {
      try {
        const collectionRef = collection(db, collectionName);
        const q = query(collectionRef, ...queryConstraints);

        unsubscribe = onSnapshot(
          q,
          (snapshot) => {
            const docs = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            })) as T[];
            console.log(`Loaded ${docs.length} items from '${collectionName}' collection`);
            setData(docs);
            setError(null);
            setLoading(false);
          },
          (error: any) => {
            console.error(`Firebase listener error for '${collectionName}':`, error);
            setError(error.message || "Failed to load data");
            setLoading(false);
          }
        );
      } catch (err) {
        console.error(`Error setting up listener for '${collectionName}':`, err);
        if (err instanceof Error) {
          setError(err.message);
        }
        setLoading(false);
      }
    };

    setupListener();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [collectionName]);

  const add = async (newData: T): Promise<string> => {
    try {
      const collectionRef = collection(db, collectionName);
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
      await updateDoc(docRef as any, updatedData as any);
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
      const collectionRef = collection(db, collectionName);
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
