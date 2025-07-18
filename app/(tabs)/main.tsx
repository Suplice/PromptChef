import IngredientList from "@/components/ui/IngredientList";
import IngredientPicker from "@/components/ui/IngredientPicker";
import RecipeHistoryList from "@/components/ui/RecipeHistoryList";
import RecipeSheet from "@/components/ui/RecipeSheet";
import { useRecipeHistory } from "@/context/RecipeHistoryContext";
import { useHFRecipe } from "@/hooks/useHFRecipe";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const INGREDIENTS = [
  "Tomato",
  "Cheese",
  "Chicken",
  "Beef",
  "Lettuce",
  "Egg",
  "Milk",
  "Potato",
  "Onion",
  "Garlic",
];

const HF_MODELS = [
  {
    label: "Llama 3 8B Instruct (default)",
    value: "meta-llama/Llama-3-8B-Instruct",
  },
  { label: "Llama 3 70B Instruct", value: "meta-llama/Llama-3-70B-Instruct" },
  {
    label: "moonshotai",
    value: "mistralai/Mistral-7B-Instruct",
  },
  { label: "DeepSeek V3", value: "deepseek-ai/DeepSeek-V3-8B-Chat" },
];

const MainScreen: React.FC = () => {
  const [selectedIngredient, setSelectedIngredient] = useState<string>("");
  const [chosenIngredients, setChosenIngredients] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>(
    HF_MODELS[0].value
  );
  const [recipeSheetVisible, setRecipeSheetVisible] = useState(false);
  const { history, addRecipe, removeRecipe, clearHistory } = useRecipeHistory();
  const [openedHistoryRecipe, setOpenedHistoryRecipe] = useState<null | {
    recipe: string;
  }>(null);

  const {
    loading,
    error,
    recipe,
    setModel,
    generateRecipe,
    reset: resetRecipe,
  } = useHFRecipe({ model: selectedModel });

  const handleAddIngredient = () => {
    if (selectedIngredient && !chosenIngredients.includes(selectedIngredient)) {
      setChosenIngredients((prev) => [...prev, selectedIngredient]);
      setSelectedIngredient("");
    }
  };

  const handleRemoveIngredient = (ingredient: string) => {
    setChosenIngredients((prev) => prev.filter((i) => i !== ingredient));
  };

  const handleGenerate = () => {
    generateRecipe(chosenIngredients, selectedModel);
    setRecipeSheetVisible(true);
  };

  const handleReset = () => {
    resetRecipe();
    setChosenIngredients([]);
    setSelectedIngredient("");
    setRecipeSheetVisible(false);
  };

  const handleModelChange = (value: string) => {
    setSelectedModel(value);
    setModel(value);
  };

  useEffect(() => {
    if (recipe && recipeSheetVisible) {
      addRecipe({
        ingredients: chosenIngredients,
        model: selectedModel,
        recipe,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipe]);

  return (
    <View style={styles.container}>
      <RecipeHistoryList
        history={history}
        onOpen={(item) => {
          setOpenedHistoryRecipe({ recipe: item.recipe });
          setRecipeSheetVisible(false);
        }}
        onRemove={removeRecipe}
        onClear={() => {
          if (window.confirm && typeof window !== "undefined") {
            if (
              window.confirm(
                "Are you sure you want to clear all recipe history?"
              )
            )
              clearHistory();
          } else {
            clearHistory();
          }
        }}
      />
      <Text style={styles.title}>Select ingredients</Text>
      <IngredientPicker
        availableIngredients={INGREDIENTS.filter(
          (i) => !chosenIngredients.includes(i)
        )}
        selectedIngredient={selectedIngredient}
        setSelectedIngredient={setSelectedIngredient}
        onAdd={handleAddIngredient}
        disabled={
          !selectedIngredient ||
          chosenIngredients.includes(selectedIngredient) ||
          !!recipe
        }
      />
      <Text style={styles.subtitle}>Selected ingredients:</Text>
      <IngredientList
        ingredients={chosenIngredients}
        onRemove={handleRemoveIngredient}
      />
      <Text style={styles.subtitle}>Model (Hugging Face):</Text>
      <Picker
        selectedValue={selectedModel}
        onValueChange={handleModelChange}
        enabled={!recipe && !loading}
        style={{ width: "100%", marginBottom: 12 }}
      >
        {HF_MODELS.map((m) => (
          <Picker.Item key={m.value} label={m.label} value={m.value} />
        ))}
      </Picker>
      {error && <Text style={{ color: "red", marginBottom: 8 }}>{error}</Text>}
      <RecipeSheet
        visible={recipeSheetVisible || !!openedHistoryRecipe}
        recipe={openedHistoryRecipe ? openedHistoryRecipe.recipe : recipe}
        onClose={() => {
          setRecipeSheetVisible(false);
          setOpenedHistoryRecipe(null);
        }}
        onReset={handleReset}
      />
      {!recipe && (
        <TouchableOpacity
          style={styles.generateButton}
          onPress={handleGenerate}
          disabled={loading || chosenIngredients.length === 0}
        >
          <Text style={styles.generateButtonText}>
            {loading ? "Loading..." : "Generate"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    alignSelf: "flex-start",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    alignSelf: "flex-start",
  },
  generateButton: {
    backgroundColor: "#0a7ea4",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 16,
    minWidth: 140,
    alignItems: "center",
  },
  generateButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default MainScreen;
