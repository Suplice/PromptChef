import RecipeHistoryList from "@/components/ui/RecipeHistoryList";
import RecipeSheet from "@/components/ui/RecipeSheet";
import { useRecipeHistory } from "@/context/RecipeHistoryContext";
import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

const HistoryScreen: React.FC = () => {
  const { history, removeRecipe, clearHistory, loading } = useRecipeHistory();
  const [openedHistoryRecipe, setOpenedHistoryRecipe] = useState<null | {
    recipe: string;
  }>(null);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0a7ea4" />
        <Text style={styles.loadingText}>Loading your recipes...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <RecipeHistoryList
        history={history}
        onOpen={(item) => setOpenedHistoryRecipe({ recipe: item.recipe })}
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
      <RecipeSheet
        visible={!!openedHistoryRecipe}
        recipe={openedHistoryRecipe ? openedHistoryRecipe.recipe : null}
        onClose={() => setOpenedHistoryRecipe(null)}
        onReset={() => setOpenedHistoryRecipe(null)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 18,
    color: "#0a7ea4",
  },
});

export default HistoryScreen;
