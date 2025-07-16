// Custom hook for handling Hugging Face recipe generation logic
// Allows dynamic model selection and manages loading, error, and result state
import { generateRecipeFromIngredients } from "@/lib/prompt";
import { useCallback, useState } from "react";

const DEFAULT_MODEL = "meta-llama/Llama-3-8B-Instruct";

export interface UseHFRecipeOptions {
  model?: string;
}

export function useHFRecipe(options?: UseHFRecipeOptions) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recipe, setRecipe] = useState<string | null>(null);
  const [model, setModel] = useState(options?.model || DEFAULT_MODEL);

  const generateRecipe = useCallback(
    async (ingredients: string[], customModel?: string) => {
      setLoading(true);
      setError(null);
      setRecipe(null);
      try {
        const recipeText = await generateRecipeFromIngredients(
          ingredients,
          customModel || model || DEFAULT_MODEL
        );
        setRecipe(recipeText);
      } catch (e: any) {
        setError(e.message || "Failed to generate recipe");
      } finally {
        setLoading(false);
      }
    },
    [model]
  );

  return {
    loading,
    error,
    recipe,
    model,
    setModel,
    generateRecipe,
    reset: () => {
      setRecipe(null);
      setError(null);
      setLoading(false);
    },
  };
}
