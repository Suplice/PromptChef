// IngredientList.tsx
// Responsive, horizontal scrollable list of selected ingredients with remove option
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface IngredientListProps {
  ingredients: string[];
  onRemove: (ingredient: string) => void;
}

const IngredientList: React.FC<IngredientListProps> = ({
  ingredients,
  onRemove,
}) => {
  if (ingredients.length === 0) {
    return <Text style={styles.emptyText}>No ingredients selected.</Text>;
  }
  return (
    <View style={styles.wrapContainer}>
      {ingredients.map((ingredient) => (
        <View key={ingredient} style={styles.pillRow}>
          <View style={styles.pill}>
            <Text style={styles.pillText}>{ingredient}</Text>
          </View>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => onRemove(ingredient)}
          >
            <Text style={styles.removeButtonText}>×</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    marginBottom: 24,
    width: "100%",
    paddingHorizontal: 4,
  },
  pillRow: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
  },
  pill: {
    backgroundColor: "#e6f7fa",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  pillText: {
    fontSize: 16,
    color: "#0a7ea4",
    fontWeight: "bold",
  },
  removeButton: {
    marginLeft: 2,
    backgroundColor: "#ff4d4f",
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  removeButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 20,
  },
  emptyText: {
    color: "#888",
    fontStyle: "italic",
    textAlign: "center",
    marginVertical: 8,
  },
});

export default IngredientList;
