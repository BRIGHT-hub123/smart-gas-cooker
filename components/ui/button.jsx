import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { themeStyles, useThemeStore } from "../../store/themeStore";

const variants = {
  default: { backgroundColor: "#06b6d4" },
  destructive: { backgroundColor: "#ef4444" },
  outline: { borderWidth: 1, borderColor: "#64748b", backgroundColor: "transparent" },
  secondary: { backgroundColor: "#334155" },
  ghost: { backgroundColor: "transparent" },
  link: { backgroundColor: "transparent" },
};

const sizes = {
  default: { paddingHorizontal: 16, paddingVertical: 8 },
  sm: { paddingHorizontal: 12, paddingVertical: 6 },
  lg: { paddingHorizontal: 24, paddingVertical: 12 },
  icon: { width: 40, height: 40 },
};

const textVariants = {
  default: { color: "#fff" },
  destructive: { color: "#fff" },
  outline: { color: "#fff" },
  secondary: { color: "#fff" },
  ghost: { color: "#fff" },
  link: { color: "#22d3ee", textDecorationLine: "underline" },
};

const Button = ({ children, variant = "default", size = "default", onPress, disabled, style }) => {
  const theme = useThemeStore((s) => s.style);
  const themeButton = themeStyles[theme]?.button || {};

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        variants[variant],
        sizes[size],
        themeButton,
        disabled && styles.disabled,
        pressed && styles.pressed,
        style,
      ]}
    >
      {typeof children === "string" ? (
        <Text style={[styles.text, textVariants[variant]]}>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: { flexDirection: "row", alignItems: "center", justifyContent: "center", borderRadius: 6 },
  text: { fontSize: 14, fontWeight: "500" },
  disabled: { opacity: 0.5 },
  pressed: { opacity: 0.8 },
});

export default Button;