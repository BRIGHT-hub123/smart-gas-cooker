import { Check, Circle } from "lucide-react-native";
import React, { createContext, useContext, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

const MenuContext = createContext(null);

export const Menubar = ({ children }) => {
  return <View style={styles.bar}>{children}</View>;
};

export const MenubarMenu = ({ children }) => {
  const [open, setOpen] = useState(false);
  return <MenuContext.Provider value={{ open, setOpen }}><View>{children}</View></MenuContext.Provider>;
};

export const MenubarTrigger = ({ title }) => {
  const ctx = useContext(MenuContext);
  if (!ctx) return null;
  return <Pressable style={styles.trigger} onPress={() => ctx.setOpen(true)}><Text style={styles.triggerText}>{title}</Text></Pressable>;
};

export const MenubarContent = ({ children }) => {
  const ctx = useContext(MenuContext);
  if (!ctx) return null;
  return (
    <Modal transparent visible={ctx.open} animationType="fade">
      <Pressable style={styles.overlay} onPress={() => ctx.setOpen(false)}>
        <View style={styles.menu}>{children}</View>
      </Pressable>
    </Modal>
  );
};

export const MenubarItem = ({ children, onPress }) => {
  return <Pressable style={styles.item} onPress={onPress}><Text style={styles.itemText}>{children}</Text></Pressable>;
};

export const MenubarCheckboxItem = ({ children, checked, onPress }) => {
  return (
    <Pressable style={styles.item} onPress={onPress}>
      <View style={styles.icon}>{checked ? (<Check size={16} color="black" />) : (<Circle size={10} color="black" />)}</View>
      <Text style={styles.itemText}>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  bar: { flexDirection: "row", backgroundColor: "#fff", padding: 8 },
  trigger: { padding: 8 },
  triggerText: { fontSize: 14, fontWeight: "500" },
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "flex-start", padding: 20 },
  menu: { backgroundColor: "#fff", borderRadius: 8, padding: 8 },
  item: { flexDirection: "row", alignItems: "center", padding: 10 },
  itemText: { fontSize: 14 },
  icon: { marginRight: 8 },
});

/* RADIO ITEM (simplified) */
export const MenubarRadioItem = ({ children, selected, onPress }) => {
  return (
    <Pressable style={styles.item} onPress={onPress}>
      <View style={styles.icon}>
        {selected && <Circle size={10} color="black" />}
      </View>
      <Text style={styles.itemText}>{children}</Text>
    </Pressable>
  );
};

/* LABEL */
export const MenubarLabel = ({ children }) => {
  return <Text style={styles.label}>{children}</Text>;
};

/* SEPARATOR */
export const MenubarSeparator = () => {
  return <View style={styles.separator} />;
};

/* SHORTCUT (optional display) */
export const MenubarShortcut = ({ children }) => {
  return <Text style={styles.shortcut}>{children}</Text>;
};

/* STYLES */
const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    padding: 6,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  trigger: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  triggerText: {
    fontSize: 14,
    fontWeight: "500",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    padding: 20,
  },
  menu: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 8,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  itemText: {
    fontSize: 14,
  },
  icon: {
    width: 20,
    marginRight: 6,
    alignItems: "center",
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
  shortcut: {
    marginLeft: "auto",
    fontSize: 12,
    color: "#888",
  },
});