import React from "react";
import { StyleSheet, Text, View } from "react-native";

const variantStyles = {
  default: { backgroundColor: "#06b6d4" },
  secondary: { backgroundColor: "#475569" },
  destructive: { backgroundColor: "#ef4444" },
  outline: { borderWidth: 1, borderColor: "#64748b", backgroundColor: "transparent" },
};

const textStyles = {
  default: { color: "#fff" },
  secondary: { color: "#fff" },
  destructive: { color: "#fff" },
  outline: { color: "#e2e8f0" },
};

const Badge = ({ variant = "default", children }) => {
  return (
    <View style={[styles.badge, variantStyles[variant]]}>
      <Text style={[styles.text, textStyles[variant]]}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999, alignSelf: "flex-start" },
  text: { fontSize: 12, fontWeight: "600" },
});

export default Badge;