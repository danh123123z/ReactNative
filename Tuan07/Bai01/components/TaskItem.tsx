import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface TaskItemProps {
  title: string;
  onDelete?: () => void;
  onEdit?: (newTitle: string) => void;
}

export default function TaskItem({ title, onDelete, onEdit }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleSave = () => {
    if (onEdit && newTitle.trim()) {
      onEdit(newTitle);
      setIsEditing(false);
    }
  };

  return (
    <View style={styles.item}>
      <Ionicons name="checkbox-outline" size={22} color="#00C9A7" />

      {isEditing ? (
        <TextInput
          value={newTitle}
          onChangeText={setNewTitle}
          style={styles.input}
          autoFocus
          onSubmitEditing={handleSave}
        />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}

      <View style={styles.actions}>
        {isEditing ? (
          <TouchableOpacity onPress={handleSave}>
            <Ionicons name="checkmark" size={22} color="#00C9A7" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setIsEditing(true)}>
            <Ionicons name="create-outline" size={22} color="#007AFF" />
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={onDelete}>
          <Ionicons name="trash-outline" size={22} color="#FF4D4D" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fafafa",
    padding: 12,
    marginVertical: 5,
    borderRadius: 10,
  },
  text: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 2,
  },
  actions: {
    flexDirection: "row",
    gap: 10,
  },
});
