import { router } from "expo-router";
import { Flame } from "lucide-react-native";
import React, { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

import Button from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useAuthStore } from "../../store/authStore";

const Signup = () => {
  const signup = useAuthStore((s) => s.signup);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (form.name.trim().length < 2) {
      newErrors.name = "Name is too short";
    }

    if (!form.email.includes("@")) {
      newErrors.email = "Enter a valid email";
    }

    if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = () => {
    if (!validate()) return;

    const result = signup(form.name, form.email, form.password);

    if (!result?.ok) {
      Alert.alert("Signup failed", result?.error || "Try again");
      return;
    }

    Alert.alert("Success", "Account created");

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

        <Text style={styles.title}>Create account</Text>

        <Text style={styles.subtitle}>
          Set up your GasGuard monitor
        </Text>
      </View>

      {/* Name */}
      <Label style={styles.label}>Name</Label>
      <Input
        style={styles.input}
        value={form.name}
        onChangeText={(text) => setForm({ ...form, name: text })}
        placeholder="John Doe"
        placeholderTextColor="#94a3b8"
      />
      {errors.name && (
        <Text style={styles.error}>{errors.name}</Text>
      )}

      {/* Email */}
      <Label style={styles.label}>Email</Label>
      <Input
        style={styles.input}
        value={form.email}
        onChangeText={(text) => setForm({ ...form, email: text })}
        placeholder="you@example.com"
        placeholderTextColor="#94a3b8"
        keyboardType="email-address"
      />
      {errors.email && (
        <Text style={styles.error}>{errors.email}</Text>
      )}

      {/* Password */}
      <Label style={styles.label}>Password</Label>
      <Input
        style={styles.input}
        value={form.password}
        onChangeText={(text) =>
          setForm({ ...form, password: text })
        }
        placeholder="••••••••"
        placeholderTextColor="#94a3b8"
        secureTextEntry
      />
      {errors.password && (
        <Text style={styles.error}>{errors.password}</Text>
      )}

      {/* Submit */}
      <Button style={styles.button} onPress={onSubmit}>
        Create account
      </Button>

      {/* Footer */}
      <Pressable
        onPress={() => router.push("/login")}
        style={styles.footer}
      >
        <Text style={styles.footerText}>
          Already have one? <Text style={styles.link}>Sign in</Text>
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
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "white",
  },

  subtitle: {
    fontSize: 14,
    color: "#94a3b8",
    marginTop: 4,
  },

  label: {
    color: "white",
    marginTop: 10,
    marginBottom: 6,
  },

  input: {
    backgroundColor: "#1e293b",
    color: "white",
    padding: 12,
    borderRadius: 12,
  },

  error: {
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
    marginTop: 20,
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

export default Signup;