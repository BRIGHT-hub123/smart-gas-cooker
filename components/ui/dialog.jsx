import { X } from "lucide-react-native";
import React, { createContext, useContext } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

/* ---------------- CONTEXT ---------------- */
const DialogContext = createContext(null);

export const Dialog = ({ children, visible, onOpenChange }) => {
  return (
    <DialogContext.Provider value={{ visible, onOpenChange }}>
      {children}
    </DialogContext.Provider>
  );
};

export const DialogTrigger = ({ children }) => {
  const ctx = useContext(DialogContext);

  return (
    <Pressable onPress={() => ctx.onOpenChange(true)}>
      {children}
    </Pressable>
  );
};

/* ---------------- OVERLAY + CONTENT ---------------- */
export const DialogContent = ({ children }) => {
  const ctx = useContext(DialogContext);

  if (!ctx.visible) return null;

  return (
    <Modal transparent animationType="fade" visible={ctx.visible}>
      <View style={styles.overlay}>
        <View style={styles.content}>
          
          {/* Close button */}
          <Pressable
            style={styles.closeBtn}
            onPress={() => ctx.onOpenChange(false)}
          >
            <X size={18} color="black" />
          </Pressable>

          {children}
        </View>
      </View>
    </Modal>
  );
};

/* ---------------- HEADER ---------------- */
export const DialogHeader = ({ children }) => (
  <View style={styles.header}>{children}</View>
);

/* ---------------- FOOTER ---------------- */
export const DialogFooter = ({ children }) => (
  <View style={styles.footer}>{children}</View>
);

/* ---------------- TITLE ---------------- */
export const DialogTitle = ({ children }) => (
  <Text style={styles.title}>{children}</Text>
);

/* ---------------- DESCRIPTION ---------------- */
export const DialogDescription = ({ children }) => (
  <Text style={styles.description}>{children}</Text>
);

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "85%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    position: "relative",
  },
  closeBtn: {
    position: "absolute",
    right: 10,
    top: 10,
    padding: 5,
  },
  header: {
    marginBottom: 10,
  },
  footer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
});