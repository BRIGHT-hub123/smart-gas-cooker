import React, { createContext, useContext, useState } from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";

const HoverCardContext = createContext(null);

export const HoverCard = ({ children }) => {
  const [open, setOpen] = useState(false);
  return <HoverCardContext.Provider value={{ open, setOpen }}><View>{children}</View></HoverCardContext.Provider>;
};

export const HoverCardTrigger = ({ children }) => {
  const ctx = useContext(HoverCardContext);
  if (!ctx) return null;
  return <Pressable onPress={() => ctx.setOpen(true)}>{children}</Pressable>;
};

export const HoverCardContent = ({ children }) => {
  const ctx = useContext(HoverCardContext);
  if (!ctx) return null;
  return (
    <Modal transparent visible={ctx.open} animationType="fade" onRequestClose={() => ctx.setOpen(false)}>
      <Pressable style={styles.overlay} onPress={() => ctx.setOpen(false)}>
        <View style={styles.content}>{children}</View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "center", alignItems: "center" },
  content: { width: 260, padding: 16, borderRadius: 10, backgroundColor: "#fff", elevation: 5, shadowColor: "#000", shadowOpacity: 0.2, shadowRadius: 10 },
});