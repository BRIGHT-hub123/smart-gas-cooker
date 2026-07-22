import { Circle } from "lucide-react-native";
import React, { createContext, useContext } from "react";
import { Pressable, StyleSheet, View } from "react-native";

const RadioContext = createContext(null);

const RadioGroup = ({ value, onValueChange, children, style }) => {
  return <RadioContext.Provider value={{ value, onValueChange }}><View style={[styles.group, style]}>{children}</View></RadioContext.Provider>;
};

const RadioGroupItem = ({ value, style }) => {
  const ctx = useContext(RadioContext);
  const selected = ctx?.value === value;
  return (
    <Pressable onPress={() => ctx?.onValueChange?.(value)} style={[styles.item, style]}>
      {selected && <Circle size={10} color="#3b82f6" fill="#3b82f6" />}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  group: { gap: 8 },
  item: { width: 20, height: 20, borderRadius: 999, borderWidth: 2, borderColor: "#3b82f6", alignItems: "center", justifyContent: "center" },
});

export { RadioGroup, RadioGroupItem };
