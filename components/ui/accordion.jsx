import React, { useState } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";

export const Accordion = ({ children }) => {
  return <View>{children}</View>;
};

export const AccordionItem = ({ children }) => {
  return <View style={styles.item}>{children}</View>;
};

export const AccordionTrigger = ({ title, children, isOpen, onPress }) => {
  const rotateAnim = useState(new Animated.Value(isOpen ? 1 : 0))[0];

  React.useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: isOpen ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  return (
    <Pressable onPress={onPress} style={styles.trigger}>
      <Text style={styles.title}>{title}</Text>
      <Animated.Text style={{ transform: [{ rotate: rotation }], color: "#fff" }}>
        ▼
      </Animated.Text>
    </Pressable>
  );
};

export const AccordionContent = ({ isOpen, children }) => {
  if (!isOpen) return null;
  return <View style={styles.content}><Text style={styles.contentText}>{children}</Text></View>;
};

const styles = StyleSheet.create({
  item: { borderBottomWidth: 1, borderBottomColor: "#334155" },
  trigger: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 16 },
  title: { color: "#fff", fontWeight: "500" },
  content: { paddingBottom: 16, paddingTop: 4 },
  contentText: { color: "#cbd5e1", fontSize: 14 },
});