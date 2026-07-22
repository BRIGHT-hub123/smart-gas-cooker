import { X } from "lucide-react-native";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const SCREEN_HEIGHT = Dimensions.get("window").height;

export const Sheet = ({ open, onOpenChange, children }) => {
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  useEffect(() => {
    if (open) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: SCREEN_HEIGHT,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [open]);

  return (
    <Modal transparent visible={open} animationType="none">
      {/* Overlay */}
      <Pressable style={styles.overlay} onPress={() => onOpenChange(false)} />

      {/* Sheet */}
      <Animated.View
        style={[
          styles.sheet,
          { transform: [{ translateY }] },
        ]}
      >
        {children}
      </Animated.View>
    </Modal>
  );
};

export const SheetHeader = ({ children }) => (
  <View style={styles.header}>{children}</View>
);

export const SheetFooter = ({ children }) => (
  <View style={styles.footer}>{children}</View>
);

export const SheetTitle = ({ children }) => (
  <Text style={styles.title}>{children}</Text>
);

export const SheetDescription = ({ children }) => (
  <Text style={styles.description}>{children}</Text>
);

export const SheetClose = ({ onPress }) => (
  <Pressable onPress={onPress} style={styles.closeBtn}>
    <X size={18} color="#000" />
  </Pressable>
);

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.6)",
  },

  sheet: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    minHeight: 200,
  },

  header: {
    marginBottom: 10,
  },

  footer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
  },

  description: {
    fontSize: 14,
    color: "#666",
  },

  closeBtn: {
    position: "absolute",
    right: 12,
    top: 12,
    padding: 6,
  },
});