// IngredientPicker.tsx
// Picker for selecting and adding ingredients, reusable in recipe screens
import { Picker } from "@react-native-picker/picker";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface IngredientPickerProps {
  availableIngredients: string[];
  selectedIngredient: string;
  setSelectedIngredient: (ingredient: string) => void;
  onAdd: () => void;
  disabled?: boolean;
}

const IngredientPicker: React.FC<IngredientPickerProps> = ({
  availableIngredients,
  selectedIngredient,
  setSelectedIngredient,
  onAdd,
  disabled,
}) => {
  return (
    <View style={styles.row}>
      <Picker
        selectedValue={selectedIngredient}
        style={styles.picker}
        onValueChange={setSelectedIngredient}
      >
        <Picker.Item label="Choose ingredient..." value="" color="#888" />
        {availableIngredients.map((ingredient) => (
          <Picker.Item key={ingredient} label={ingredient} value={ingredient} />
        ))}
      </Picker>
      <TouchableOpacity
        style={[styles.addButton, disabled && styles.addButtonDisabled]}
        onPress={onAdd}
        disabled={disabled}
      >
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    width: "100%",
  },
  picker: {
    flex: 1,
    height: 52,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    justifyContent: "center",
    paddingVertical: 0,
  },
  addButton: {
    marginLeft: 12,
    backgroundColor: "#0a7ea4",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  addButtonDisabled: {
    backgroundColor: "#b0c4d4",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default IngredientPicker;
