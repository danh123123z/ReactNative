import { useState, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function Bai03() {
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
    <View style={styles.item}>
      <View>
        <Text>{user.name}</Text>
        <Text style={{ color: "red" }}>{user.email}</Text>
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
        <Ionicons name="arrow-back" size={22} color="#fff" />
        <Text style={{ color: "white", fontSize: 20 }}>User List</Text>
        <Ionicons name="cart-outline" size={22} color="#fff" />
      </View>
      <View style={{ flex: 1 }}>
        {loading ? (
          <View style={{ width: "100%", height: "100%", marginTop: 150 }}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <FlatList
            data={users}
            renderItem={({ item }) => renderItem(item)}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
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
        <MaterialCommunityIcons name="menu" size={24} color="black" />
        <Ionicons name="home-outline" size={24} color="black" />
        <Ionicons name="person-outline" size={24} color="black" />
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
  paragraph: {
    margin: 12,
    fontSize: 12,
    paddingHorizontal: 12,
  },
  item: {
    marginVertical: 8,
    paddingVertical: 20,
    paddingHorizontal: 12,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
  },
  button: {
    alignItems: "center",
    backgroundColor: "red",
    padding: 10,
  },
});
