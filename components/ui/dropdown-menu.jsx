import { Check } from "lucide-react-native";
import React, { createContext, useContext, useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

/* ---------------- CONTEXT ---------------- */
const DropdownContext = createContext(null);

export const DropdownMenu = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <DropdownContext.Provider value={{ open, setOpen }}>
      {children}
    </DropdownContext.Provider>
  );
};

/* ---------------- TRIGGER ---------------- */
export const DropdownMenuTrigger = ({ children }) => {
  const ctx = useContext(DropdownContext);

  return (
    <Pressable onPress={() => ctx.setOpen(true)}>
      {children}
    </Pressable>
  );
};

/* ---------------- CONTENT ---------------- */
export const DropdownMenuContent = ({ children }) => {
  const ctx = useContext(DropdownContext);

  if (!ctx.open) return null;

  return (
    <Modal transparent animationType="fade" visible={ctx.open}>
      <Pressable
        style={styles.overlay}
        onPress={() => ctx.setOpen(false)}
      >
        <View style={styles.menu}>
          {children}
        </View>
      </Pressable>
    </Modal>
  );
};

/* ---------------- ITEM ---------------- */
export const DropdownMenuItem = ({ children, onPress }) => {
  const ctx = useContext(DropdownContext);

  return (
    <Pressable
      style={styles.item}
      onPress={() => {
        onPress?.();
        ctx.setOpen(false);
      }}
    >
      <Text style={styles.itemText}>{children}</Text>
    </Pressable>
  );
};

/* ---------------- LABEL ---------------- */
export const DropdownMenuLabel = ({ children }) => (
  <Text style={styles.label}>{children}</Text>
);

/* ---------------- SEPARATOR ---------------- */
export const DropdownMenuSeparator = () => (
  <View style={styles.separator} />
);

/* ---------------- CHECKBOX ITEM ---------------- */
export const DropdownMenuCheckboxItem = ({
  children,
  checked,
  onPress,
}) => (
  <Pressable style={styles.item} onPress={onPress}>
    {checked && <Check size={16} color="black" />}
    <Text style={styles.itemText}>{children}</Text>
  </Pressable>
);

/* ---------------- RADIO ITEM ---------------- */
export const DropdownMenuRadioItem = ({
  children,
  selected,
  onPress,
}) => (
  <Pressable style={styles.item} onPress={onPress}>
    {selected && <View style={styles.radioDot} />}
    <Text style={styles.itemText}>{children}</Text>
  </Pressable>
);

/* ---------------- SUB (simplified) ---------------- */
export const DropdownMenuSub = ({ children }) => children;
export const DropdownMenuGroup = ({ children }) => children;

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  menu: {
    width: 220,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 6,
    elevation: 5,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    gap: 8,
  },

  itemText: {
    fontSize: 14,
  },

  label: {
    fontSize: 12,
    fontWeight: "600",
    padding: 8,
    color: "#666",
  },

  separator: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 4,
  },

  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "black",
  },
});