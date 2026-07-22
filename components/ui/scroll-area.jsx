import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const ScrollArea = ({ children, style, horizontal = false }) => {
  return (
    <View style={[styles.container, style]}>
      <ScrollView horizontal={horizontal} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        {children}
      </ScrollView>
    </View>
  );
};

const ScrollBar = () => {
  return <View style={styles.scrollbar} />;
};

const styles = StyleSheet.create({
  container: { flex: 1, overflow: "hidden" },
  scrollbar: { position: "absolute", right: 2, top: 2, bottom: 2, width: 3, backgroundColor: "#e5e7eb", borderRadius: 999 },
});

export { ScrollArea, ScrollBar };
