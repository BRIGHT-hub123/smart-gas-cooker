import { Search } from "lucide-react-native";
import React, { useMemo, useState } from "react";
import { FlatList, Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export const CommandDialog = ({ visible, onClose, data = [], onSelect }) => {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => data.filter((item) => item.label.toLowerCase().includes(query.toLowerCase())), [query, data]);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.searchRow}>
            <Search size={16} color="#999" />
            <TextInput value={query} onChangeText={setQuery} placeholder="Search..." placeholderTextColor="#888" style={styles.input} />
          </View>
          <FlatList
            data={filtered}
            keyExtractor={(item, i) => i.toString()}
            ListEmptyComponent={<Text style={styles.empty}>No results</Text>}
            renderItem={({ item }) => (
              <Pressable onPress={() => { onSelect?.(item); onClose?.(); }} style={styles.item}>
                <Text style={styles.itemText}>{item.label}</Text>
                {item.shortcut && <Text style={styles.shortcut}>{item.shortcut}</Text>}
              </Pressable>
            )}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.6)", justifyContent: "flex-end" },
  container: { backgroundColor: "#0f172a", borderTopLeftRadius: 16, borderTopRightRadius: 16, padding: 16, height: "70%" },
  searchRow: { flexDirection: "row", alignItems: "center", backgroundColor: "#1e293b", borderRadius: 8, paddingHorizontal: 12, marginBottom: 12 },
  input: { flex: 1, color: "#fff", marginLeft: 8, paddingVertical: 8 },
  empty: { textAlign: "center", color: "#94a3b8", marginTop: 40 },
  item: { padding: 12, borderRadius: 8, backgroundColor: "#1e293b", marginBottom: 8 },
  itemText: { color: "#fff" },
  shortcut: { fontSize: 12, color: "#94a3b8" },
});