import IngredientList from "@/components/ui/IngredientList";
import IngredientPicker from "@/components/ui/IngredientPicker";
import React, { useState } from "react";
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

const MainScreen: React.FC = () => {
  const [selectedIngredient, setSelectedIngredient] = useState<string>("");
  const [chosenIngredients, setChosenIngredients] = useState<string[]>([]);

  const handleAddIngredient = () => {
    if (selectedIngredient && !chosenIngredients.includes(selectedIngredient)) {
      setChosenIngredients((prev) => [...prev, selectedIngredient]);
      setSelectedIngredient("");
    }
  };

  const handleRemoveIngredient = (ingredient: string) => {
    setChosenIngredients((prev) => prev.filter((i) => i !== ingredient));
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
          !selectedIngredient || chosenIngredients.includes(selectedIngredient)
        }
      />
      <Text style={styles.subtitle}>Selected ingredients:</Text>
      <IngredientList
        ingredients={chosenIngredients}
        onRemove={handleRemoveIngredient}
      />
      <TouchableOpacity style={styles.generateButton} onPress={() => {}}>
        <Text style={styles.generateButtonText}>Generate</Text>
      </TouchableOpacity>
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
  },
  generateButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default MainScreen;
