import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";

export default function AddJobScreen() {
  const { name } = useLocalSearchParams<{ name: string }>();
  const router = useRouter();
  const [job, setJob] = useState("");

  const handleFinish = () => {
    if (!job.trim()) {
      Alert.alert("Error", "Please enter a job name");
      return;
    }

    router.push({
      pathname: "/task-list",
      params: { name, newTask: job.trim() },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hi {name}</Text>
      <Text style={styles.subtitle}>ADD YOUR JOB</Text>

      <TextInput
        style={styles.input}
        placeholder="Input your job"
        value={job}
        onChangeText={setJob}
      />

      <TouchableOpacity style={styles.button} onPress={handleFinish}>
        <Text style={styles.buttonText}>FINISH →</Text>
      </TouchableOpacity>

      <Image
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
        }}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 60,
    backgroundColor: "#fff",
  },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 4 },
  subtitle: { fontSize: 16, marginBottom: 30, color: "#555" },
  input: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#00C9A7",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  buttonText: { color: "#fff", fontWeight: "600" },
  image: { width: 100, height: 100, marginTop: 40 },
});
