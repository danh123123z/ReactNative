import { Pressable, Text, View, Image, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ChooseColor" component={ChooseColorScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const data = [
  {
    id: 1,
    color: "Xanh dương",
    provider: "Shoppe",
    price: 1500000,
    image:
      "https://cdn2.cellphones.com.vn/358x/media/catalog/product/v/s/vsmart-joy-4_1__2_3_2_2_2_1_1.png",
  },
  {
    id: 2,
    color: "Đỏ",
    provider: "Lazada",
    price: 1600000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVPNHkb3TOJdgYate4hffgLvD1LlQ9kXI5Iw&s",
  },
  {
    id: 3,
    color: "Đen",
    provider: "Tiki",
    price: 1700000,
    image:
      "https://cdn2.cellphones.com.vn/358x/media/catalog/product/v/s/vsmart-joy-4_2__2_3_1_1_3_2_1.png",
  },
  {
    id: 4,
    color: "Xanh đậm",
    provider: "Tiktok",
    price: 1800000,
    image:
      "https://cdn2.cellphones.com.vn/358x/media/catalog/product/6/3/637164276578898043_vsmart-joy-3-tim-1_2.png",
  },
];

function ChooseColorScreen({ navigation }) {
  const handlePress = (id) => {
    const product = data.filter((item) => item.id === id)[0];
    setProduct(product);
  };
  const [product, setProduct] = useState(null);
  return (
    <SafeAreaView style={{ overflow: "scroll", flex: 1 }}>
      <View
        style={{
          backgroundColor: "white",
          padding: 10,
          flexDirection: "row",
          gap: 20,
        }}
      >
        <Image
          style={{ width: "30%", height: 130 }}
          source={{ uri: product?.image }}
        />
        {product != null && (
          <View>
            <Text>Điện Thoại Vsmart Joy 3</Text>
            <Text>Hàng chính hãng</Text>
            <Text>Màu: {product.color}</Text>
            <Text>
              Cung cấp bởi <b>{product.provider}</b>
            </Text>
            <Text style={{ fontWeight: 500 }}>{product.price}</Text>
          </View>
        )}
      </View>
      <View style={{ padding: 10, backgroundColor: "gray" }}>
        <Text>Chọn một màu bên dưới:</Text>
        <View
          style={{
            marginTop: 10,
            flexDirection: "column",
            gap: 10,
            alignItems: "center",
          }}
        >
          <Pressable
            onPress={() => handlePress(1)}
            style={{
              backgroundColor: "#C5F1FB",
              width: 60,
              height: 60,
            }}
          ></Pressable>
          <Pressable
            onPress={() => handlePress(2)}
            style={{
              backgroundColor: "#F30D0D",
              width: 60,
              height: 60,
            }}
          ></Pressable>
          <Pressable
            onPress={() => handlePress(3)}
            style={{
              backgroundColor: "#000000",
              width: 60,
              height: 60,
            }}
          ></Pressable>
          <Pressable
            onPress={() => handlePress(4)}
            style={{
              backgroundColor: "#234896",
              width: 60,
              height: 60,
            }}
          ></Pressable>
        </View>
        <Pressable
          onPress={() => navigation.navigate("Home", product)}
          style={{
            backgroundColor: "#4D6DC1",
            marginTop: 10,
            marginBottom: 5,
            borderRadius: 10,
            color: "white",
            fontWeight: 700,
            paddingTop: 10,
            paddingBottom: 10,
            textAlign: "center",
          }}
        >
          Xong
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function HomeScreen({ navigation, route }) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 10,
        overflow: "scroll",
        backgroundColor: "white",
      }}
    >
      <View style={{ alignItems: "center" }}>
        <Image
          style={{ width: "70%", height: 300 }}
          source={{ uri: route.params?.image }}
        />
      </View>
      <Text style={{ textAlign: "start" }}>
        Điện Thoại Vsmart Joy 3 - Hàng chính hãng
      </Text>
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "start",
          marginTop: 10,
          gap: 20,
        }}
      >
        <View style={{ flexDirection: "row", gap: 5 }}>
          <Image source={require("/assets/star.png")} />
          <Image source={require("/assets/star.png")} />
          <Image source={require("/assets/star.png")} />
          <Image source={require("/assets/star.png")} />
          <Image source={require("/assets/star.png")} />
        </View>
        <Text>(Xem 828 đánh giá)</Text>
      </View>
      <View style={{ flexDirection: "row", gap: 70, marginTop: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: 600 }}>
          {route.params?.price}
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 500,
            color: "gray",
            textDecorationLine: "line-through",
          }}
        >
          {route.params?.price}
        </Text>
      </View>
      <View
        style={{
          marginTop: 10,
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "red", fontSize: 12, fontWeight: 500 }}>
          Ở ĐÂU RẺ HƠN HOÀN TIỀN
        </Text>
        <Image source={require("/assets/Group1.png")} />
      </View>
      <Pressable
        onPress={() => navigation.navigate("ChooseColor")}
        style={{
          marginTop: 10,
          borderRadius: 10,
          borderColor: "gray",
          borderWidth: 1,
          borderStyle: "solid",
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 5,
          paddingBottom: 5,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ marginLeft: 80 }}>4 MÀU-CHỌN MÀU</Text>
        <Image source={require("/assets/Vector.png")} />
      </Pressable>
      <Pressable
        style={{
          marginTop: 24,
          borderRadius: 10,
          backgroundColor: "red",
          color: "white",
          fontWeight: 700,
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 15,
          paddingBottom: 15,
          textAlign: "center",
        }}
      >
        CHỌN MUA
      </Pressable>
    </SafeAreaView>
  );
}
