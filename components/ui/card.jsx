import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { themeStyles, useThemeStore } from "../../store/themeStore";

export const Card = ({ children, style }) => {
  const theme = useThemeStore((s) => s.style);
  const themeCard = themeStyles[theme]?.card || {};

  return <View style={[styles.card, themeCard, style]}>{children}</View>;
};

export const CardHeader = ({ children, style }) => {
  return <View style={[styles.header, style]}>{children}</View>;
};

export const CardTitle = ({ children, style }) => {
  return <Text style={[styles.title, style]}>{children}</Text>;
};

export const CardDescription = ({ children, style }) => {
  return <Text style={[styles.description, style]}>{children}</Text>;
};

export const CardContent = ({ children, style }) => {
  return <View style={[styles.content, style]}>{children}</View>;
};

export const CardFooter = ({ children, style }) => {
  return <View style={[styles.footer, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  card: { backgroundColor: "#0f172a", borderWidth: 1, borderColor: "#334155", borderRadius: 16 },
  header: { padding: 16, paddingBottom: 8 },
  title: { color: "#fff", fontSize: 20, fontWeight: "600" },
  description: { color: "#94a3b8", fontSize: 14, marginTop: 4 },
  content: { padding: 16, paddingTop: 0 },
  footer: { flexDirection: "row", alignItems: "center", padding: 16, paddingTop: 0 },
});