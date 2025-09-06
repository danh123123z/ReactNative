import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Bai03() {
  return (
    <LinearGradient
      colors={["#d7f7f7", "#d7f7f7", "#42c8f5"]}
      style={styles.container}
    >
      <Image
        source={require("./assets/lock-152879 _1.png")}
        style={styles.lockIcon}
      />

      <Text style={styles.forgetText}>FORGET</Text>
      <Text style={styles.forgetText}>PASSWORD</Text>

      <Text style={styles.desc}>
        Provide your account’s email for which you{"\n"}want to reset your
        password
      </Text>

      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="Email"
          style={styles.input}
          keyboardType="email-address"
        />
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>NEXT</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  lockIcon: {
    width: 100,
    height: 100,
    marginBottom: 30,
    resizeMode: "contain",
  },
  forgetText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  desc: {
    fontSize: 14,
    color: "black",
    textAlign: "center",
    marginVertical: 20,
  },
  inputWrapper: {
    width: "100%",
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 12,
    borderRadius: 4,
    backgroundColor: "#eaeaea",
  },
  button: {
    backgroundColor: "#FFD600",
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 6,
  },
  buttonText: {
    fontWeight: "bold",
    color: "black",
    fontSize: 16,
  },
});
