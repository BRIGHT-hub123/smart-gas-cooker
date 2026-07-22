import React, { useRef, useState } from "react";
import { Dimensions, PanResponder, StyleSheet, View } from "react-native";

const { width, height } = Dimensions.get("window");

const ResizablePanelGroup = ({ direction = "horizontal", children, style }) => {
  const isHorizontal = direction === "horizontal";
  const [size, setSize] = useState(0.5);
  const panResponder = useRef(PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      let ratio = isHorizontal ? gesture.moveX / width : gesture.moveY / height;
      ratio = Math.max(0.1, Math.min(0.9, ratio));
      setSize(ratio);
    },
  })).current;
  const panels = React.Children.toArray(children);

  return (
    <View style={[styles.container, { flexDirection: isHorizontal ? "row" : "column" }, style]}>
      <View style={{ flex: size }}>{panels[0]}</View>
      <View {...panResponder.panHandlers} style={[styles.handle, isHorizontal ? { width: 10, height: "100%" } : { width: "100%", height: 10 }]}>
        <View style={[styles.handleBar, isHorizontal ? { width: 4, height: 40 } : { width: 40, height: 4 }]} />
      </View>
      <View style={{ flex: 1 - size }}>{panels[1]}</View>
    </View>
  );
};

const ResizablePanel = ({ children, style }) => {
  return <View style={[{ flex: 1 }, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  handle: { backgroundColor: "#e5e7eb", justifyContent: "center", alignItems: "center" },
  handleBar: { backgroundColor: "#9ca3af", borderRadius: 999 },
});

export { ResizablePanel, ResizablePanelGroup };
