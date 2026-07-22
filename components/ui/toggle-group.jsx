import * as React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { cn } from "@/lib/utils";
import { toggleVariants } from "./toggle";

const ToggleGroupContext = React.createContext({
  size: "default",
  variant: "default",
});

const ToggleGroup = React.forwardRef(({ className, variant, size, children, ...props }, ref) => (
  <View ref={ref} style={cn(styles.group, className)} {...props}>
    <ToggleGroupContext.Provider value={{ variant, size }}>{children}</ToggleGroupContext.Provider>
  </View>
));

ToggleGroup.displayName = "ToggleGroup";

const ToggleGroupItem = React.forwardRef(({ className, children, variant, size, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext);

  return (
    <Pressable
      ref={ref}
      style={({ pressed }) =>
        cn(
          styles.item,
          toggleVariants({
            variant: context.variant || variant,
            size: context.size || size,
          }),
          pressed && styles.pressed,
          className,
        )
      }
      {...props}
    >
      {children}
    </Pressable>
  );
});

ToggleGroupItem.displayName = "ToggleGroupItem";

const styles = StyleSheet.create({
  group: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  item: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  pressed: {
    opacity: 0.7,
  },
});

export { ToggleGroup, ToggleGroupItem };
