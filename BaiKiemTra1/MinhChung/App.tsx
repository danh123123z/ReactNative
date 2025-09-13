import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import {useState} from "react"

type Product = {
  id : number,
  name : string,
  price: number
}

type Cart = {
  id: number,
  name: string,
  price: number,
  quantity: number
}


export default function App() {
  const [cart, setCart] = useState<Cart[]>([]);

  const addToCart = (id: number) =>{
    const index = cart.findIndex((item => item.id === id));
    if(index > 0){
      const updateCart = cart;
      cart[index].quantity++;
      setCart(updateCart);
    }
    else{
      const product:Product = getProductById(id);
      setCart(prev => {
        return [
          ...prev,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
          }
        ]
      })
    }
  }

const data: Product[] = [
  {
    id: 1,
    name: 'Iphone 12',
    price: 100000
  },
  {
    id: 2,
    name: 'Iphone 13',
    price: 120000
  },
  {
    id: 3,
    name: 'Iphone 14',
    price: 150000
  }
]

const getTotalPrice = () => {
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
  })
  return total;
}

const handleAddToCart = (id: number) => {
  addToCart(id);
}
const getProductById = (id: number) => {
  return data.filter(item => item.id === id)[0];
}
  return (
    <View style={styles.container}>
      <View style={styles.productContainer}>
        <Text style={{color: 'blue', fontWeight: 'bold', fontSize: 20}}>Danh sách sản phẩm</Text>
        <View style={styles.productList}>
          {data.map(item => (
            <View style={styles.productItem}>
            <Text style={{fontWeight: 'bold'}}>Iphone 12</Text>
            <Text style={{fontWeight: 'bold', color: 'red'}}>100000 đ</Text>
            <TouchableOpacity onPress={() => handleAddToCart(item.id)} style={styles.buttonAdd}>
              <Text style={{fontSize: 12}}>Thêm giỏ hàng</Text>
            </TouchableOpacity>
          </View>
          ))}
        </View>
      </View>
      <View style={styles.cartContainer}>
        <Text style={{color: 'blue', fontWeight: 'bold', fontSize: 20}}>Giỏ hàng của bạn</Text>
        <View style={styles.cartList}>
          {cart.map(item => (
            <View style={styles.cartItem}>
              <Text style={{fontWeight: 'bold'}}>{item.name}</Text>
              <Text style={{fontWeight: 'bold', color: 'red'}}>{item.quantity}</Text>
              <Text style={{fontWeight: 'bold', color: 'red'}}>{item.price * item.quantity}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.footer}>Tổng tiền: {getTotalPrice()} đ</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  productContainer: {
    flex: 3,
    border: '1px solid #ddd',
    padding: 10
  },
  cartContainer: {
    flex: 6,
    border: '1px solid #ddd',
    padding: 10,
  },
  productList: {
    marginTop: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10
  },
  productItem: {
    flex: 1,
    border: '1px solid #ddd',
    borderRadius: 10,
    padding: 10,
    gap: 10
  },
  buttonAdd: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'lightblue',
    fontWeight: 'bold'
  },
  cartList: {
    flex: 1,
  },
  cartItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    border: '1px solid #ddd',
    borderRadius: 5
  },
  footer: {
    flex: 1,
    fontWeight: 'bold',
    color: 'red',
    fontSize: 20
  }
});
