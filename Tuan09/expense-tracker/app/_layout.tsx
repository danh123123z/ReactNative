import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect, useRef } from "react";
import { openDB } from "./db";

export default function RootLayout() {
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) return; // ✅ Ngăn khởi tạo nhiều lần
    isInitialized.current = true;

    (async () => {
      try {
        await openDB();
        console.log("✅ Database initialized successfully");
      } catch (error) {
        console.error("❌ Error opening DB:", error);
      }
    })();
  }, []);

  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  );
}
