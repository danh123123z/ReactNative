import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";

export default function App() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [gender, setGender] = useState(null);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>REGISTER</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#000"
      />

      <TextInput
        style={styles.input}
        placeholder="Phone"
        placeholderTextColor="#000"
        keyboardType="phone-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#000"
        keyboardType="email-address"
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputPassword}
          placeholder="Password"
          placeholderTextColor="#000"
          secureTextEntry={!passwordVisible}
        />
        <TouchableOpacity
          style={styles.eyeButton}
          onPress={() => setPasswordVisible(!passwordVisible)}
        >
          <Image source={require("./assets/eye.png")} style={styles.eyeIcon} />
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Birthday"
        placeholderTextColor="#000"
      />

      <View style={styles.genderRow}>
        <TouchableOpacity
          style={styles.radioContainer}
          onPress={() => setGender("male")}
        >
          <View
            style={[styles.radioCircle, gender === "male" && styles.selected]}
          />
          <Text style={styles.radioText}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.radioContainer}
          onPress={() => setGender("female")}
        >
          <View
            style={[styles.radioCircle, gender === "female" && styles.selected]}
          />
          <Text style={styles.radioText}>Female</Text>
        </TouchableOpacity>
      </View>

      {/* Register Button */}
      <TouchableOpacity style={styles.registerButton}>
        <Text style={styles.registerButtonText}>REGISTER</Text>
      </TouchableOpacity>

      {/* Terms */}
      <Text style={styles.terms}>When you agree to terms and conditions</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0f2e0",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 70,
  },
  input: {
    width: "95%",
    height: 60,
    backgroundColor: "#c7d9ce",
    borderRadius: 2,
    paddingHorizontal: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "95%",
    marginBottom: 15,
  },
  inputPassword: {
    flex: 1,
    height: 60,
    backgroundColor: "#c7d9ce",
    borderRadius: 2,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  eyeButton: {
    position: "absolute",
    right: 10,
  },
  eyeIcon: {
    width: 24,
    height: 24,
    tintColor: "#000",
  },
  genderRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "90%",
    marginBottom: 20,
  },
  radioContainer: {
    marginTop: 18,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 25,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#000",
    marginRight: 6,
  },
  selected: {
    backgroundColor: "#000",
  },
  radioText: {
    fontSize: 16,
    color: "#000",
  },
  registerButton: {
    width: "95%",
    height: 60,
    backgroundColor: "#c94c3c",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
    marginBottom: 25,
    marginTop: 20,
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  terms: {
    fontSize: 13,
    color: "#000",
  },
});
