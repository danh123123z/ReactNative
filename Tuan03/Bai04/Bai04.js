import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Bai04() {
  return (
    <LinearGradient
      colors={["#d7f7f7", "#d7f7f7", "#42c8f5"]}
      style={styles.container}
    >
      <Text style={styles.codeText}>CODE</Text>
      <Text style={styles.verificationText}>VERIFICATION</Text>

      <Text style={styles.desc}>
        Enter ontime password sent on {"\n"} ++849092605798
      </Text>

      <View style={styles.otpContainer}>
        {[...Array(6)].map((_, index) => (
          <TextInput
            key={index}
            style={styles.otpBox}
            keyboardType="numeric"
            maxLength={1}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>VERIFY CODE</Text>
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
  codeText: {
    fontSize: 50,
    fontWeight: "bold",
    color: "black",
    marginBottom: 50,
  },
  verificationText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginBottom: 30,
  },
  desc: {
    fontSize: 14,
    color: "black",
    textAlign: "center",
    marginBottom: 30,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },
  otpBox: {
    width: 40,
    height: 50,
    borderWidth: 1,
    borderColor: "#000",
    textAlign: "center",
    fontSize: 18,
    marginHorizontal: 5,
    borderRadius: 4,
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
