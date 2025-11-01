import React, { useState, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BarChart } from "react-native-chart-kit";
import { useFocusEffect } from "expo-router";
import { getAllExpensesForSync } from "@/app/db";

const screenWidth = Dimensions.get("window").width;

type MonthlyStats = {
  month: string;
  income: number;
  expense: number;
};

export default function StatisticsScreen() {
  const [monthlyData, setMonthlyData] = useState<MonthlyStats[]>([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  const loadData = async () => {
    try {
      const allExpenses = await getAllExpensesForSync();

      // Nhóm theo tháng
      const monthMap = new Map<string, MonthlyStats>();

      allExpenses.forEach((expense: any) => {
        if (expense.deleted === 1) return; // Bỏ qua khoản đã xóa

        // Parse date (format: DD/MM/YYYY)
        const dateParts = expense.createdAt.split("/");
        if (dateParts.length !== 3) return;

        const month = `${dateParts[1]}/${dateParts[2]}`; // MM/YYYY

        if (!monthMap.has(month)) {
          monthMap.set(month, { month, income: 0, expense: 0 });
        }

        const stats = monthMap.get(month)!;
        if (expense.type === "Thu") {
          stats.income += expense.amount;
        } else {
          stats.expense += expense.amount;
        }
      });

      // Chuyển sang array và sắp xếp theo tháng
      const sortedData = Array.from(monthMap.values()).sort((a, b) => {
        const [monthA, yearA] = a.month.split("/").map(Number);
        const [monthB, yearB] = b.month.split("/").map(Number);
        return yearA !== yearB ? yearA - yearB : monthA - monthB;
      });

      // Lấy 6 tháng gần nhất
      const recentMonths = sortedData.slice(-6);
      setMonthlyData(recentMonths);

      // Tính tổng
      let totalInc = 0;
      let totalExp = 0;
      allExpenses.forEach((expense: any) => {
        if (expense.deleted === 1) return;
        if (expense.type === "Thu") {
          totalInc += expense.amount;
        } else {
          totalExp += expense.amount;
        }
      });
      setTotalIncome(totalInc);
      setTotalExpense(totalExp);
    } catch (error) {
      console.error("Error loading statistics:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const chartData = {
    labels: monthlyData.map((d) => d.month.split("/")[0]), // Chỉ hiển thị tháng
    datasets: [
      {
        data: monthlyData.map((d) => d.income / 1000000), // Đổi sang triệu
        color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`, // Màu xanh cho Thu
      },
      {
        data: monthlyData.map((d) => d.expense / 1000000), // Đổi sang triệu
        color: (opacity = 1) => `rgba(244, 67, 54, ${opacity})`, // Màu đỏ cho Chi
      },
    ],
    legend: ["Thu (triệu)", "Chi (triệu)"],
  };

  const chartConfig = {
    backgroundColor: "#fff",
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForBackgroundLines: {
      strokeDasharray: "",
      stroke: "#E0E0E0",
      strokeWidth: 1,
    },
    propsForLabels: {
      fontSize: 12,
    },
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#FF9800" />

      {/* Header Gradient */}
      <LinearGradient
        colors={["#FF9800", "#FF5722"]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.title}>📊 THỐNG KÊ</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Summary Cards */}
        <View style={styles.summaryContainer}>
          <View style={[styles.summaryCard, styles.incomeCard]}>
            <Text style={styles.summaryLabel}>💰 Tổng Thu</Text>
            <Text style={styles.summaryValue}>
              {totalIncome.toLocaleString()} ₫
            </Text>
          </View>
          <View style={[styles.summaryCard, styles.expenseCard]}>
            <Text style={styles.summaryLabel}>💸 Tổng Chi</Text>
            <Text style={styles.summaryValue}>
              {totalExpense.toLocaleString()} ₫
            </Text>
          </View>
        </View>

        <View style={[styles.summaryCard, styles.balanceCard]}>
          <Text style={styles.summaryLabel}>💵 Số dư</Text>
          <Text
            style={[
              styles.summaryValue,
              styles.balanceValue,
              totalIncome - totalExpense >= 0
                ? styles.positiveBalance
                : styles.negativeBalance,
            ]}
          >
            {(totalIncome - totalExpense).toLocaleString()} ₫
          </Text>
        </View>

        {/* Chart */}
        {monthlyData.length > 0 ? (
          <View style={styles.chartCard}>
            <Text style={styles.chartTitle}>
              📈 Biểu đồ Thu/Chi theo Tháng (6 tháng gần nhất)
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <BarChart
                data={chartData}
                width={Math.max(screenWidth - 40, monthlyData.length * 80)}
                height={280}
                chartConfig={chartConfig}
                verticalLabelRotation={0}
                fromZero
                showBarTops={false}
                withInnerLines={true}
                style={styles.chart}
              />
            </ScrollView>
            <View style={styles.legendContainer}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, styles.incomeDot]} />
                <Text style={styles.legendText}>Thu (triệu ₫)</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, styles.expenseDot]} />
                <Text style={styles.legendText}>Chi (triệu ₫)</Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyIcon}>📊</Text>
            <Text style={styles.emptyTitle}>Chưa có dữ liệu</Text>
            <Text style={styles.emptyText}>
              Thêm các khoản thu chi để xem thống kê
            </Text>
          </View>
        )}

        {/* Monthly Details */}
        {monthlyData.length > 0 && (
          <View style={styles.detailsCard}>
            <Text style={styles.detailsTitle}>📋 Chi tiết theo Tháng</Text>
            {monthlyData.reverse().map((item, index) => (
              <View key={index} style={styles.detailRow}>
                <Text style={styles.detailMonth}>{item.month}</Text>
                <View style={styles.detailAmounts}>
                  <View style={styles.detailItem}>
                    <Text style={styles.incomeLabel}>Thu:</Text>
                    <Text style={styles.incomeAmount}>
                      +{item.income.toLocaleString()} ₫
                    </Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Text style={styles.expenseLabel}>Chi:</Text>
                    <Text style={styles.expenseAmount}>
                      -{item.expense.toLocaleString()} ₫
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
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
  summaryContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  summaryCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  incomeCard: {
    backgroundColor: "#E8F5E9",
    borderLeftWidth: 4,
    borderLeftColor: "#4CAF50",
  },
  expenseCard: {
    backgroundColor: "#FFEBEE",
    borderLeftWidth: 4,
    borderLeftColor: "#F44336",
  },
  balanceCard: {
    backgroundColor: "#E3F2FD",
    borderLeftWidth: 4,
    borderLeftColor: "#2196F3",
    marginBottom: 16,
  },
  summaryLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    marginBottom: 8,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
  },
  balanceValue: {
    fontSize: 24,
  },
  positiveBalance: {
    color: "#4CAF50",
  },
  negativeBalance: {
    color: "#F44336",
  },
  chartCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    marginBottom: 16,
  },
  chart: {
    borderRadius: 16,
    marginVertical: 8,
  },
  legendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12,
    gap: 24,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  incomeDot: {
    backgroundColor: "#4CAF50",
  },
  expenseDot: {
    backgroundColor: "#F44336",
  },
  legendText: {
    fontSize: 13,
    color: "#666",
  },
  emptyCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 40,
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: "#777",
    textAlign: "center",
  },
  detailsCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  detailsTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    marginBottom: 16,
  },
  detailRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  detailMonth: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  detailAmounts: {
    flexDirection: "row",
    gap: 16,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  incomeLabel: {
    fontSize: 13,
    color: "#4CAF50",
    fontWeight: "600",
  },
  incomeAmount: {
    fontSize: 14,
    color: "#4CAF50",
    fontWeight: "700",
  },
  expenseLabel: {
    fontSize: 13,
    color: "#F44336",
    fontWeight: "600",
  },
  expenseAmount: {
    fontSize: 14,
    color: "#F44336",
    fontWeight: "700",
  },
});
