import React, { useRef, useState } from "react";
import { PanResponder, StyleSheet, View } from "react-native";

const Slider = ({
  min = 0,
  max = 100,
  value = 0,
  onChange,
  minimumValue,
  maximumValue,
  step = 1,
  onValueChange,
}) => {
  const resolvedMin = minimumValue ?? min;
  const resolvedMax = maximumValue ?? max;
  const [layoutWidth, setLayoutWidth] = useState(0);
  const [layoutX, setLayoutX] = useState(0);
  const [currentValue, setCurrentValue] = useState(value);
  const sliderRef = useRef(null);

  React.useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const normalizeValue = (rawValue) => {
    const clamped = Math.max(resolvedMin, Math.min(resolvedMax, rawValue));
    const stepped = Math.round((clamped - resolvedMin) / step) * step + resolvedMin;
    return Math.max(resolvedMin, Math.min(resolvedMax, stepped));
  };

  const handleChange = (newValue) => {
    const normalized = normalizeValue(newValue);
    setCurrentValue(normalized);
    onChange?.(normalized);
    onValueChange?.(normalized);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (!layoutWidth) return;

        let newX = gestureState.moveX - layoutX;
        let relative = Math.max(0, Math.min(newX, layoutWidth));

        let newValue =
          resolvedMin + (relative / layoutWidth) * (resolvedMax - resolvedMin);

        handleChange(newValue);
      },
    })
  ).current;

  const progress =
    resolvedMax === resolvedMin
      ? 0
      : ((currentValue - resolvedMin) / (resolvedMax - resolvedMin)) * 100;

  return (
    <View
      ref={sliderRef}
      style={styles.container}
      onLayout={(e) => {
        setLayoutWidth(e.nativeEvent.layout.width);
        setLayoutX(e.nativeEvent.layout.x);
      }}
      {...panResponder.panHandlers}
    >
      <View style={styles.track}>
        <View style={[styles.range, { width: `${progress}%` }]} />
      </View>

      <View style={[styles.thumb, { left: `${progress}%` }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    justifyContent: "center",
  },
  track: {
    height: 8,
    width: "100%",
    backgroundColor: "#e5e7eb", // secondary
    borderRadius: 999,
    overflow: "hidden",
  },
  range: {
    height: "100%",
    backgroundColor: "#000", // primary
  },
  thumb: {
    position: "absolute",
    width: 20,
    height: 20,
    borderRadius: 999,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#000",
    marginTop: -6,
    transform: [{ translateX: -10 }],
  },
});

export { Slider };
