import React from "react";
import { StyleSheet, Text } from "react-native";

export const Label = React.forwardRef(
  ({ style, disabled, children, ...props }, ref) => {
    return (
      <Text
        ref={ref}
        style={[
          styles.label,
          disabled && styles.disabled,
          style,
        ]}
        {...props}
      >
        {children}
      </Text>
    );
  }
);

Label.displayName = "Label";

/* Styles */
const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#111827",
  },
  disabled: {
    opacity: 0.7,
  },
});