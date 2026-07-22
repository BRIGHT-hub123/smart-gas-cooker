import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Line, Polyline, Rect } from "react-native-svg";
import { useGasStore } from "../store/gasStore";

export const GasTrendChart = () => {
  const readings = useGasStore((s) => s.readings);
  const { warningThreshold, dangerThreshold } = useGasStore((s) => s.settings);

  const data = useMemo(() => {
    return [...readings]
      .slice(0, 50)
      .reverse()
      .map((r, i) => ({
        x: i,
        y: r.level,
      }));
  }, [readings]);

  // 📊 STATS ENGINE
  const stats = useMemo(() => {
    if (!readings.length) return null;

    const values = readings.map((r) => r.level);
    const sum = values.reduce((a, b) => a + b, 0);

    return {
      avg: sum / values.length,
      max: Math.max(...values),
      min: Math.min(...values),
    };
  }, [readings]);

  return (
    <View style={styles.card}>
      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Leakage trend</Text>
          <Text style={styles.subtitle}>
            Live gas concentration readings
          </Text>
        </View>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {readings.length} SAMPLES
          </Text>
        </View>
      </View>

      {/* STATS ROW */}
      {stats && (
        <View style={styles.statsRow}>
          <StatBox label="AVG" value={stats.avg.toFixed(1)} color="#3b82f6" />
          <StatBox label="MAX" value={stats.max.toFixed(1)} color="#ef4444" />
          <StatBox label="MIN" value={stats.min.toFixed(1)} color="#22c55e" />
        </View>
      )}

      {/* CHART */}
      {data.length < 2 ? (
        <Text style={styles.empty}>Waiting for sensor stream...</Text>
      ) : (
        <View style={styles.chartWrap}>
          <Svg width="100%" height={220} viewBox="0 0 200 100">

            {/* GRID (brutalist structure lines) */}
            <Line x1="0" y1="0" x2="0" y2="100" stroke="#1f2937" strokeWidth="0.8" />
            <Line x1="0" y1="100" x2="200" y2="100" stroke="#1f2937" strokeWidth="0.8" />

            {/* THRESHOLD ZONES */}
            <Rect
              x="0"
              y={100 - dangerThreshold}
              width="200"
              height="100"
              fill="rgba(239,68,68,0.15)"
            />
            <Rect
              x="0"
              y={100 - warningThreshold}
              width="200"
              height={dangerThreshold - warningThreshold}
              fill="rgba(250,204,21,0.12)"
            />

            {/* THRESHOLD LINES */}
            <Line
              x1="0"
              y1={100 - warningThreshold}
              x2="200"
              y2={100 - warningThreshold}
              stroke="#facc15"
              strokeDasharray="2,2"
              strokeWidth="0.8"
            />

            <Line
              x1="0"
              y1={100 - dangerThreshold}
              x2="200"
              y2={100 - dangerThreshold}
              stroke="#ef4444"
              strokeDasharray="2,2"
              strokeWidth="0.8"
            />

            {/* MAIN LINE */}
            <Polyline
              points={data
                .map((p, i) => {
                  const x = (i / (data.length - 1)) * 200;
                  const y = 100 - p.y;
                  return `${x},${y}`;
                })
                .join(" ")}
              fill="none"
              stroke="#60a5fa"
              strokeWidth="1"
            />
          </Svg>

          {/* Brutalist overlay labels */}
          <View style={styles.axisLabels}>
            <Text style={styles.axisText}>100%</Text>
            <Text style={styles.axisText}>0%</Text>
          </View>
        </View>
      )}
    </View>
  );
};

/* ---------------- SMALL STAT BOX ---------------- */
function StatBox({ label, value, color }) {
  return (
    <View style={[styles.statBox, { borderColor: color }]}>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#0b1220",

    borderRadius: 18,

    padding: 16,
    marginVertical: 12,

    // NEUMORPHIC SHADOW
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },

    borderWidth: 1,
    borderColor: "#1f2937",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  title: {
    fontSize: 15,
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: 0.5,
  },

  subtitle: {
    fontSize: 11,
    color: "#94a3b8",
    marginTop: 2,
  },

  badge: {
    backgroundColor: "#111827",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#334155",
  },

  badgeText: {
    color: "#38bdf8",
    fontSize: 10,
    fontWeight: "700",
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  statBox: {
    flex: 1,
    marginHorizontal: 4,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#0f172a",
    borderWidth: 1,
  },

  statValue: {
    fontSize: 16,
    fontWeight: "800",
  },

  statLabel: {
    fontSize: 10,
    color: "#94a3b8",
  },

  chartWrap: {
    position: "relative",
    height: 220,
  },

  axisLabels: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    justifyContent: "space-between",
  },

  axisText: {
    fontSize: 10,
    color: "#64748b",
  },

  empty: {
    textAlign: "center",
    color: "#64748b",
    paddingVertical: 40,
    fontSize: 12,
  },
});