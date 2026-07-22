import { LogOut } from "lucide-react-native";
import React from "react";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "../../store/authStore";

export default function Settings() {
  const user = useAuthStore((a) => a.user);
  const logout = useAuthStore((a) => a.logout);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>System settings</Text>
        <Text style={styles.subtitle}>
          Basic account and session controls for the gas leakage monitor.
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.card}>
            <View style={styles.accountRow}>
              <View>
                <Text style={styles.name}>{user?.name}</Text>
                <Text style={styles.email}>{user?.email}</Text>
              </View>

              <Pressable onPress={logout} style={styles.logoutBtn}>
                <LogOut color="#f1f5f9" size={14} />
                <Text style={styles.logoutText}>Sign out</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
  },

  scroll: {
    padding: 20,
    paddingBottom: 40,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },

  subtitle: {
    fontSize: 12,
    color: "#94a3b8",
    marginTop: 4,
  },

  section: {
    marginTop: 20,
  },

  sectionTitle: {
    fontSize: 11,
    color: "#94a3b8",
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 8,
  },

  card: {
    backgroundColor: "#0f172a",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1e293b",
    overflow: "hidden",
  },

  accountRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },

  name: {
    color: "white",
    fontWeight: "600",
  },

  email: {
    color: "#94a3b8",
    fontSize: 12,
  },

  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e293b",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },

  logoutText: {
    color: "#f1f5f9",
    fontSize: 12,
    marginLeft: 6,
  },
});