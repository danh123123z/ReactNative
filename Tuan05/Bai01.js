import { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function App() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Ca nấu lẩu, nấu mì mini",
      shop: "Shop Devang",
      image: require("./assets/hinh1.png"),
    },
    {
      id: 2,
      name: "1KG KHÔ GÀ BƠ TỎI",
      shop: "Shop LTD Food",
      image: require("./assets/hinh5.png"),
    },
    {
      id: 3,
      name: "Xe cần cẩu đa năng",
      shop: "Shop Thế giới đồ chơi",
      image: require("./assets/hinh2.png"),
    },
    {
      id: 4,
      name: "Đồ chơi dạng mô hình",
      shop: "Shop Minh Long Book",
      image: require("./assets/hinh3.png"),
    },
    {
      id: 5,
      name: "Lãnh đạo đơn giản",
      shop: "Shop Minh Long Book",
      image: require("./assets/hinh4.png"),
    },
    {
      id: 6,
      name: "Hiểu lòng con trẻ",
      shop: "Shop Minh Long Book",
      image: require("./assets/hinh6.png"),
    },
  ]);

  const renderItem = (product) => (
    <View style={styles.item}>
      <View style={styles.productBox}>
        <Image style={styles.logo} source={product.image} />
      </View>
      <View>
        <Text>{product.name}</Text>
        <Text style={{ color: "red" }}>{product.shop}</Text>
      </View>
      <View>
        <TouchableOpacity style={styles.button}>
          <Text style={{ color: "white" }}>Chat</Text>
        </TouchableOpacity>
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
        <Text style={{ color: "white", fontSize: 20 }}>Chat</Text>
        <Ionicons name="cart-outline" size={22} color="#fff" />
      </View>
      <Text style={styles.paragraph}>
        Bạn có thắc mắc với sản phẩm vừa xem đừng ngại chát với shop!
      </Text>
      <View style={{ flex: 1 }}>
        <FlatList
          data={products}
          renderItem={({ item }) => renderItem(item)}
          keyExtractor={(item) => item.id}
        />
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
    paddingVertical: 4,
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
  logo: {
    width: 50,
    height: 50,
  },
});
