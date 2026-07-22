import { Check } from "lucide-react-native";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

export const Checkbox = ({ checked = false, onChange, disabled = false, style }) => {
  const toggle = () => {
    if (disabled) return;
    onChange?.(!checked);
  };

  return (
    <Pressable onPress={toggle} disabled={disabled}>
      <View style={[styles.checkbox, checked && styles.checked, disabled && styles.disabled, style]}>
        {checked && <Check size={14} color="white" />}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  checkbox: { width: 20, height: 20, alignItems: "center", justifyContent: "center", borderRadius: 4, borderWidth: 2, borderColor: "#64748b", backgroundColor: "transparent" },
  checked: { backgroundColor: "#3b82f6", borderColor: "#3b82f6" },
  disabled: { opacity: 0.4 },
});