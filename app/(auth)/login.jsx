import { router } from "expo-router";
import { Flame } from "lucide-react-native";
import React, { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

import Button from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useAuthStore } from "../../store/authStore";

const Login = () => {
  const login = useAuthStore((s) => s.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!email.includes("@")) {
      newErrors.email = "Enter a valid email";
    }

    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = () => {
    if (!validate()) return;

    const result = login(email, password);

    if (!result?.ok) {
      Alert.alert("Login failed", result?.error || "Invalid credentials");
      return;
    }

    Alert.alert("Success", "Welcome back");

    // ✅ Expo Router navigation
    router.replace("/(tabs)");
  };

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.iconBox}>
          <Flame size={32} color="white" />
        </View>

        <Text style={styles.title}>BRYTECH</Text>

        <Text style={styles.subtitle}>
          Sign in to your safety dashboard
        </Text>
      </View>

      {/* Form */}
      <View>

        {/* Email */}
        <Label style={styles.label}>Email</Label>
        <Input
          style={styles.input}
          placeholder="you@example.com"
          placeholderTextColor="#94a3b8"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errors.email && (
          <Text style={styles.errorText}>{errors.email}</Text>
        )}

        {/* Password */}
        <Label style={styles.label}>Password</Label>
        <Input
          style={styles.input}
          placeholder="••••••••"
          placeholderTextColor="#94a3b8"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password}</Text>
        )}

        {/* Button */}
        <Button style={styles.button} onPress={onSubmit}>
          Sign in
        </Button>
      </View>

      {/* Footer */}
      <Pressable
        onPress={() => router.push("/signup")}
        style={styles.footer}
      >
        <Text style={styles.footerText}>
          New here? <Text style={styles.link}>Create an account</Text>
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  header: {
    alignItems: "center",
    marginBottom: 40,
  },

  iconBox: {
    height: 64,
    width: 64,
    backgroundColor: "#06b6d4",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    marginBottom: 12,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },

  subtitle: {
    color: "#94a3b8",
    fontSize: 14,
    marginTop: 4,
  },

  label: {
    color: "white",
    marginBottom: 6,
    marginTop: 10,
  },

  input: {
    backgroundColor: "#1e293b",
    color: "white",
    padding: 12,
    borderRadius: 12,
  },

  errorText: {
    color: "#f87171",
    fontSize: 12,
    marginTop: 4,
  },

  button: {
    backgroundColor: "#06b6d4",
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
  },

  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "600",
  },

  footer: {
    marginTop: 24,
  },

  footerText: {
    textAlign: "center",
    color: "#94a3b8",
  },

  link: {
    color: "#22d3ee",
    fontWeight: "600",
  },
});

export default Login;