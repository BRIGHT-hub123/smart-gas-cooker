import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { useAuthStore } from "../store/authStore";

export default function Index() {
  const user = useAuthStore((s) => s.user);

  // ✅ wait for persisted state to load
  const hasHydrated = useAuthStore.persist?.hasHydrated?.();

  if (!hasHydrated) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  // ✅ NOW gate properly
  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

  return <Redirect href="/(tabs)" />;
}