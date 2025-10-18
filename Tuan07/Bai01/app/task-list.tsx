import { useLocalSearchParams, useRouter, useFocusEffect } from "expo-router";
import { useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TaskItem from "../components/TaskItem";

export default function TaskListScreen() {
  const { name, newTask } = useLocalSearchParams<{
    name: string;
    newTask?: string;
  }>();
  const router = useRouter();

  const [tasks, setTasks] = useState<string[]>([
    "To check email",
    "UI task web page",
    "Learn javascript basic",
    "Learn HTML Advance",
    "Medical App UI",
    "Learn Java",
  ]);
  const [search, setSearch] = useState("");

  // 🔁 Khi quay lại từ trang add-job → thêm task mới (nếu có)
  useFocusEffect(
    useCallback(() => {
      if (newTask && !tasks.includes(newTask)) {
        setTasks((prev) => [...prev, newTask]);
      }
    }, [newTask])
  );

  const filtered = tasks.filter((t) =>
    t.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (title: string) => {
    Alert.alert("Delete Task", `Delete "${title}"?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => setTasks((prev) => prev.filter((t) => t !== title)),
      },
    ]);
  };

  const handleEdit = (oldTitle: string, newTitle: string) => {
    if (!newTitle.trim()) return;
    setTasks((prev) => prev.map((t) => (t === oldTitle ? newTitle.trim() : t)));
  };

  const handleAdd = () => {
    router.push({ pathname: "/add-job", params: { name } });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backIcon}>
          <Ionicons name="arrow-back" size={26} color="#333" />
        </TouchableOpacity>

        <View>
          <Text style={styles.greeting}>Hi {name}</Text>
          <Text style={styles.subtitle}>Have a great day ahead</Text>
        </View>
      </View>

      <TextInput
        placeholder="Search"
        style={styles.search}
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filtered}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TaskItem
            title={item}
            onDelete={() => handleDelete(item)}
            onEdit={(newTitle) => handleEdit(item, newTitle)}
          />
        )}
      />

      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Ionicons name="add" size={36} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  backIcon: {
    backgroundColor: "#f1f1f1",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  greeting: { fontSize: 20, fontWeight: "700" },
  subtitle: { fontSize: 14, color: "#888" },
  search: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  addButton: {
    backgroundColor: "#00C9A7",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 30,
    right: 30,
    elevation: 3,
  },
});
