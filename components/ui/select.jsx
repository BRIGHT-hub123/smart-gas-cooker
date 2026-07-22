import React, { createContext, useContext, useState } from "react";
import { FlatList, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { Check, ChevronDown } from "lucide-react-native";

const SelectContext = createContext(null);

const Select = ({ value, onValueChange, children }) => {
  const [open, setOpen] = useState(false);
  return <SelectContext.Provider value={{ value, onValueChange, open, setOpen }}><View>{children}</View></SelectContext.Provider>;
};

const SelectTrigger = ({ placeholder = "Select...", style }) => {
  const ctx = useContext(SelectContext);
  return (
    <Pressable onPress={() => ctx.setOpen(true)} style={[styles.trigger, style]}>
      <Text style={styles.triggerText}>{ctx.value || placeholder}</Text>
      <ChevronDown size={18} color="#6b7280" />
    </Pressable>
  );
};

const SelectContent = ({ options = [] }) => {
  const ctx = useContext(SelectContext);
  if (!ctx.open) return null;
  return (
    <Modal transparent animationType="fade">
      <Pressable style={styles.overlay} onPress={() => ctx.setOpen(false)}>
        <View style={styles.content}>
          <FlatList
            data={options}
            keyExtractor={(item, i) => i.toString()}
            renderItem={({ item }) => (
              <Pressable style={styles.option} onPress={() => { ctx.onValueChange?.(item.value); ctx.setOpen(false); }}>
                <Text style={styles.optionText}>{item.label}</Text>
                {ctx.value === item.value && <Check size={16} color="#06b6d4" />}
              </Pressable>
            )}
          />
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  trigger: { height: 40, borderWidth: 1, borderColor: "#d1d5db", borderRadius: 6, paddingHorizontal: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  triggerText: { fontSize: 14 },
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.3)", justifyContent: "center", padding: 20 },
  content: { backgroundColor: "#fff", borderRadius: 10, padding: 10, maxHeight: 300 },
  option: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 12 },
  optionText: { fontSize: 14 },
});

export { Select, SelectTrigger, SelectContent };
            data={options}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => {
              const selected = ctx.value === item.value;

              return (
                <Pressable
                  onPress={() => {
                    ctx.onValueChange(item.value);
                    ctx.setOpen(false);
                  }}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 10,
                    justifyContent: "space-between",
                  }}
                >
                  <Text>{item.label}</Text>

                  {selected && (
                    <Check size={16} color="#3b82f6" />
                  )}
                </Pressable>
              );
            }}
          />
        </View>
      </Pressable>
    </Modal>
  );
};

export {
  Select, SelectContent, SelectTrigger
};
