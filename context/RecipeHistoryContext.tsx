import React, { createContext, ReactNode, useContext, useState } from "react";

export interface RecipeHistoryItem {
  id: string;
  ingredients: string[];
  model: string;
  recipe: string;
  timestamp: number;
}

interface RecipeHistoryContextType {
  history: RecipeHistoryItem[];
  addRecipe: (item: Omit<RecipeHistoryItem, "id" | "timestamp">) => void;
  removeRecipe: (id: string) => void;
  clearHistory: () => void;
}

const RecipeHistoryContext = createContext<
  RecipeHistoryContextType | undefined
>(undefined);

export const RecipeHistoryProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [history, setHistory] = useState<RecipeHistoryItem[]>([]);

  const addRecipe = (item: Omit<RecipeHistoryItem, "id" | "timestamp">) => {
    setHistory((prev) => [
      {
        ...item,
        id: Math.random().toString(36).slice(2),
        timestamp: Date.now(),
      },
      ...prev,
    ]);
  };

  const removeRecipe = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <RecipeHistoryContext.Provider
      value={{ history, addRecipe, removeRecipe, clearHistory }}
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
