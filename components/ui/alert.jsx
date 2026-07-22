import React from "react";
import { StyleSheet, Text, View } from "react-native";

const variantStyles = {
  default: { backgroundColor: "#1e293b", borderColor: "#334155" },
  destructive: { backgroundColor: "rgba(239,68,68,0.2)", borderColor: "#ef4444" },
};

export const Alert = ({ variant = "default", children }) => {
  return (
    <View style={[styles.alert, variantStyles[variant]]}>
      {children}
    </View>
  );
};

export const AlertTitle = ({ children }) => {
  return <Text style={styles.title}>{children}</Text>;
};

export const AlertDescription = ({ children }) => {
  return <Text style={styles.description}>{children}</Text>;
};

const styles = StyleSheet.create({
  alert: { width: "100%", padding: 16, borderRadius: 12, borderWidth: 1 },
  title: { color: "#fff", fontWeight: "600", marginBottom: 4 },
  description: { color: "#cbd5e1", fontSize: 14, lineHeight: 20 },
});