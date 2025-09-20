import { useState, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Bai04() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://68ce4ee76dc3f350777e9e67.mockapi.io/api/user")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const renderItem = (user) => (
    <View
      style={{
        marginVertical: 8,
        paddingVertical: 10,
        paddingHorizontal: 7,
      }}
    >
      <View
        style={{ borderWidth: 1, padding: 24, backgroundColor: "lightblue" }}
      >
        <Text style={{ fontWeight: 600 }}>{user.name}</Text>
        <Text style={{ color: "white" }}>{user.email}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          backgroundColor: "#1BA9FF",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 20,
          height: 50,
        }}
      >
        <Text style={{ color: "white", fontSize: 20 }}>Users</Text>
      </View>
      <View style={{ flex: 1, flexGrow: "false" }}>
        {loading ? (
          <View style={{ width: "100%", height: "100%", marginTop: 240 }}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <FlatList
            data={users}
            renderItem={({ item }) => renderItem(item)}
            keyExtractor={(item) => item.id}
            horizontal="true"
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#ecf0f1",
  },
});
