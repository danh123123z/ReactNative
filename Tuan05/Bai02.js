import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const products = [
  {
    id: "1",
    name: "Cáp chuyển từ Cổng USB sang PS2...",
    price: "69.900 đ",
    discount: "-39%",
    rating: 4,
    reviews: 15,
    image: require("./assets/h1.png"),
  },
  {
    id: "2",
    name: "Cáp chuyển từ Cổng USB sang PS2...",
    price: "69.900 đ",
    discount: "-39%",
    rating: 4,
    reviews: 15,
    image: require("./assets/h2.png"),
  },
  {
    id: "3",
    name: "Cáp chuyển từ Cổng USB sang PS2...",
    price: "69.900 đ",
    discount: "-39%",
    rating: 4,
    reviews: 15,
    image: require("./assets/h3.png"),
  },
  {
    id: "4",
    name: "Cáp chuyển từ Cổng USB sang PS2...",
    price: "69.900 đ",
    discount: "-39%",
    rating: 4,
    reviews: 15,
    image: require("./assets/h4.png"),
  },
  {
    id: "5",
    name: "Cáp chuyển từ Cổng USB sang PS2...",
    price: "69.900 đ",
    discount: "-39%",
    rating: 4,
    reviews: 15,
    image: require("./assets/h5.png"),
  },
  {
    id: "6",
    name: "Cáp chuyển từ Cổng USB sang PS2...",
    price: "69.900 đ",
    discount: "-39%",
    rating: 4,
    reviews: 15,
    image: require("./assets/h6.png"),
  },
];

const bottomMenu = [
  {
    id: "1",
    icon: <MaterialCommunityIcons name="menu" size={24} color="black" />,
  },
  { id: "2", icon: <Ionicons name="home-outline" size={24} color="black" /> },
  { id: "3", icon: <Ionicons name="person-outline" size={24} color="black" /> },
];

export default function Bai02() {
  const renderProduct = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.name} numberOfLines={2}>
        {item.name}
      </Text>
      <View style={styles.ratingRow}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Ionicons
            key={i}
            name={i < item.rating ? "star" : "star-outline"}
            size={14}
            color="#FFD700"
          />
        ))}
        <Text style={styles.reviews}>({item.reviews})</Text>
      </View>
      <View style={styles.priceRow}>
        <Text style={styles.price}>{item.price}</Text>
        <Text style={styles.discount}>{item.discount}</Text>
      </View>
    </View>
  );

  const renderBottomItem = ({ item }) => (
    <TouchableOpacity style={styles.bottomItem}>{item.icon}</TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={22} color="#000" />
        <TextInput
          placeholder="Dây cáp usb"
          style={styles.search}
          placeholderTextColor="#999"
        />
        <Ionicons name="cart-outline" size={22} color="#000" />
        <Ionicons name="ellipsis-vertical" size={22} color="#000" />
      </View>

      {/* Product list */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderProduct}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ padding: 8, paddingBottom: 60 }}
      />

      {/* Bottom navigation */}
      <View style={styles.bottomNav}>
        <FlatList
          data={bottomMenu}
          keyExtractor={(item) => item.id}
          renderItem={renderBottomItem}
          horizontal
          contentContainerStyle={{
            flex: 1,
            justifyContent: "space-around",
            alignItems: "center",
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" }, // nền sáng dịu
  header: {
    height: 55,
    backgroundColor: "#1E90FF", // xanh đậm hơn
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  search: {
    flex: 1,
    height: 38,
    backgroundColor: "#fff",
    marginHorizontal: 10,
    borderRadius: 20,
    paddingHorizontal: 12,
    fontSize: 14,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
    width: "48%",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  image: { width: "100%", height: 110, resizeMode: "contain" },
  name: { fontSize: 13, marginTop: 6, minHeight: 34, color: "#333" },
  ratingRow: { flexDirection: "row", alignItems: "center", marginTop: 4 },
  reviews: { fontSize: 11, color: "#666", marginLeft: 4 },
  priceRow: { flexDirection: "row", alignItems: "center", marginTop: 6 },
  price: { fontSize: 14, fontWeight: "bold", color: "#E63946" },
  discount: {
    fontSize: 12,
    color: "#555",
    marginLeft: 6,
    textDecorationLine: "line-through",
  },
  bottomNav: {
    height: 55,
    backgroundColor: "#1E90FF",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  bottomItem: { flex: 1, alignItems: "center", justifyContent: "center" },
});
