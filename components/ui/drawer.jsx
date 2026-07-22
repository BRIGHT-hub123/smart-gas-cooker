import React, { createContext, useContext } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

/* ---------------- CONTEXT ---------------- */
const DrawerContext = createContext(null);

export const Drawer = ({ open, onOpenChange, children }) => {
  return (
    <DrawerContext.Provider value={{ open, onOpenChange }}>
      {children}
    </DrawerContext.Provider>
  );
};

/* ---------------- TRIGGER ---------------- */
export const DrawerTrigger = ({ children }) => {
  const ctx = useContext(DrawerContext);

  return (
    <Pressable onPress={() => ctx.onOpenChange(true)}>
      {children}
    </Pressable>
  );
};

/* ---------------- CLOSE ---------------- */
export const DrawerClose = ({ children }) => {
  const ctx = useContext(DrawerContext);

  return (
    <Pressable onPress={() => ctx.onOpenChange(false)}>
      {children}
    </Pressable>
  );
};

/* ---------------- OVERLAY + CONTENT ---------------- */
export const DrawerContent = ({ children }) => {
  const ctx = useContext(DrawerContext);

  if (!ctx.open) return null;

  return (
    <Modal transparent animationType="slide" visible={ctx.open}>
      <View style={styles.overlay}>
        
        {/* tap outside to close */}
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={() => ctx.onOpenChange(false)}
        />

        <View style={styles.sheet}>
          <View style={styles.handle} />
          {children}
        </View>
      </View>
    </Modal>
  );
};

/* ---------------- HEADER ---------------- */
export const DrawerHeader = ({ children }) => (
  <View style={styles.header}>{children}</View>
);

/* ---------------- FOOTER ---------------- */
export const DrawerFooter = ({ children }) => (
  <View style={styles.footer}>{children}</View>
);

/* ---------------- TITLE ---------------- */
export const DrawerTitle = ({ children }) => (
  <Text style={styles.title}>{children}</Text>
);

/* ---------------- DESCRIPTION ---------------- */
export const DrawerDescription = ({ children }) => (
  <Text style={styles.description}>{children}</Text>
);

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  sheet: {
    backgroundColor: "white",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    minHeight: 200,
  },

  handle: {
    width: 60,
    height: 5,
    backgroundColor: "#ccc",
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: 10,
  },

  header: {
    marginBottom: 10,
  },

  footer: {
    marginTop: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
  },

  description: {
    fontSize: 13,
    color: "#666",
    marginTop: 4,
  },
});