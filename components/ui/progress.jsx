import React, { useEffect, useRef } from "react";
import { Animated, View } from "react-native";

export const Progress = ({ value = 0 }) => {
  const width = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(width, {
      toValue: Math.max(0, Math.min(value, 100)),
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [value]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.indicator,
          {
            width: width.interpolate({
              inputRange: [0, 100],
              outputRange: ["0%", "100%"],
            }),
          },
        ]}
      />
    </View>
  );


};

const styles = StyleSheet.create({
  container: {
    height: 16,
    width: "100%",
    borderRadius: 999,
    backgroundColor: "#1e293b", // equivalent to bg-secondary
    overflow: "hidden",
  },
  indicator: {
    height: "100%",
    backgroundColor: "#3b82f6", // equivalent to bg-primary
  },
});