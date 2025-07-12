import React from "react";
import {
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface IngredientSheetProps {
  visible: boolean;
  ingredients: string[];
  onClose: () => void;
}

const IngredientSheet: React.FC<IngredientSheetProps> = ({
  visible,
  ingredients,
  onClose,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.fullScreenSheet}>
        <Pressable style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>×</Text>
        </Pressable>
        <Text style={styles.sheetTitle}>Your ingredients</Text>
        <View style={styles.sheetList}>
          {ingredients.map((ingredient) => (
            <View key={ingredient} style={styles.sheetPill}>
              <Text style={styles.sheetPillText}>{ingredient}</Text>
            </View>
          ))}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  fullScreenSheet: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 32,
    justifyContent: "flex-start",
    alignItems: "stretch",
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
  sheetTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 24,
    alignSelf: "center",
  },
  sheetList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 8,
  },
  sheetPill: {
    backgroundColor: "#e6f7fa",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    margin: 6,
  },
  sheetPillText: {
    fontSize: 17,
    color: "#0a7ea4",
    fontWeight: "bold",
  },
});

export default IngredientSheet;
