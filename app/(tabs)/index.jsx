
import { Redirect } from "expo-router";
import React, { useMemo } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    View
} from "react-native";

import { AlertTriangle, Power, ShieldCheck, ShieldOff } from "lucide-react-native";
import GasGauge from "../../components/GasGauge";
import { GasTrendChart } from "../../components/GasTrendChart";
import Button from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { useAuthStore } from "../../store/authStore";
import { useGasStore } from "../../store/gasStore";

const Dashboard = () => {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  // ✅ reactive selectors (IMPORTANT FIX)
  const state = useGasStore((s) => s.state);
  const valveOpen = useGasStore((s) => s.valveOpen);
  const alerts = useGasStore((s) => s.alerts);

  const manualShutoff = useGasStore((s) => s.manualShutoff);
  const reopenValve = useGasStore((s) => s.reopenValve);

  const lastAlert = useMemo(() => alerts?.[0], [alerts]);

  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

  const handleShutoff = () => {
    if (!valveOpen) return;
    manualShutoff();
    Alert.alert("Emergency", "Emergency shutoff engaged");
  };

  return (
    <ScrollView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeLabel}>Gas leakage monitor</Text>
          <Text style={styles.pageTitle}>{user?.name ?? "Guest"}</Text>
        </View>

        <Button variant="ghost" style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutText}>Logout</Text>
        </Button>
      </View>

      {/* Danger Banner */}
      {state === "DANGER" && (
        <View style={styles.dangerBanner}>
          <AlertTriangle size={20} color="red" />
          <View>
            <Text style={styles.dangerTitle}>Critical leak detected</Text>
            <Text style={styles.dangerSubtitle}>
              Auto-shutoff engaged. Ventilate immediately.
            </Text>
          </View>
        </View>
      )}

      {/* Gas concentration */}
      <Card style={styles.gasCard}>
        <Card style={styles.workspaceContainer}>
          <GasGauge size={240} />

          <Text style={styles.workspaceText}>
            Live LPG concentration reading from the MQ-2 sensor
          </Text>
        </Card>

        <View style={styles.valveRow}>
          <View style={styles.valveInfo}>
            <Power size={18} color={valveOpen ? "green" : "red"} />
            <View style={styles.valveTextGroup}>
              <Text style={styles.valveLabel}>Solenoid valve</Text>
              <Text style={styles.valveState}>{valveOpen ? "OPEN" : "CLOSED"}</Text>
            </View>
          </View>

          <View style={[styles.valveBadge, valveOpen ? styles.badgeOn : styles.badgeOff]}>
            <Text style={styles.valveBadgeText}>{valveOpen ? "ON" : "OFF"}</Text>
          </View>
        </View>
      </Card>

      <GasTrendChart />

      {/* Control actions */}
      <View style={styles.actionsRow}>
        <Button
          variant="destructive"
          style={[styles.actionBtn, !valveOpen && styles.disabledBtn]}
          disabled={!valveOpen}
          onPress={handleShutoff}
        >
          <ShieldOff size={18} color="white" />
          <Text style={styles.actionText}>Shutoff</Text>
        </Button>

        <Button
          variant="outline"
          style={styles.actionBtn}
          onPress={() => {
            reopenValve();
            Alert.alert("Success", "Valve reopened");
          }}
          disabled={valveOpen || state === "DANGER"}
        >
          <ShieldCheck size={18} color="white" />
          <Text style={styles.actionText}>Reopen</Text>
        </Button>
      </View>

      {/* Latest alert */}
      {lastAlert && (
        <Card style={styles.alertCard}>
          <Text style={styles.sectionLabel}>Latest alert</Text>
          <Text style={styles.alertMessage}>{lastAlert.message}</Text>
          <Text style={styles.alertState}>{lastAlert.state}</Text>
        </Card>
      )}

    </ScrollView>
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
  welcomeLabel: {
    color: "#94a3b8",
    fontSize: 12,
  },
  pageTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
  logoutButton: {
    borderWidth: 1,
    borderColor: "#475569",
    backgroundColor: "transparent",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  logoutText: {
    color: "#94a3b8",
  },
  dangerBanner: {
    flexDirection: "row",
    backgroundColor: "rgba(239,68,68,0.2)",
    padding: 15,
    borderRadius: 16,
    marginBottom: 20,
    gap: 10,
  },
  dangerTitle: {
    color: "#f87171",
    fontWeight: "bold",
  },
  dangerSubtitle: {
    color: "#fca5a5",
    fontSize: 12,
  },
  gasCard: {
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  sectionLabel: {
    color: "#94a3b8",
    fontSize: 12,
    marginBottom: 10,
  },
  gaugeCircle: {
    height: 120,
    width: 120,
    borderRadius: 60,
    backgroundColor: "#1e293b",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  gaugeText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  valveRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "#1e293b",
    padding: 12,
    borderRadius: 16,
    alignItems: "center",
  },
  valveInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  valveTextGroup: {
    marginLeft: 10,
  },
  valveLabel: {
    color: "#94a3b8",
    fontSize: 11,
  },
  valveState: {
    color: "white",
    fontWeight: "600",
  },
  valveBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeOn: {
    backgroundColor: "rgba(34,197,94,0.2)",
  },
  badgeOff: {
    backgroundColor: "rgba(239,68,68,0.2)",
  },
  valveBadgeText: {
    color: "white",
    fontSize: 11,
    fontWeight: "bold",
  },
  actionsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
    padding: 10
  },
  actionBtn: {
    flex: 1,
    height: 50,
    borderRadius: 16,
  },
  disabledBtn: {
    opacity: 0.5,
  },
  actionText: {
    color: "white",
    marginLeft: 8,
  },
  deviceRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  deviceCard: {
    flex: 1,
    padding: 15,
    borderRadius: 16,
    alignItems: "center",
  },
  deviceText: {
    color: "white",
    marginTop: 8,
  },
  alertCard: {
    padding: 15,
    borderRadius: 16,
  },
  alertMessage: {
    color: "white",
    marginTop: 5,
  },
  alertState: {
    color: "#94a3b8",
    fontSize: 12,
    marginTop: 5,
  },
  workspaceContainer: {
    marginTop: 20,            // mt-5
    marginBottom: 20,
    alignItems: "center",     // items-center
    borderRadius: 24,         // rounded-3xl
    borderWidth: 1,
    borderColor: "#334155",   // border-border (slate tone)
    backgroundColor: "#0f172a", // bg-card (dark card)
    padding: 24,              // p-6
  },

  workspaceText: {
    marginTop: 16,            // mt-4
    textAlign: "center",
    fontSize: 12,             // text-xs
    color: "#94a3b8",         // text-muted-foreground
  }
});

export default Dashboard;