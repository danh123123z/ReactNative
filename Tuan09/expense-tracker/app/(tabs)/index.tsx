import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet, StatusBar, FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ExpenseItem from "@/components/ExpenseItem";

export default function HomeScreen() {
  const mockData: { title: string; amount: number; createdAt: string; type: "Thu" | "Chi" }[] = [
  { title: "Mua cà phê", amount: 45000, createdAt: "01/11/2025", type: "Chi" },
  { title: "Lương tháng 10", amount: 15000000, createdAt: "01/11/2025", type: "Thu" },
  { title: "Ăn trưa", amount: 60000, createdAt: "31/10/2025", type: "Chi" },
];
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#007AFF" />

      {/* Header Gradient */}
      <LinearGradient
        colors={["#007AFF", "#00C6FF"]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.title}>💸 EXPENSE TRACKER</Text>
      </LinearGradient>

      {/* Nội dung */}
      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.heading}>Xin chào 👋</Text>
          <Text style={styles.text}>
            Chào mừng bạn đến với ứng dụng quản lý chi tiêu cá nhân.
          </Text>
          <Text style={styles.text}>
            Bạn có thể ghi lại khoản thu/chi, xem thống kê, và đồng bộ dữ liệu
            với MockAPI.
          </Text>
        </View>

        {/* Danh sách khoản Thu/Chi */}
        <FlatList
          data={mockData}
          renderItem={({ item }) => <ExpenseItem {...item} />}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingVertical: 10 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f3f6fa" },
  header: {
    paddingVertical: 24,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
    marginBottom: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 10,
    color: "#007AFF",
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
    color: "#444",
    marginBottom: 8,
  },
});
