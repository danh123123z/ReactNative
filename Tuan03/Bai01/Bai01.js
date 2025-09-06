import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";

export default function Bai01() {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("./assets/ellipse.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>GROW</Text>
        <Text style={styles.title}>YOUR BUSINESS</Text>
      </View>

      <View style={styles.descContainer}>
        <Text style={styles.desc}>
          We will help you to grow your business using online server
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00CCF9",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logoContainer: {
    flex: 3,
    justifyContent: "center",
  },
  logo: {
    width: 120,
    height: 120,
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "black",
  },
  descContainer: {
    flex: 2,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  desc: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#FFD600",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 6,
    height: "50px",
  },
  buttonText: {
    fontWeight: "bold",
    color: "black",
    fontSize: 16,
  },
});
