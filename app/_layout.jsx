import { Stack } from "expo-router";

// Root layout - handles auth screens (login, signup) and main app
export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Auth screens */}
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
      
      {/* Main app with tabs */}
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}