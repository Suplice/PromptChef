import Login from "@/components/Login";
import { useAuthContext } from "@/context/AuthContext";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

const HomeScreen: React.FC = () => {
  const { user, loading } = useAuthContext();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1e90ff" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 18,
    color: "#1e90ff",
  },
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
