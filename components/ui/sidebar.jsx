import { PanelLeft } from "lucide-react-native";
import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import {
  Animated,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

/* ---------------- CONTEXT ---------------- */
const SidebarContext = createContext(null);

export const useSidebar = () => {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used within SidebarProvider");
  return ctx;
};

/* ---------------- PROVIDER ---------------- */
export const SidebarProvider = ({ children }) => {
  const [open, setOpen] = useState(false);

  const toggleSidebar = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const value = useMemo(
    () => ({ open, setOpen, toggleSidebar }),
    [open, toggleSidebar]
  );

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
};

/* ---------------- SIDEBAR ---------------- */
export const Sidebar = ({ children }) => {
  const { open, setOpen } = useSidebar();
  const translateX = useState(new Animated.Value(-SCREEN_WIDTH))[0];

  React.useEffect(() => {
    Animated.timing(translateX, {
      toValue: open ? 0 : -SCREEN_WIDTH,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [open]);

  return (
    <>
      {open && (
        <Pressable style={styles.overlay} onPress={() => setOpen(false)} />
      )}

      <Animated.View
        style={[
          styles.sidebar,
          { transform: [{ translateX }] },
        ]}
      >
        {children}
      </Animated.View>
    </>
  );
};

/* ---------------- TRIGGER ---------------- */
export const SidebarTrigger = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <Pressable onPress={toggleSidebar} style={styles.trigger}>
      <PanelLeft size={20} color="#000" />
      <Text style={{ marginLeft: 8 }}>Menu</Text>
    </Pressable>
  );
};

/* ---------------- UI PARTS ---------------- */
export const SidebarHeader = ({ children }) => (
  <View style={styles.header}>{children}</View>
);

export const SidebarContent = ({ children }) => (
  <View style={styles.content}>{children}</View>
);

export const SidebarFooter = ({ children }) => (
  <View style={styles.footer}>{children}</View>
);

export const SidebarItem = ({ label, onPress }) => (
  <Pressable style={styles.item} onPress={onPress}>
    <Text style={styles.itemText}>{label}</Text>
  </Pressable>
);

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  sidebar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: SCREEN_WIDTH * 0.75,
    backgroundColor: "#fff",
    padding: 16,
    elevation: 10,
  },

  trigger: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },

  header: {
    marginBottom: 10,
  },

  content: {
    flex: 1,
  },

  footer: {
    marginTop: 10,
  },

  item: {
    padding: 12,
    borderRadius: 8,
  },

  itemText: {
    fontSize: 16,
  },
});