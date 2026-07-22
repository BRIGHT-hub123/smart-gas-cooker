import { useEffect } from "react";
import { Animated, Dimensions, StyleSheet, Text, View } from "react-native";

import { useToast } from "./use-toast";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export function Toaster() {
  const { toasts } = useToast();

  return (
    <View style={styles.container} pointerEvents="box-none">
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <ToastItem
            key={id}
            id={id}
            title={title}
            description={description}
            action={action}
            {...props}
          />
        );
      })}
    </View>
  );
}

function ToastItem({ id, title, description, action, variant = "default" }) {
  const translateY = new Animated.Value(-100);

  useEffect(() => {
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
      tension: 65,
      friction: 11,
    }).start();
  }, [translateY]);

  const getBackgroundColor = () => {
    switch (variant) {
      case "destructive":
        return "#fee2e2";
      case "success":
        return "#dcfce7";
      default:
        return "#ffffff";
    }
  };

  return (
    <Animated.View
      style={[
        styles.toast,
        { backgroundColor: getBackgroundColor() },
        { transform: [{ translateY }] },
      ]}
    >
      <View style={styles.content}>
        {title && <Text style={styles.title}>{title}</Text>}
        {description && <Text style={styles.description}>{description}</Text>}
      </View>
      {action}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    zIndex: 9999,
    alignItems: "center",
    paddingHorizontal: 16,
  },
  toast: {
    width: SCREEN_WIDTH - 32,
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 8,
  },
  content: {
    gap: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0f172a",
  },
  description: {
    fontSize: 14,
    color: "#475569",
  },
});
