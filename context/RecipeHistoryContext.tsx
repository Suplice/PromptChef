import { db } from "@/lib/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  writeBatch,
} from "firebase/firestore";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuthContext } from "./AuthContext";

export interface RecipeHistoryItem {
  id: string;
  ingredients: string[];
  model: string;
  recipe: string;
  timestamp: number;
}

interface RecipeHistoryContextType {
  history: RecipeHistoryItem[];
  loading: boolean;
  error: string | null;
  addRecipe: (
    item: Omit<RecipeHistoryItem, "id" | "timestamp">
  ) => Promise<void>;
  removeRecipe: (id: string) => Promise<void>;
  clearHistory: () => Promise<void>;
}

const RecipeHistoryContext = createContext<
  RecipeHistoryContextType | undefined
>(undefined);

export const RecipeHistoryProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { user } = useAuthContext();
  const [history, setHistory] = useState<RecipeHistoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setHistory([]);
      return;
    }
    setLoading(true);
    setError(null);
    const fetchHistory = async () => {
      try {
        const q = query(
          collection(db, "users", user.uid, "recipes"),
          orderBy("timestamp", "desc")
        );
        const snapshot = await getDocs(q);
        const items: RecipeHistoryItem[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<RecipeHistoryItem, "id">),
        }));
        setHistory(items);
      } catch (e: any) {
        setError(e.message || "Failed to load history");
        console.error("Błąd Firestore:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [user]);

  const addRecipe = async (
    item: Omit<RecipeHistoryItem, "id" | "timestamp">
  ) => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      console.log("Próba zapisu do Firestore:", user?.uid, item);
      const docRef = await addDoc(
        collection(db, "users", user.uid, "recipes"),
        {
          ...item,
          timestamp: Date.now(),
        }
      );
      setHistory((prev) => [
        {
          ...item,
          id: docRef.id,
          timestamp: Date.now(),
        },
        ...prev,
      ]);
    } catch (e: any) {
      setError(e.message || "Failed to add recipe");
      console.error("Błąd Firestore:", e);
    } finally {
      setLoading(false);
    }
  };

  const removeRecipe = async (id: string) => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      await deleteDoc(doc(db, "users", user.uid, "recipes", id));
      setHistory((prev) => prev.filter((item) => item.id !== id));
    } catch (e: any) {
      setError(e.message || "Failed to remove recipe");
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const q = query(collection(db, "users", user.uid, "recipes"));
      const snapshot = await getDocs(q);
      const batch = writeBatch(db);
      snapshot.docs.forEach((docSnap) => {
        batch.delete(docSnap.ref);
      });
      await batch.commit();
      setHistory([]);
    } catch (e: any) {
      setError(e.message || "Failed to clear history");
    } finally {
      setLoading(false);
    }
  };

  return (
    <RecipeHistoryContext.Provider
      value={{ history, loading, error, addRecipe, removeRecipe, clearHistory }}
    >
      {children}
    </RecipeHistoryContext.Provider>
  );
};

export function useRecipeHistory() {
  const ctx = useContext(RecipeHistoryContext);
  if (!ctx)
    throw new Error(
      "useRecipeHistory must be used within RecipeHistoryProvider"
    );
  return ctx;
}
