import { useAuthContext } from "@/context/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

const Register = () => {
  const { register: registerUser, loading, error } = useAuthContext();
  const {
    handleSubmit,
    register: rhfRegister,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: FormData) => {
    await registerUser(data.email, data.password);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        {...rhfRegister("email")}
        onChangeText={(text) => setValue("email", text)}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        {...rhfRegister("password")}
        onChangeText={(text) => setValue("password", text)}
      />
      {errors.password && (
        <Text style={styles.error}>{errors.password.message}</Text>
      )}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Sign up</Text>
        )}
      </TouchableOpacity>
      <View style={styles.switchRow}>
        <Text style={styles.switchText}>Not registered yet? </Text>
        <Link href="/" style={styles.link}>
          Sign up
        </Link>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 32,
  },
  input: {
    width: "100%",
    height: 48,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
    fontSize: 16,
  },
  button: {
    width: "100%",
    height: 48,
    backgroundColor: "#1e90ff",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginBottom: 8,
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  switchText: {
    color: "#1e90ff",
    fontSize: 16,
  },
  link: {
    color: "#1e90ff",
    fontSize: 16,
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
});
