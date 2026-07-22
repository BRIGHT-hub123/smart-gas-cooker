import React, { createContext, useContext, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { ChevronDown } from "lucide-react-native";

const NavContext = createContext(null);

export const NavigationMenu = ({ children }) => {
  return <View style={styles.nav}>{children}</View>;
};

export const NavigationMenuList = ({ children }) => {
  return <View style={styles.list}>{children}</View>;
};

export const NavigationMenuItem = ({ children }) => {
  return <View style={styles.item}>{children}</View>;
};

export const NavigationMenuTrigger = ({ title, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <NavContext.Provider value={{ open, setOpen }}>
      <Pressable style={styles.trigger} onPress={() => setOpen(!open)}>
        <Text style={styles.triggerText}>{title}</Text>
        <ChevronDown size={16} color="black" />
      </Pressable>
      {open && children}
    </NavContext.Provider>
  );
};

export const NavigationMenuContent = ({ children }) => {
  const ctx = useContext(NavContext);
  if (!ctx) return null;
  return (
    <Modal transparent animationType="fade" visible={ctx.open}>
      <Pressable style={styles.overlay} onPress={() => ctx.setOpen(false)}>
        <View style={styles.content}>{children}</View>
      </Pressable>
    </Modal>
  );
};

export const NavigationMenuLink = ({ children, onPress }) => {
  return <Pressable style={styles.link} onPress={onPress}><Text style={styles.linkText}>{children}</Text></Pressable>;
};

const styles = StyleSheet.create({
  nav: { padding: 8, backgroundColor: "#fff" },
  list: { flexDirection: "row", gap: 10 },
  item: { marginRight: 10 },
  trigger: { flexDirection: "row", alignItems: "center", gap: 4, padding: 8 },
  triggerText: { fontSize: 14, fontWeight: "500" },
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "flex-start", padding: 20 },
  content: { backgroundColor: "#fff", borderRadius: 8, padding: 8 },
  link: { padding: 8 },
  linkText: { fontSize: 14 },
});
  },
  trigger: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: "#f3f4f6",
  },
  triggerText: {
    fontSize: 14,
    marginRight: 4,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.25)",
    justifyContent: "flex-start",
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  content: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    elevation: 5,
  },
  link: {
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  linkText: {
    fontSize: 14,
  },
});