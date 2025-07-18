import IngredientList from "@/components/ui/IngredientList";
import IngredientPicker from "@/components/ui/IngredientPicker";
import RecipeDisplay from "@/components/ui/RecipeDisplay";
import { useHFRecipe } from "@/hooks/useHFRecipe";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

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

  return (
    <View style={styles.container}>
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
      <Modal
        visible={!!recipe && recipeSheetVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleReset}
      >
        <View style={styles.sheetOverlay}>
          <View style={styles.sheetContainer}>
            <Pressable style={styles.closeButton} onPress={handleReset}>
              <Text style={styles.closeButtonText}>×</Text>
            </Pressable>
            {recipe && <RecipeDisplay recipe={recipe} />}
            <TouchableOpacity
              style={styles.generateButton}
              onPress={handleReset}
            >
              <Text style={styles.generateButtonText}>Reset</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  sheetOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.25)",
    justifyContent: "flex-end",
  },
  sheetContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    minHeight: 320,
    maxHeight: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  closeButton: {
    position: "absolute",
    top: 12,
    right: 16,
    zIndex: 10,
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
  },
  closeButtonText: {
    fontSize: 32,
    color: "#888",
    fontWeight: "bold",
    lineHeight: 32,
  },
});

export default MainScreen;
