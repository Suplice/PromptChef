import RecipeHistoryList from "@/components/ui/RecipeHistoryList";
import RecipeSheet from "@/components/ui/RecipeSheet";
import { useRecipeHistory } from "@/context/RecipeHistoryContext";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

const HistoryScreen: React.FC = () => {
  const { history, removeRecipe, clearHistory } = useRecipeHistory();
  const [openedHistoryRecipe, setOpenedHistoryRecipe] = useState<null | {
    recipe: string;
  }>(null);

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
});

export default HistoryScreen;
