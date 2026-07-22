import React from "react";
import { StyleSheet, View } from "react-native";

const Separator = ({ orientation = "horizontal", style, color = "#e5e7eb" }) => {
  const isHorizontal = orientation === "horizontal";
  return <View style={[styles.separator, { backgroundColor: color, width: isHorizontal ? "100%" : 1, height: isHorizontal ? 1 : "100%" }, style]} />;
};

const styles = StyleSheet.create({
  separator: {},
});

export { Separator };
