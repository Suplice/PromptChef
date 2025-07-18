import { RecipeHistoryItem } from "@/context/RecipeHistoryContext";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface RecipeHistoryListProps {
  history: RecipeHistoryItem[];
  onOpen: (item: RecipeHistoryItem) => void;
}

const RecipeHistoryList: React.FC<RecipeHistoryListProps> = ({
  history,
  onOpen,
}) => {
  if (history.length === 0) {
    return <Text style={styles.empty}>No recipes yet.</Text>;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recipe history</Text>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={{ flex: 1 }}>
              <Text style={styles.recipeTitle} numberOfLines={1}>
                {item.recipe.split("\n")[0]}
              </Text>
              <Text style={styles.meta}>
                {item.ingredients.join(", ")} |{" "}
                {new Date(item.timestamp).toLocaleString()}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.openButton}
              onPress={() => onOpen(item)}
            >
              <Text style={styles.openButtonText}>Open</Text>
            </TouchableOpacity>
          </View>
        )}
        style={{ maxHeight: 220 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 18,
    marginTop: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#0a7ea4",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f7fa",
    borderRadius: 10,
    padding: 10,
    marginBottom: 8,
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },
  meta: {
    fontSize: 13,
    color: "#888",
    marginTop: 2,
  },
  openButton: {
    backgroundColor: "#0a7ea4",
    paddingVertical: 7,
    paddingHorizontal: 18,
    borderRadius: 8,
    marginLeft: 12,
  },
  openButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  empty: {
    color: "#888",
    fontStyle: "italic",
    marginBottom: 12,
    marginTop: 8,
    textAlign: "center",
  },
});

export default RecipeHistoryList;
