import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

export default function Bai05() {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>LOGIN</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#555"
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            placeholderTextColor="#555"
            secureTextEntry
          />
          <Image source={require("./assets/eye.png")} style={styles.eyeIcon} />
        </View>

        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>

        <Text style={styles.agreeText}>
          When you agree to terms and conditions
        </Text>

        <TouchableOpacity>
          <Text style={styles.forgotText}>For got your password?</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>Or login with</Text>

        <View style={styles.socialContainer}>
          <TouchableOpacity
            style={[styles.socialButton, { backgroundColor: "#275A8D" }]}
          >
            <Image
              source={require("./assets/facebook.png")}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.socialButton, { backgroundColor: "#1593C5" }]}
          >
            <Image
              source={require("./assets/zalo.png")}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.socialButton,
              {
                backgroundColor: "#D8EFDE",
                borderWidth: 1,
                borderColor: "blue",
              },
            ]}
          >
            <Image
              source={require("./assets/google.png")}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D8EFDE",
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    width: "90%",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#000",
  },
  input: {
    width: "100%",
    backgroundColor: "#C9D9C8",
    padding: 12,
    marginBottom: 15,
    borderRadius: 3,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#C9D9C8",
    width: "100%",
    borderRadius: 3,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    padding: 12,
  },
  eyeIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  loginButton: {
    backgroundColor: "#C34E3B",
    paddingVertical: 14,
    borderRadius: 3,
    width: "100%",
    alignItems: "center",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#c94f3d",
  },
  loginText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  agreeText: {
    fontSize: 12,
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  forgotText: {
    color: "blue",
    marginBottom: 20,
    textAlign: "center",
  },
  orText: {
    marginBottom: 10,
    color: "#333",
    textAlign: "center",
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  socialButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 3,
  },
  socialIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
});
