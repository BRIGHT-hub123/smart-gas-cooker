import React from "react";
import { StyleSheet, View } from "react-native";

function Skeleton({ style, ...props }) {
  return <View style={[styles.skeleton, style]} {...props} />;
}

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: "#e5e7eb", // light gray (like bg-muted)
    borderRadius: 6,
    opacity: 0.7,
  },
});

export { Skeleton };
