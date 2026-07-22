import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";
import { useGasStore } from "../store/gasStore";

const COLORS = {
  SAFE: "#22c55e",
  WARNING: "#facc15",
  DANGER: "#ef4444",
};

const GasGauge = ({ size = 240 }) => {
  const level = useGasStore((s) => s.level); // ⚠ fixed (was gasLevel)
  const state = useGasStore((s) => s.state);

  const color = COLORS[state];

  const stroke = 16;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (level / 100) * c;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg
        width={size}
        height={size}
        style={{ transform: [{ rotate: "-90deg" }] }}
      >
        <Defs>
          <LinearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0%" stopColor={color} stopOpacity={1} />
            <Stop offset="100%" stopColor={color} stopOpacity={0.5} />
          </LinearGradient>
        </Defs>

        {/* Background ring */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="#1e293b"
          strokeWidth={stroke}
          fill="none"
        />

        {/* Progress ring */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="url(#g)"
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={`${c} ${c}`}
          strokeDashoffset={offset}
        />
      </Svg>

      {/* Center content */}
      <View style={styles.center}>
        <Text style={[styles.levelText, { color }]}>
          {level.toFixed(0)}
          <Text style={styles.percent}>%</Text>
        </Text>

        <View
          style={[
            styles.badge,
            {
              backgroundColor: color + "22",
              borderColor: color,
            },
          ]}
        >
          <View style={[styles.dot, { backgroundColor: color }]} />
          <Text style={[styles.stateText, { color }]}>{state}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },

  center: {
    position: "absolute",
    alignItems: "center",
  },

  levelText: {
    fontSize: 48,
    fontWeight: "700",
  },

  percent: {
    color: "#94a3b8",
    fontSize: 22,
  },

  badge: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 1,
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },

  stateText: {
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 2,
  },
});

export default GasGauge;