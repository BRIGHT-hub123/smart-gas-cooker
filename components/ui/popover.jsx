import React, { createContext, useContext, useState } from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";

const PopoverContext = createContext(null);

const Popover = ({ children }) => {
  const [open, setOpen] = useState(false);
  return <PopoverContext.Provider value={{ open, setOpen }}>{children}</PopoverContext.Provider>;
};

const PopoverTrigger = ({ children }) => {
  const ctx = useContext(PopoverContext);
  return <Pressable onPress={() => ctx.setOpen(true)}>{children}</Pressable>;
};

const PopoverContent = ({ children, style }) => {
  const ctx = useContext(PopoverContext);
  if (!ctx.open) return null;
  return (
    <Modal transparent animationType="fade" visible={ctx.open}>
      <Pressable style={styles.backdrop} onPress={() => ctx.setOpen(false)}>
        <View style={[styles.content, style]}>{children}</View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "center", alignItems: "center" },
  content: { width: 280, backgroundColor: "#fff", borderRadius: 10, padding: 16, elevation: 10 },
});

export { Popover, PopoverContent, PopoverTrigger };
