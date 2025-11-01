import React, { useEffect, useState, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  TouchableOpacity,
  TextInput,
  RefreshControl,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ExpenseItem from "@/components/ExpenseItem";
import { useRouter, useFocusEffect } from "expo-router";
import { getExpenses } from "@/app/db";
import { Ionicons } from "@expo/vector-icons";

type FilterType = "Tất cả" | "Thu" | "Chi";

export default function HomeScreen() {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [filteredExpenses, setFilteredExpenses] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("Tất cả");
  const router = useRouter();

  const loadData = async () => {
    const data = await getExpenses();
    setExpenses(data);
    applyFilters(data, searchQuery, selectedFilter);
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }, []);

  const applyFilters = (data: any[], search: string, filter: FilterType) => {
    let result = [...data];

    // Apply type filter
    if (filter !== "Tất cả") {
      result = result.filter((expense) => expense.type === filter);
    }

    // Apply search filter
    if (search.trim() !== "") {
      result = result.filter((expense) =>
        expense.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredExpenses(result);
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    applyFilters(expenses, text, selectedFilter);
  };

  const handleFilterChange = (filter: FilterType) => {
    setSelectedFilter(filter);
    applyFilters(expenses, searchQuery, filter);
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

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
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#777"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm theo tên khoản..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={handleSearch}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => handleSearch("")}>
              <Ionicons name="close-circle" size={20} color="#777" />
            </TouchableOpacity>
          )}
        </View>

        {/* Filter Tabs */}
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[
              styles.filterTab,
              selectedFilter === "Tất cả" && styles.filterTabActive,
            ]}
            onPress={() => handleFilterChange("Tất cả")}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === "Tất cả" && styles.filterTextActive,
              ]}
            >
              📊 Tất cả
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterTab,
              selectedFilter === "Thu" && styles.filterTabActive,
            ]}
            onPress={() => handleFilterChange("Thu")}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === "Thu" && styles.filterTextActive,
              ]}
            >
              💰 Thu
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterTab,
              selectedFilter === "Chi" && styles.filterTabActive,
            ]}
            onPress={() => handleFilterChange("Chi")}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === "Chi" && styles.filterTextActive,
              ]}
            >
              💸 Chi
            </Text>
          </TouchableOpacity>
        </View>

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
          data={filteredExpenses}
          renderItem={({ item }) => (
            <ExpenseItem {...item} onDelete={loadData} />
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingVertical: 10 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#007AFF"]}
              tintColor="#007AFF"
              title="Đang tải..."
              titleColor="#007AFF"
            />
          }
          ListEmptyComponent={
            <View style={styles.emptySearch}>
              <Text style={styles.emptySearchText}>🔍</Text>
              <Text style={styles.emptySearchTitle}>Không tìm thấy</Text>
              <Text style={styles.emptySearchSubtitle}>
                Không có khoản nào khớp với "{searchQuery}"
              </Text>
            </View>
          }
        />
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/add")}
      >
        <Text style={styles.addText}>➕ Add</Text>
      </TouchableOpacity>
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    outlineStyle: "none",
  },
  filterContainer: {
    flexDirection: "row",
    marginBottom: 16,
    gap: 12,
  },
  filterTab: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  filterTabActive: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  filterText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#666",
  },
  filterTextActive: {
    color: "#fff",
  },
  emptySearch: {
    alignItems: "center",
    marginTop: 40,
  },
  emptySearchText: {
    fontSize: 60,
    marginBottom: 12,
  },
  emptySearchTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  emptySearchSubtitle: {
    fontSize: 14,
    color: "#777",
    textAlign: "center",
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
  addButton: {
    backgroundColor: "#007AFF",
    margin: 16,
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  addText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
