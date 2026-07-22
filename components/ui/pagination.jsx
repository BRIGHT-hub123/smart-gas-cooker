import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react-native";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const Pagination = ({ children, style }) => {
  return <View style={[styles.pagination, style]}>{children}</View>;
};

const PaginationContent = ({ children, style }) => {
  return <View style={[styles.content, style]}>{children}</View>;
};

const PaginationItem = ({ children, style }) => {
  return <View style={style}>{children}</View>;
};

const PaginationLink = ({ isActive, onPress, children }) => {
  return (
    <Pressable onPress={onPress} style={[styles.link, isActive && styles.activeLink]}>
      <Text style={[styles.linkText, isActive && styles.activeLinkText]}>{children}</Text>
    </Pressable>
  );
};

const PaginationPrevious = ({ onPress }) => (
  <PaginationLink onPress={onPress}><ChevronLeft size={16} /><Text>Previous</Text></PaginationLink>
);

const PaginationNext = ({ onPress }) => (
  <PaginationLink onPress={onPress}><Text>Next</Text><ChevronRight size={16} /></PaginationLink>
);

const PaginationEllipsis = () => (
  <View style={styles.ellipsis}><MoreHorizontal size={16} /></View>
);

const styles = StyleSheet.create({
  pagination: { flexDirection: "row", justifyContent: "center", width: "100%" },
  content: { flexDirection: "row", alignItems: "center", gap: 6 },
  link: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 6, flexDirection: "row", alignItems: "center", gap: 6 },
  activeLink: { backgroundColor: "#e5e7eb" },
  linkText: { fontSize: 14, fontWeight: "400" },
  activeLinkText: { fontWeight: "600" },
  ellipsis: { paddingHorizontal: 10, justifyContent: "center", alignItems: "center" },
});

export { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious };
