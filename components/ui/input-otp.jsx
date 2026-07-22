import React, { createContext, useContext, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Dot } from "lucide-react-native";

const OTPContext = createContext(null);

export const InputOTP = ({ length = 6, value, onChange }) => {
  const [internal, setInternal] = useState(value || "");
  const code = value !== undefined ? value : internal;
  const handleChange = (text) => {
    const cleaned = text.replace(/[^0-9]/g, "").slice(0, length);
    if (value === undefined) setInternal(cleaned);
    onChange?.(cleaned);
  };

  return (
    <OTPContext.Provider value={{ length, code }}>
      <View style={styles.container}>
        <TextInput value={code} onChangeText={handleChange} keyboardType="numeric" maxLength={length} style={styles.hiddenInput} autoFocus />
        <View style={styles.row}>
          {Array.from({ length }).map((_, i) => (<InputOTPSlot key={i} index={i} />))}
        </View>
      </View>
    </OTPContext.Provider>
  );
};

export const InputOTPSlot = ({ index }) => {
  const ctx = useContext(OTPContext);
  const char = ctx.code?.[index] || "";
  const isActive = ctx.code?.length === index;
  return (
    <View style={[styles.slot, isActive && styles.activeSlot]}>
      <Text style={styles.char}>{char}</Text>
      {!char && isActive && <View style={styles.caret} />}
    </View>
  );
};

export const InputOTPGroup = ({ children }) => {
  return <View style={styles.row}>{children}</View>;
};

export const InputOTPSeparator = () => {
  return <View style={{ paddingHorizontal: 4 }}><Dot size={16} color="gray" /></View>;
};

const styles = StyleSheet.create({
  container: { alignItems: "center", gap: 10 },
  hiddenInput: { position: "absolute", opacity: 0 },
  row: { flexDirection: "row", gap: 8 },
  slot: { width: 40, height: 48, borderWidth: 1, borderColor: "#334155", borderRadius: 8, alignItems: "center", justifyContent: "center", backgroundColor: "#0f172a" },
  activeSlot: { borderColor: "#06b6d4" },
  char: { fontSize: 20, color: "#fff", fontWeight: "600" },
  caret: { width: 1, height: 20, backgroundColor: "#06b6d4" },
});
    opacity: 0,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  slot: {
    width: 42,
    height: 42,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 2,
    borderRadius: 6,
  },
  activeSlot: {
    borderColor: "#3b82f6",
    borderWidth: 2,
  },
  char: {
    fontSize: 18,
    fontWeight: "600",
  },
  caret: {
    width: 2,
    height: 18,
    backgroundColor: "black",
  },
});