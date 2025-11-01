import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { addExpense } from "../db";
import { useNavigation } from "@react-navigation/native";

export default function AddExpenseScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const titleRef = useRef<TextInput>(null);
  const amountRef = useRef<TextInput>(null);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"Thu" | "Chi">("Chi");

  const handleSave = async () => {
    // Validate input
    if (!title.trim() || !amount.trim()) {
      Alert.alert("⚠️ Lỗi", "Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const amountNumber = parseFloat(amount);
    if (isNaN(amountNumber) || amountNumber <= 0) {
      Alert.alert("⚠️ Lỗi", "Số tiền phải là số dương!");
      return;
    }

    try {
      // Lưu vào SQLite DB
      await addExpense(title, amountNumber, type);

      // Clear input sử dụng useRef
      titleRef.current?.clear();
      amountRef.current?.clear();
      setTitle("");
      setAmount("");
      setType("Chi");

      // Chuyển về tab home ngay lập tức
      navigation.navigate("index" as never);

      // Hiển thị toast notification thay vì Alert
      setTimeout(() => {
        Alert.alert("✅ Thành công", "Đã lưu vào SQLite!");
      }, 300);
    } catch (error) {
      console.error("❌ Lỗi khi thêm khoản chi:", error);
      Alert.alert("❌ Thất bại", "Không thể lưu dữ liệu vào SQLite.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Gradient */}
      <LinearGradient
        colors={["#007AFF", "#00C6FF"]}
        style={styles.headerGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.header}>➕ Thêm khoản Thu/Chi</Text>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.label}>📝 Tên khoản</Text>
          <TextInput
            ref={titleRef}
            placeholder="VD: Lương tháng 11, Tiền điện..."
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>💰 Số tiền</Text>
          <TextInput
            ref={amountRef}
            placeholder="VD: 1000000"
            keyboardType="numeric"
            style={styles.input}
            value={amount}
            onChangeText={setAmount}
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>📊 Loại</Text>
          <View style={styles.typeContainer}>
            {["Thu", "Chi"].map((t) => (
              <TouchableOpacity
                key={t}
                style={[styles.typeButton, type === t && styles.active]}
                onPress={() => setType(t as "Thu" | "Chi")}
              >
                <Text
                  style={[styles.typeText, type === t && styles.activeText]}
                >
                  {t === "Thu" ? "📈 Thu" : "📉 Chi"}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Nút Save */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveText}>💾 Save</Text>
        </TouchableOpacity>

        {/* Nút quay lại */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backText}>← Quay lại</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f6fa",
  },
  headerGradient: {
    paddingVertical: 24,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 6,
  },
  header: {
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
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E5EA",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    backgroundColor: "#F9F9F9",
    color: "#000",
  },
  typeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    gap: 12,
  },
  typeButton: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#007AFF",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  active: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  typeText: {
    color: "#007AFF",
    fontWeight: "600",
    fontSize: 16,
  },
  activeText: {
    color: "#fff",
    fontWeight: "700",
  },
  saveButton: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  saveText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  backButton: {
    backgroundColor: "#8E8E93",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 12,
  },
  backText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
