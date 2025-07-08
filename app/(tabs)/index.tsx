import Login from "@/components/Login";
import { useAuthContext } from "@/context/AuthContext";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const HomeScreen: React.FC = () => {
  const { user } = useAuthContext();

  if (!user) {
    return <Login />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome!</Text>
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
  welcome: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default HomeScreen;
