import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { deleteExpense } from "@/app/db";

type ExpenseItemProps = {
  id: number;
  title: string;
  amount: number;
  createdAt: string;
  type: "Thu" | "Chi";
  onDelete?: () => void;
};

export default function ExpenseItem({
  id,
  title,
  amount,
  createdAt,
  type,
  onDelete,
}: ExpenseItemProps) {
  const isIncome = type === "Thu";
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: "/(tabs)/edit",
      params: { id, title, amount, type, createdAt },
    });
  };

  const handleLongPress = async () => {
    if (Platform.OS === "web") {
      // Dùng window.confirm cho web
      const confirmDelete = window.confirm(
        `🗑️ Xóa khoản này?\n\nBạn có muốn xóa "${title}"?\nKhoản này sẽ được chuyển vào thùng rác.`
      );

      if (confirmDelete) {
        try {
          await deleteExpense(id);
          window.alert("✅ Đã xóa!\nKhoản đã được chuyển vào thùng rác!");
          onDelete?.(); // Callback để refresh danh sách
        } catch (error) {
          console.error("❌ Lỗi khi xóa:", error);
          window.alert("❌ Thất bại!\nKhông thể xóa khoản này.");
        }
      }
    } else {
      // Dùng Alert cho mobile
      Alert.alert(
        "🗑️ Xóa khoản này?",
        `Bạn có muốn xóa "${title}"?\nKhoản này sẽ được chuyển vào thùng rác.`,
        [
          {
            text: "Hủy",
            style: "cancel",
          },
          {
            text: "Xóa",
            style: "destructive",
            onPress: async () => {
              try {
                await deleteExpense(id);
                Alert.alert("✅ Đã xóa", "Khoản đã được chuyển vào thùng rác!");
                onDelete?.(); // Callback để refresh danh sách
              } catch (error) {
                console.error("❌ Lỗi khi xóa:", error);
                Alert.alert("❌ Thất bại", "Không thể xóa khoản này.");
              }
            },
          },
        ]
      );
    }
  };

  return (
    <TouchableOpacity
      style={[styles.card, isIncome ? styles.income : styles.expense]}
      onPress={handlePress}
      onLongPress={handleLongPress}
      activeOpacity={0.7}
    >
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
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
});
