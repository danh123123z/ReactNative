import React, { useState, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from "expo-router";
import {
  getDeletedExpenses,
  restoreExpense,
  permanentDeleteExpense,
} from "@/app/db";

type TrashItemProps = {
  id: number;
  title: string;
  amount: number;
  createdAt: string;
  type: "Thu" | "Chi";
  onRestore: () => void;
  onPermanentDelete: () => void;
};

function TrashItem({
  id,
  title,
  amount,
  createdAt,
  type,
  onRestore,
  onPermanentDelete,
}: TrashItemProps) {
  const isIncome = type === "Thu";

  const handleRestore = () => {
    Alert.alert("♻️ Khôi phục?", `Bạn có muốn khôi phục "${title}"?`, [
      { text: "Hủy", style: "cancel" },
      {
        text: "Khôi phục",
        onPress: async () => {
          try {
            await restoreExpense(id);
            Alert.alert("✅ Đã khôi phục", "Khoản đã được khôi phục!");
            onRestore();
          } catch (error) {
            console.error("❌ Lỗi khi khôi phục:", error);
            Alert.alert("❌ Thất bại", "Không thể khôi phục.");
          }
        },
      },
    ]);
  };

  const handlePermanentDelete = () => {
    Alert.alert(
      "⚠️ Xóa vĩnh viễn?",
      `Bạn có chắc muốn xóa vĩnh viễn "${title}"?\nHành động này không thể hoàn tác!`,
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa vĩnh viễn",
          style: "destructive",
          onPress: async () => {
            try {
              await permanentDeleteExpense(id);
              Alert.alert("✅ Đã xóa", "Khoản đã được xóa vĩnh viễn!");
              onPermanentDelete();
            } catch (error) {
              console.error("❌ Lỗi khi xóa:", error);
              Alert.alert("❌ Thất bại", "Không thể xóa.");
            }
          },
        },
      ]
    );
  };

  return (
    <View style={[styles.card, isIncome ? styles.income : styles.expense]}>
      <View style={styles.row}>
        <Text style={styles.title}>{title}</Text>
        <Text
          style={[
            styles.amount,
            isIncome ? styles.incomeText : styles.expenseText,
          ]}
        >
          {isIncome ? "+" : "-"}
          {amount.toLocaleString()} ₫
        </Text>
      </View>
      <View style={styles.rowBetween}>
        <Text style={styles.date}>{createdAt}</Text>
        <Text
          style={[
            styles.type,
            isIncome ? styles.incomeText : styles.expenseText,
          ]}
        >
          {type}
        </Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.restoreButton} onPress={handleRestore}>
          <Text style={styles.restoreText}>♻️ Khôi phục</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handlePermanentDelete}
        >
          <Text style={styles.deleteText}>🗑️ Xóa vĩnh viễn</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function TrashScreen() {
  const [deletedExpenses, setDeletedExpenses] = useState<any[]>([]);

  const loadData = async () => {
    const data = await getDeletedExpenses();
    setDeletedExpenses(data);
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#F44336" />

      {/* Header Gradient */}
      <LinearGradient
        colors={["#F44336", "#E91E63"]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.title}>🗑️ THÙNG RÁC</Text>
      </LinearGradient>

      {/* Nội dung */}
      <View style={styles.content}>
        {deletedExpenses.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>🎉</Text>
            <Text style={styles.emptyTitle}>Thùng rác trống!</Text>
            <Text style={styles.emptySubtitle}>Không có khoản nào bị xóa.</Text>
          </View>
        ) : (
          <>
            <View style={styles.infoCard}>
              <Text style={styles.infoText}>
                💡 Các khoản đã xóa sẽ được lưu tại đây.{"\n"}
                Bạn có thể khôi phục hoặc xóa vĩnh viễn.
              </Text>
            </View>
            <FlatList
              data={deletedExpenses}
              renderItem={({ item }) => (
                <TrashItem
                  {...item}
                  onRestore={loadData}
                  onPermanentDelete={loadData}
                />
              )}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={{ paddingVertical: 10 }}
              showsVerticalScrollIndicator={false}
            />
          </>
        )}
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
  infoCard: {
    backgroundColor: "#FFF3E0",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#FF9800",
  },
  infoText: {
    fontSize: 14,
    color: "#E65100",
    lineHeight: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 80,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: "#777",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  amount: {
    fontSize: 17,
    fontWeight: "700",
  },
  date: {
    fontSize: 14,
    color: "#777",
  },
  type: {
    fontSize: 14,
    fontWeight: "600",
  },
  income: {
    borderLeftWidth: 4,
    borderLeftColor: "#4CAF50",
  },
  expense: {
    borderLeftWidth: 4,
    borderLeftColor: "#F44336",
  },
  incomeText: {
    color: "#4CAF50",
  },
  expenseText: {
    color: "#F44336",
  },
  actions: {
    flexDirection: "row",
    gap: 12,
  },
  restoreButton: {
    flex: 1,
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  restoreText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  deleteButton: {
    flex: 1,
    backgroundColor: "#F44336",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  deleteText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});
