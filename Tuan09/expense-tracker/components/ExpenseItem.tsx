import React from "react";
import { View, Text, StyleSheet } from "react-native";

type ExpenseItemProps = {
  title: string;
  amount: number;
  createdAt: string;
  type: "Thu" | "Chi";
};

export default function ExpenseItem({
  title,
  amount,
  createdAt,
  type,
}: ExpenseItemProps) {
  const isIncome = type === "Thu";

  return (
    <View style={[styles.card, isIncome ? styles.income : styles.expense]}>
      <View style={styles.row}>
        <Text style={styles.title}>{title}</Text>
        <Text style={[styles.amount, isIncome ? styles.incomeText : styles.expenseText]}>
          {isIncome ? "+" : "-"}{amount.toLocaleString()} ₫
        </Text>
      </View>
      <View style={styles.rowBetween}>
        <Text style={styles.date}>{createdAt}</Text>
        <Text style={[styles.type, isIncome ? styles.incomeText : styles.expenseText]}>
          {type}
        </Text>
      </View>
    </View>
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
