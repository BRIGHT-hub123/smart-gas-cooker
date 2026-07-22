import { Bell, CheckCheck, Trash2 } from "lucide-react-native";
import React from "react";
import {
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { Card } from "../../components/ui/card";
import { useGasStore } from "../../store/gasStore";

const Alerts = () => {
  const alerts = useGasStore((s) => s.alerts);
  const markAlertRead = useGasStore((s) => s.markAlertRead);
  const markAllRead = useGasStore((s) => s.markAllRead);
  const clearAlerts = useGasStore((s) => s.clearAlerts);

  const renderItem = ({ item }) => (
    <Pressable
      onPress={() => markAlertRead(item.id)}
      style={[
        styles.card,
        item.read ? styles.read : styles.unread,
        item.state === "DANGER" ? styles.dangerBorder : styles.warningBorder,
      ]}
    >
      <View style={styles.rowBetween}>
        <Text
          style={[
            styles.badge,
            item.state === "DANGER"
              ? styles.badgeDanger
              : styles.badgeWarning,
          ]}
        >
          {item.state}
        </Text>

        <Text style={styles.time}>
          {new Date(item.timestamp).toLocaleString()}
        </Text>
      </View>

      <Text style={styles.message}>{item.message}</Text>

      {!item.read && <View style={styles.unreadDot} />}
    </Pressable>
  );

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Leak alerts</Text>

        <View style={styles.actions}>
          <Pressable style={styles.iconBtn} onPress={markAllRead}>
            <CheckCheck size={18} color="white" />
          </Pressable>

          <Pressable style={styles.iconBtn} onPress={clearAlerts}>
            <Trash2 size={18} color="white" />
          </Pressable>
        </View>
      </View>

      {/* Empty State */}
      {alerts.length === 0 ? (
        <Card style={styles.empty}>
          <Bell size={40} color="#94a3b8" />
          <Text style={styles.emptyText}>
            No gas leak alerts yet.
          </Text>
        </Card>
      ) : (
        <FlatList
          data={alerts}
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
    backgroundColor: "#0f172a",
    padding: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    alignItems: "center",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },

  actions: {
    flexDirection: "row",
    gap: 10,
  },

  iconBtn: {
    padding: 8,
    borderWidth: 1,
    borderColor: "#475569",
    borderRadius: 10,
  },

  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1e293b",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#334155",
  },

  emptyText: {
    marginTop: 10,
    color: "#94a3b8",
    fontSize: 14,
    textAlign: "center",
  },

  card: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
  },

  read: {
    backgroundColor: "#1e293b",
  },

  unread: {
    backgroundColor: "#334155",
  },

  dangerBorder: {
    borderColor: "#f87171",
  },

  warningBorder: {
    borderColor: "#facc15",
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
    alignItems: "center",
  },

  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
    fontSize: 10,
    fontWeight: "bold",
    color: "white",
    overflow: "hidden",
  },

  badgeDanger: {
    backgroundColor: "rgba(239,68,68,0.2)",
    color: "#f87171",
  },

  badgeWarning: {
    backgroundColor: "rgba(234,179,8,0.2)",
    color: "#facc15",
  },

  time: {
    fontSize: 11,
    color: "#94a3b8",
  },

  message: {
    color: "white",
    fontSize: 14,
  },

  unreadDot: {
    marginTop: 8,
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: "#22d3ee",
  },
});
export default Alerts;