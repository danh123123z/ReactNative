import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Platform,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAllExpensesForSync } from "@/app/db";
import {
  syncExpensesToAPI,
  validateAPIUrl,
  getAllExpensesFromAPI,
} from "@/app/api";

const DEFAULT_API_URL = "https://68e9ecb2f1eeb3f856e55f46.mockapi.io/api/todos";
const STORAGE_KEY = "expense_api_url";

export default function SyncScreen() {
  const [apiUrl, setApiUrl] = useState(DEFAULT_API_URL);
  const [customUrl, setCustomUrl] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState("");
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(null);
  const [apiDataCount, setApiDataCount] = useState<number | null>(null);

  // Load saved API URL
  useEffect(() => {
    loadSavedUrl();
    checkAPIData();
  }, []);

  const loadSavedUrl = async () => {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved) {
        setApiUrl(saved);
        setCustomUrl(saved === DEFAULT_API_URL ? "" : saved);
      }
    } catch (error) {
      console.error("Error loading saved URL:", error);
    }
  };

  const saveUrl = async (url: string) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, url);
    } catch (error) {
      console.error("Error saving URL:", error);
    }
  };

  const checkAPIData = async () => {
    try {
      const data = await getAllExpensesFromAPI(apiUrl);
      setApiDataCount(data.length);
    } catch (error) {
      setApiDataCount(null);
    }
  };

  const handleSync = async () => {
    // Validate URL
    if (!validateAPIUrl(apiUrl)) {
      const message =
        "❌ URL không hợp lệ!\n\nVui lòng nhập URL MockAPI hợp lệ.";
      if (Platform.OS === "web") {
        window.alert(message);
      } else {
        Alert.alert("URL không hợp lệ", "Vui lòng nhập URL MockAPI hợp lệ.");
      }
      return;
    }

    setIsSyncing(true);
    setSyncStatus("Đang lấy dữ liệu từ database...");

    try {
      // 1. Lấy tất cả expenses từ SQLite (bao gồm cả deleted)
      const expenses = await getAllExpensesForSync();
      setSyncStatus(`Tìm thấy ${expenses.length} khoản thu chi...`);

      // 2. Đồng bộ lên API
      setSyncStatus("Đang xóa dữ liệu cũ trên API...");
      await new Promise((resolve) => setTimeout(resolve, 500));

      setSyncStatus("Đang tải dữ liệu lên API...");
      await syncExpensesToAPI(apiUrl, expenses as any);

      // 3. Cập nhật thời gian sync
      const now = new Date().toLocaleString("vi-VN");
      setLastSyncTime(now);
      await AsyncStorage.setItem("last_sync_time", now);

      // 4. Kiểm tra lại API
      await checkAPIData();

      setSyncStatus("✅ Đồng bộ thành công!");

      const successMsg = `✅ Đồng bộ thành công!\n\nĐã đồng bộ ${expenses.length} khoản thu chi lên API.`;
      if (Platform.OS === "web") {
        window.alert(successMsg);
      } else {
        Alert.alert(
          "Thành công",
          `Đã đồng bộ ${expenses.length} khoản thu chi lên API.`
        );
      }
    } catch (error) {
      console.error("Sync error:", error);
      setSyncStatus("❌ Đồng bộ thất bại!");

      const errorMsg = `❌ Đồng bộ thất bại!\n\n${
        error instanceof Error ? error.message : "Lỗi không xác định"
      }`;
      if (Platform.OS === "web") {
        window.alert(errorMsg);
      } else {
        Alert.alert(
          "Lỗi",
          error instanceof Error ? error.message : "Đồng bộ thất bại!"
        );
      }
    } finally {
      setIsSyncing(false);
      setTimeout(() => setSyncStatus(""), 3000);
    }
  };

  const handleUseCustomUrl = () => {
    if (!customUrl.trim()) {
      const message = "Vui lòng nhập URL!";
      if (Platform.OS === "web") {
        window.alert(message);
      } else {
        Alert.alert("Thiếu URL", message);
      }
      return;
    }

    if (!validateAPIUrl(customUrl)) {
      const message = "URL không hợp lệ! Vui lòng nhập URL MockAPI.";
      if (Platform.OS === "web") {
        window.alert(message);
      } else {
        Alert.alert("URL không hợp lệ", "Vui lòng nhập URL MockAPI hợp lệ.");
      }
      return;
    }

    setApiUrl(customUrl);
    saveUrl(customUrl);
    checkAPIData();

    const message = "✅ Đã cập nhật URL!";
    if (Platform.OS === "web") {
      window.alert(message);
    } else {
      Alert.alert("Thành công", "Đã cập nhật URL API.");
    }
  };

  const handleUseDefaultUrl = () => {
    setApiUrl(DEFAULT_API_URL);
    setCustomUrl("");
    saveUrl(DEFAULT_API_URL);
    checkAPIData();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#9C27B0" />

      {/* Header Gradient */}
      <LinearGradient
        colors={["#9C27B0", "#E91E63"]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.title}>🔄 ĐỒNG BỘ DỮ LIỆU</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Info Card */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>ℹ️ Hướng dẫn</Text>
          <Text style={styles.infoText}>
            • Đồng bộ sẽ xóa toàn bộ dữ liệu cũ trên API{"\n"}• Sau đó copy tất
            cả thu chi từ SQLite lên API{"\n"}• Bạn có thể dùng URL mặc định
            hoặc tự tạo MockAPI
          </Text>
        </View>

        {/* API Status */}
        <View style={styles.statusCard}>
          <View style={styles.statusRow}>
            <Ionicons name="link" size={20} color="#9C27B0" />
            <Text style={styles.statusLabel}>API hiện tại:</Text>
          </View>
          <Text style={styles.urlText} numberOfLines={2}>
            {apiUrl}
          </Text>
          {apiDataCount !== null && (
            <View style={styles.countBadge}>
              <Text style={styles.countText}>
                📊 {apiDataCount} khoản trên API
              </Text>
            </View>
          )}
        </View>

        {/* Custom URL Input */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🔗 URL tùy chỉnh</Text>
          <Text style={styles.cardSubtitle}>
            Paste link MockAPI của bạn vào đây:
          </Text>
          <TextInput
            style={styles.input}
            placeholder="https://mockapi.io/api/..."
            placeholderTextColor="#999"
            value={customUrl}
            onChangeText={setCustomUrl}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={handleUseDefaultUrl}
            >
              <Text style={styles.secondaryButtonText}>↩️ Dùng mặc định</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.primaryButton]}
              onPress={handleUseCustomUrl}
            >
              <Text style={styles.primaryButtonText}>✓ Áp dụng</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Sync Button */}
        <TouchableOpacity
          style={[styles.syncButton, isSyncing && styles.syncButtonDisabled]}
          onPress={handleSync}
          disabled={isSyncing}
        >
          {isSyncing ? (
            <>
              <ActivityIndicator color="#fff" size="small" />
              <Text style={styles.syncButtonText}> Đang đồng bộ...</Text>
            </>
          ) : (
            <>
              <Ionicons name="cloud-upload" size={24} color="#fff" />
              <Text style={styles.syncButtonText}> Đồng bộ ngay</Text>
            </>
          )}
        </TouchableOpacity>

        {/* Status */}
        {syncStatus !== "" && (
          <View style={styles.statusMessage}>
            <Text style={styles.statusText}>{syncStatus}</Text>
          </View>
        )}

        {/* Last Sync Time */}
        {lastSyncTime && (
          <View style={styles.lastSyncCard}>
            <Ionicons name="time" size={16} color="#777" />
            <Text style={styles.lastSyncText}>
              {" "}
              Đồng bộ lần cuối: {lastSyncTime}
            </Text>
          </View>
        )}

        {/* Table Structure */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📋 Cấu trúc bảng API</Text>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>id</Text>
            <Text style={styles.tableType}>string (auto)</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>title</Text>
            <Text style={styles.tableType}>string</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>amount</Text>
            <Text style={styles.tableType}>number</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>type</Text>
            <Text style={styles.tableType}>"Thu" | "Chi"</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>createdAt</Text>
            <Text style={styles.tableType}>string</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>deleted</Text>
            <Text style={styles.tableType}>number (0 | 1)</Text>
          </View>
        </View>
      </ScrollView>
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
  infoCard: {
    backgroundColor: "#E1F5FE",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#03A9F4",
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#01579B",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: "#01579B",
    lineHeight: 22,
  },
  statusCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  statusLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    marginLeft: 8,
  },
  urlText: {
    fontSize: 13,
    color: "#9C27B0",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    backgroundColor: "#F5F5F5",
    padding: 8,
    borderRadius: 6,
    marginBottom: 8,
  },
  countBadge: {
    backgroundColor: "#E1BEE7",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    alignSelf: "flex-start",
  },
  countText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#6A1B9A",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  input: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: "#333",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginBottom: 12,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    outlineStyle: "none",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  primaryButton: {
    backgroundColor: "#9C27B0",
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: "#E0E0E0",
  },
  secondaryButtonText: {
    color: "#666",
    fontSize: 14,
    fontWeight: "600",
  },
  syncButton: {
    backgroundColor: "#9C27B0",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#9C27B0",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  syncButtonDisabled: {
    backgroundColor: "#BDBDBD",
  },
  syncButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  statusMessage: {
    backgroundColor: "#FFF9C4",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#FBC02D",
  },
  statusText: {
    fontSize: 14,
    color: "#F57F17",
    textAlign: "center",
  },
  lastSyncCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  lastSyncText: {
    fontSize: 13,
    color: "#777",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  tableLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  tableType: {
    fontSize: 13,
    color: "#9C27B0",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
});
