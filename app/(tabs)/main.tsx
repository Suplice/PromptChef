import React from "react";
import { StyleSheet, Text, View } from "react-native";

const MainScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Main screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default MainScreen;
