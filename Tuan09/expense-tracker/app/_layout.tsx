import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect } from "react";
import { openDB } from "./db";

export default function RootLayout() {
  useEffect(() => {
    openDB();
  }, []);

  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Expense Tracker" }} />
        <Stack.Screen name="add" options={{ title: "Thêm khoản Thu/Chi" }} />
      </Stack>
    </SafeAreaProvider>
  );
}
