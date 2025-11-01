import React, { useRef, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { addExpense } from "../db";

export default function AddExpenseScreen() {
  const router = useRouter();
  const titleRef = useRef<TextInput>(null);
  const amountRef = useRef<TextInput>(null);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"Thu" | "Chi">("Chi");

  const handleSave = async () => {
    if (!title || !amount) {
      Alert.alert("⚠️ Lỗi", "Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    try {
      await addExpense(title, parseFloat(amount), type);
      Alert.alert("✅ Thành công", "Đã lưu vào SQLite!");
      titleRef.current?.clear();
      amountRef.current?.clear();
      setTitle("");
      setAmount("");
    } catch (error) {
      console.error("❌ Lỗi khi thêm khoản chi:", error);
      Alert.alert("❌ Thất bại", "Không thể lưu dữ liệu vào SQLite.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>➕ Thêm khoản Thu/Chi</Text>

      <TextInput
        ref={titleRef}
        placeholder="Tên khoản"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        ref={amountRef}
        placeholder="Số tiền"
        keyboardType="numeric"
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
      />

      <View style={styles.typeContainer}>
        {["Thu", "Chi"].map((t) => (
          <TouchableOpacity
            key={t}
            style={[styles.typeButton, type === t && styles.active]}
            onPress={() => setType(t as "Thu" | "Chi")}
          >
            <Text style={[styles.typeText, type === t && styles.activeText]}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>💾 Lưu</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.saveButton, { backgroundColor: "#888", marginTop: 10 }]}
        onPress={() => router.back()}
      >
        <Text style={styles.saveText}>← Quay lại</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f7f7f7", padding: 20 },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  typeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  typeButton: {
    borderWidth: 1,
    borderColor: "#007AFF",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  active: { backgroundColor: "#007AFF" },
  typeText: { color: "#007AFF", fontWeight: "600" },
  activeText: { color: "#fff" },
  saveButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  saveText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
