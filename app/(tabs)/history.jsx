import {
    Activity,
    AlertTriangle,
    Hand,
    Trash2
} from "lucide-react-native";

import React from "react";
import {
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    View
} from "react-native";

import { Card } from "../../components/ui/card";
import { useGasStore } from "../../store/gasStore";

const iconFor = (type) => {
  if (type === "alert") return AlertTriangle;
  if (type === "action") return Hand;
  return Activity;
};

const colorFor = (type) => {
  if (type === "alert") return styles.alertBg;
  if (type === "action") return styles.actionBg;
  return styles.defaultBg;
};

const History = () => {
  const logs = useGasStore((s) => s.logs);

  const clearHistory = useGasStore((s) => s.clearHistory);

  const renderItem = ({ item }) => {
    const Icon = iconFor(item.type);

    return (
      <Card style={[styles.item, colorFor(item.type)]}>

        {/* Icon box */}
        <View style={[styles.iconBox, colorFor(item.type)]}>
          <Icon size={18} color="white" />
        </View>

        {/* Text */}
        <View style={styles.textBox}>
          <Text style={styles.message}>{item.message}</Text>
          <Text style={styles.time}>
            {new Date(item.timestamp).toLocaleString()}
          </Text>
        </View>

      </Card>
    );
  };

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Monitoring history</Text>
          <Text style={styles.subtitle}>
            Gas readings, alerts, and valve actions
          </Text>
        </View>
        <Pressable style={styles.iconBtn} onPress={clearHistory}>
          <Trash2 size={18} color="white" />
        </Pressable>
      </View>

      {/* Empty state */}
      {logs.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No monitoring activity yet.</Text>
        </View>
      ) : (
        <FlatList
          data={logs}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
    padding: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#94a3b8",
    fontSize: 14,
    marginTop: 4,
  },

  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText: {
    color: "#94a3b8",
    fontSize: 14,
  },

  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 12,
    marginBottom: 10,
    backgroundColor: "#0f172a",
    borderWidth: 1,
    borderColor: "#1e293b",
    borderRadius: 12,
    gap: 10,
  },

  iconBtn: {
    height: 40,
    width: 40,
    borderWidth: 2,
    borderColor: "red",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  iconBox: {
    height: 40,
    width: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  textBox: {
    flex: 1,
  },

  message: {
    color: "white",
    fontSize: 14,
  },

  time: {
    color: "#64748b",
    fontSize: 11,
    marginTop: 4,
  },

  // icon background variants
  alertBg: {
    backgroundColor: "rgba(234,179,8,0.2)",
  },

  actionBg: {
    backgroundColor: "rgba(34,211,238,0.2)",
  },

  defaultBg: {
    backgroundColor: "#334155",
  },
});
export default History;