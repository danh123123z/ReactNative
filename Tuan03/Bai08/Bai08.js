import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function Bai08() {
  return (
    <View style={styles.container}>
      <Image source={require("./assets/eye.svg")} style={styles.logo} />

      <View style={styles.inputContainer}>
        <Icon name="account-outline" size={22} color="#3f51b5" />
        <TextInput
          style={styles.input}
          placeholder="Please input user name"
          placeholderTextColor="#aaa"
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="lock-outline" size={22} color="#3f51b5" />
        <TextInput
          style={styles.input}
          placeholder="Please input password"
          secureTextEntry
          placeholderTextColor="#aaa"
        />
      </View>

      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>

      <View style={styles.row}>
        <Text style={styles.link}>Register</Text>
        <Text style={styles.link}>Forgot Password</Text>
      </View>

      <View style={styles.separator}>
        <View style={styles.line} />
        <Text style={styles.otherLogin}>Other Login Methods</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.socialRow}>
        <TouchableOpacity
          style={[styles.socialBtn, { backgroundColor: "#4FC3F7" }]}
        >
          <Icon name="account-plus" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.socialBtn, { backgroundColor: "#FFB74D" }]}
        >
          <Icon name="wifi" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.socialBtn, { backgroundColor: "#3b5998" }]}
        >
          <Icon name="facebook" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginBottom: 20,
    width: "100%",
    paddingBottom: 5,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    height: 45,
  },
  loginBtn: {
    backgroundColor: "#3f51b5",
    width: "100%",
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 50,
    marginBottom: 7,
  },
  loginText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  link: {
    fontSize: 14,
    color: "#000",
  },
  separator: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    marginTop: 40,
  },
  line: {
    flex: 1,
    height: 1,
    width: 80,
    backgroundColor: "#3f51b5",
  },
  otherLogin: {
    marginHorizontal: 10,
    color: "#000",
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "85%",
    marginTop: 20,
  },
  socialBtn: {
    width: 70,
    height: 70,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
  },
});
