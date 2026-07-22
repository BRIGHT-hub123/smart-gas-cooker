import { ChevronRight, MoreHorizontal } from "lucide-react-native";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export const Breadcrumb = ({ children }) => {
  return <View style={styles.breadcrumb}>{children}</View>;
};

export const BreadcrumbItem = ({ children }) => {
  return <View style={styles.item}>{children}</View>;
};

export const BreadcrumbLink = ({ onPress, children }) => {
  return <Pressable onPress={onPress}><Text style={styles.link}>{children}</Text></Pressable>;
};

export const BreadcrumbPage = ({ children }) => {
  return <Text style={styles.page}>{children}</Text>;
};

export const BreadcrumbSeparator = () => {
  return <View style={styles.separator}><ChevronRight size={14} color="#94a3b8" /></View>;
};

export const BreadcrumbEllipsis = () => {
  return <View style={styles.ellipsis}><MoreHorizontal size={16} color="#94a3b8" /></View>;
};

const styles = StyleSheet.create({
  breadcrumb: { flexDirection: "row", flexWrap: "wrap", alignItems: "center" },
  item: { flexDirection: "row", alignItems: "center" },
  link: { color: "#94a3b8", fontSize: 14 },
  page: { color: "#fff", fontSize: 14, fontWeight: "500" },
  separator: { marginHorizontal: 8 },
  ellipsis: { paddingHorizontal: 8 },
});