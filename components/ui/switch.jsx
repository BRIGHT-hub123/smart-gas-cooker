import React, { useEffect, useRef, useState } from "react";
import { Animated, Pressable, StyleSheet } from "react-native";
import { themeStyles, useThemeStore } from "../../store/themeStore";

const Switch = ({ value = false, onValueChange }) => {
  const theme = useThemeStore((s) => s.style);
  const [isOn, setIsOn] = useState(value);

  const anim = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    setIsOn(value);
  }, [value]);

  useEffect(() => {
    Animated.timing(anim, {
      toValue: isOn ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isOn, anim]);

  const toggle = () => {
    const newValue = !isOn;
    setIsOn(newValue);
    onValueChange?.(newValue);
  };

  const translateX = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 22], // thumb movement
  });

  const backgroundColor = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#e5e7eb", "#3b82f6"], // off / on
  });

const themeTrack = themeStyles[theme]?.switch || {};

  return (
    <Pressable onPress={toggle}>
      <Animated.View style={[styles.track, themeTrack, { backgroundColor }]}> 
        <Animated.View style={[styles.thumb, { transform: [{ translateX }] }]} />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  track: {
    width: 44,
    height: 24,
    borderRadius: 999,
    padding: 2,
    justifyContent: "center",
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 999,
    backgroundColor: "#fff",
    elevation: 2, // shadow Android
    shadowColor: "#000", // shadow iOS
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});

export { Switch };
