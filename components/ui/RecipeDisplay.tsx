// Component to display a generated recipe from GPT
// Usage: Show after recipe is generated
import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";

interface RecipeDisplayProps {
  recipe: string;
}

const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipe }) => {
  // Simple formatting: split by newlines, bold title if present
  const lines = recipe.split(/\n+/);
  return (
    <ScrollView style={styles.container}>
      {lines.map((line, idx) => (
        <Text key={idx} style={idx === 0 ? styles.title : styles.text}>
          {line}
        </Text>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
    padding: 18,
    maxHeight: 400,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#0a7ea4",
  },
  text: {
    fontSize: 16,
    marginBottom: 6,
    color: "#222",
  },
});

export default RecipeDisplay;
