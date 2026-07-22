import React from "react";
import { StyleSheet, TextInput } from "react-native";

export const Input = React.forwardRef(
  ({ style, type, ...props }, ref) => {
    return (
      <TextInput
        ref={ref}
        style={[styles.input, style]}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

/* Styles (Tailwind-like equivalent) */
const styles = StyleSheet.create({
  input: {
    height: 40,
    width: "100%",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    fontSize: 14,
    color: "#000",
  },
});