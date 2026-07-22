import * as React from "react";
import { Pressable, StyleSheet } from "react-native";


const toggleVariants = {
  variants: {
    variant: {
      default: {},
      outline: {
        borderWidth: 1,
        borderColor: "#e2e8f0",
      },
    },
    size: {
      default: {
        paddingHorizontal: 12,
        paddingVertical: 8,
      },
      sm: {
        paddingHorizontal: 10,
        paddingVertical: 6,
      },
      lg: {
        paddingHorizontal: 16,
        paddingVertical: 10,
      },
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
};

function getToggleStyle(variant = "default", size = "default") {
  return {
    ...styles.base,
    ...toggleVariants.variants.variant[variant],
    ...toggleVariants.variants.size[size],
  };
}

const Toggle = React.forwardRef(({ className, variant, size, style, ...props }, ref) => (
  <Pressable
    ref={ref}
    style={[
      getToggleStyle(variant, size),
      pressed && styles.pressed,
      className,
      style,
    ]}
    {...props}
  />
));

Toggle.displayName = "Toggle";

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
  },
  pressed: {
    opacity: 0.7,
  },
});

export { Toggle, toggleVariants };
