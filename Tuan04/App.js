import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.section1} >
        <View style={styles.section1Box1}>
           <Image style={styles.image} source={require('./assets/book.jpg')} />
           <View>
            <Text style={styles.section1Box1Text}>Nguyên hàm tích phân và ứng dụng</Text>
            <Text style={styles.section1Box1Text}>Cung cấp bởi Tiki Trading</Text>
            <Text style={styles.section1Box1OldPrice}>100.000 đ</Text>
            <Text style={styles.section1Box1Price}>120.000 đ</Text>
            <View style={styles.section1Box1Inner}>
              <View style={styles.section1Box1InnerCalcu}>
                <TouchableOpacity style={{backgroundColor: 'gray',paddingTop: 2, paddingBottom: 2,
                paddingLeft: 6, paddingRight: 6}}>-</TouchableOpacity>
                <Text style={{fontWeight: 'bold'}}>2</Text>
                <TouchableOpacity style={{backgroundColor: 'gray',paddingTop: 2, paddingBottom: 2,
                paddingLeft: 6, paddingRight: 6}}>+</TouchableOpacity>
              </View>
              <Text style={{fontWeight: 'bold', color: 'blue'}}>Mua sau</Text>
            </View>
           </View>
        </View>
        <View style={styles.section1Box2}>
          <Text style={{fontWeight: 'bold'}}>Mã giảm giá đã lưu</Text>
          <Text style={{fontWeight: 'bold', color: 'blue'}}>Xem tại đây</Text>
        </View>
        <View style={styles.section1Box3}>
          <View style={{flex: 4, flexDirection: 'row', gap: 10, borderWidth: 1, borderStyle: 'solid',
          borderColor: 'gray', padding: 10, alignItems: 'center' }}>
            <Image source={require('./assets/yellow_block.svg')} />
            <Text style={{fontWeight: 'bold'}}>Mã giảm giá</Text>
          </View>
          <TouchableOpacity style={{flex:2, backgroundColor: '#0A5EB7', alignItems: 'center', justifyContent: 'center'}}><Text style={{color: "white", fontWeight: 'bold', padding: 10}}>Áp dụng</Text></TouchableOpacity>
        </View>
      </View>

      <View style={styles.section2}>
        <View style={{flex: 1, flexDirection: 'row', gap: 10, padding: 10, backgroundColor: 'white'}}>
          <Text style={{fontWeight: 'bold'}}>Bạn có phiếu quà tặng Tiki/Got it/ Urbox?</Text>
          <Text style={{fontWeight: 'bold', color: 'blue'}}>Nhập tại đây?</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row', gap: 10, padding: 10, justifyContent: 'space-between',  backgroundColor: 'white', marginTop: 10}}>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>Tạm tính</Text>
          <Text style={{fontWeight: 'bold', color: 'red', fontSize: 20}}>100.000 đ</Text>
        </View>
        <View style={{flex: 3}}></View>
      </View>
      <View style={styles.section3}>
        <View style={{flex: 1, flexDirection: 'row', gap: 10, padding: 10, justifyContent: 'space-between'}}>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>Thành tiền</Text>
          <Text style={{fontWeight: 'bold', color: 'red', fontSize: 20}}>100.000 đ</Text>
        </View>
        <TouchableOpacity style={{flex:2, backgroundColor: '#E53935', alignItems: 'center', justifyContent: 'center'}}><Text style={{color: "white", fontWeight: 'bold', padding: 10}}>TIẾN HÀNH ĐẶT HÀNG</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray'
  },
  section1: {
    flex: 2,
    padding: 10,
    backgroundColor: 'white',
    marginBottom: 20
  },
  section2: {
    flex: 2,
    marginBottom: 20
  },
  section3: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white'
  },
  image: {
    width: 100,
    height: 120
  },
  section1Box1: {
    flex: 3,
    flexDirection: 'row',
    gap: 20
  },
  section1Box2: {
    flex: 1,
    flexDirection: 'row',
    gap: 20,
    marginTop: 10
  },
  section1Box3: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10
  },
  section1Box1Text: {
    fontWeight: 'bold',
    marginBottom: 5
  },
  section1Box1OldPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 5
  },
  section1Box1Price: {
    fontWeight: 'bold',
    color: 'gray',
    textDecorationLine: 'line-through'
  },
  section1Box1Inner: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    alignItems: 'center'
  },
  section1Box1InnerCalcu: {
    flex: 1,
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center'
  }
});
