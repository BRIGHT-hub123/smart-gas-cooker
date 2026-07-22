import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export const Collapsible = ({ children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <View>
      {React.Children.map(children, (child) => React.cloneElement(child, { open, setOpen }))}
    </View>
  );
};

export const CollapsibleTrigger = ({ children, open, setOpen, style }) => {
  return (
    <Pressable onPress={() => setOpen?.(!open)} style={[styles.trigger, style]}>
      {typeof children === "string" ? (<Text style={styles.triggerText}>{children}</Text>) : (children)}
    </Pressable>
  );
};

export const CollapsibleContent = ({ children, open, style }) => {
  if (!open) return null;
  return <View style={[styles.content, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  trigger: { padding: 12, backgroundColor: "#1e293b", borderRadius: 8 },
  triggerText: { color: "#fff" },
  content: { padding: 12, marginTop: 8, backgroundColor: "#0f172a", borderRadius: 8 },
});