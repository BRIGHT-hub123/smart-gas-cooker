import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

export const AlertDialog = ({ visible, children }) => {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.container}>{children}</View>
      </View>
    </Modal>
  );
};

export const AlertDialogOverlay = () => null;

export const AlertDialogContent = ({ children }) => {
  return <View style={styles.content}>{children}</View>;
};

export const AlertDialogHeader = ({ children }) => {
  return <View style={styles.header}>{children}</View>;
};

export const AlertDialogFooter = ({ children }) => {
  return <View style={styles.footer}>{children}</View>;
};

export const AlertDialogTitle = ({ children }) => {
  return <Text style={styles.title}>{children}</Text>;
};

export const AlertDialogDescription = ({ children }) => {
  return <Text style={styles.description}>{children}</Text>;
};

export const AlertDialogAction = ({ onPress, children }) => {
  return (
    <Pressable onPress={onPress} style={styles.actionBtn}>
      <Text style={styles.actionText}>{children}</Text>
    </Pressable>
  );
};

export const AlertDialogCancel = ({ onPress, children }) => {
  return (
    <Pressable onPress={onPress} style={styles.cancelBtn}>
      <Text style={styles.cancelText}>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    padding: 20,
  },

  container: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#0f172a",
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#334155",
  },

  content: {
    width: "100%",
  },

  header: {
    marginBottom: 12,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
    marginTop: 16,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },

  description: {
    fontSize: 14,
    color: "#94a3b8",
    marginTop: 4,
  },

  actionBtn: {
    backgroundColor: "#ef4444",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
  },

  actionText: {
    color: "#fff",
    fontWeight: "600",
  },

  cancelBtn: {
    borderWidth: 1,
    borderColor: "#475569",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
  },

  cancelText: {
    color: "#fff",
  },
});