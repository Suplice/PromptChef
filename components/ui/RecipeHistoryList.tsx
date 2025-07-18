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
  onRemove?: (id: string) => void;
  onClear?: () => void;
}

const RecipeHistoryList: React.FC<RecipeHistoryListProps> = ({
  history,
  onOpen,
  onRemove,
  onClear,
}) => {
  if (history.length === 0) {
    return <Text style={styles.empty}>No recipes yet.</Text>;
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Recipe history</Text>
        {onClear && (
          <TouchableOpacity style={styles.clearButton} onPress={onClear}>
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>
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
            {onRemove && (
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => onRemove(item.id)}
              >
                <Text style={styles.removeButtonText}>✕</Text>
              </TouchableOpacity>
            )}
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
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0a7ea4",
  },
  clearButton: {
    backgroundColor: "#e57373",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
  },
  clearButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
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
  removeButton: {
    backgroundColor: "#e57373",
    marginLeft: 8,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  removeButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
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
