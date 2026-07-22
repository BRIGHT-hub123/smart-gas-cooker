import { X } from "lucide-react-native";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

export const Toast = ({
  visible,
  onClose,
  title,
  description,
  variant = "default",
  duration = 3000,
}) => {
  const translateY = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -100,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => onClose && onClose());
  };

  if (!visible) return null;

  const isDestructive = variant === "destructive";

  return (
    <Animated.View
      style={[
        styles.toast,
        isDestructive && styles.destructive,
        {
          transform: [{ translateY }],
          opacity,
        },
      ]}
    >
      <View style={{ flex: 1 }}>
        {title && <Text style={styles.title}>{title}</Text>}
        {description && (
          <Text style={styles.description}>{description}</Text>
        )}
      </View>

      <Pressable onPress={handleClose} style={styles.closeBtn}>
        <X size={16} color="#000" />
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toast: {
    position: "absolute",
    top: 50,
    alignSelf: "center",
    width: SCREEN_WIDTH * 0.9,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    elevation: 5,
  },

  destructive: {
    backgroundColor: "#ff4d4f",
  },

  title: {
    fontWeight: "600",
    fontSize: 14,
    marginBottom: 2,
  },

  description: {
    fontSize: 13,
    color: "#555",
  },

  closeBtn: {
    marginLeft: 10,
    padding: 4,
  },
});