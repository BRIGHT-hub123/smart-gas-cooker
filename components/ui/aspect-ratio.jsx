import React from "react";
import { StyleSheet, View } from "react-native";

const AspectRatio = ({ ratio = 1, children, style }) => {
  return (
    <View style={[styles.container, { aspectRatio: ratio }, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: "100%" },
});

export default AspectRatio;