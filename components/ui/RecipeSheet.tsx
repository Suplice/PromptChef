import * as Clipboard from "expo-clipboard";
import React, { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import RecipeDisplay from "./RecipeDisplay";

interface RecipeSheetProps {
  visible: boolean;
  recipe: string | null;
  onClose: () => void;
  onReset: () => void;
}

const RecipeSheet: React.FC<RecipeSheetProps> = ({
  visible,
  recipe,
  onClose,
  onReset,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (recipe) {
      await Clipboard.setStringAsync(recipe);
      setCopied(true);
    }
  };

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => setCopied(false), 1500);
      return () => clearTimeout(timeout);
    }
  }, [copied]);

  return (
    <Modal
      visible={!!recipe && visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.sheetOverlay}>
        <View style={styles.sheetContainer}>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>×</Text>
          </Pressable>
          {recipe && <RecipeDisplay recipe={recipe} />}
          <View style={styles.sheetButtonRow}>
            <TouchableOpacity
              style={[styles.generateButton, styles.copyButton]}
              onPress={handleCopy}
            >
              <Text style={styles.generateButtonText}>Copy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.generateButton} onPress={onReset}>
              <Text style={styles.generateButtonText}>Reset</Text>
            </TouchableOpacity>
          </View>
          {copied && (
            <View style={styles.toast}>
              <Text style={styles.toastText}>Copied!</Text>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
  sheetButtonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
    gap: 12,
  },
  copyButton: {
    backgroundColor: "#4caf50",
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
  toast: {
    position: "absolute",
    bottom: 32,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 20,
  },
  toastText: {
    backgroundColor: "#222",
    color: "#fff",
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 16,
    fontSize: 16,
    fontWeight: "bold",
    opacity: 0.95,
  },
});

export default RecipeSheet;
