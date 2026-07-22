import React, { createContext, useContext, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

const ContextMenuContext = createContext(null);

export const ContextMenu = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [items, setItems] = useState([]);
  const openMenu = (menuItems) => { setItems(menuItems); setVisible(true); };
  const closeMenu = () => setVisible(false);

  return (
    <ContextMenuContext.Provider value={{ openMenu }}>
      {children}
      <Modal transparent visible={visible} animationType="fade">
        <Pressable style={styles.overlay} onPress={closeMenu}>
          <View style={styles.menu}>
            {items.map((item, index) => (
              <Pressable key={index} onPress={() => { item.onPress?.(); closeMenu(); }} style={styles.item}>
                <Text style={styles.itemText}>{item.label}</Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </ContextMenuContext.Provider>
  );
};

export const ContextMenuTrigger = ({ children, menuItems }) => {
  const ctx = useContext(ContextMenuContext);
  if (!ctx) return children;
  return <Pressable onLongPress={() => ctx.openMenu(menuItems)}>{children}</Pressable>;
};

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "flex-end" },
  menu: { backgroundColor: "#0f172a", padding: 16, borderTopLeftRadius: 16, borderTopRightRadius: 16 },
  item: { padding: 12, borderRadius: 8, backgroundColor: "#1e293b", marginBottom: 8 },
  itemText: { color: "#fff" },
});