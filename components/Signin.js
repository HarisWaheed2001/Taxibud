import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  SafeAreaView,
  TextInput,
} from "react-native";
import { Button } from "./Button";
import { LinearGradient } from "expo-linear-gradient";
import { Input } from "./Input";
import firebase from "firebase";
const Signin = ({ onRouteChange }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  const signIn = (e, p) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(e, p)
      .then(function (user) {
        onRouteChange("home");
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        setErr(errorMessage);
      });
  };
  return (
    <SafeAreaView>
      <LinearGradient colors={["yellow", "#9b870c", "black"]} style={styles.bc}>
        <View style={styles.parentOrg}>
          <Image source={require("../assets/logo.png")} styles={styles.flex} />
          <TextInput
            style={styles.inputtextback}
            placeholder={"Email"}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.inputtextback}
            placeholder={"Password"}
            secureTextEntry
            onChangeText={(text) => setPass(text)}
          />
          <TouchableOpacity
            style={styles.buttonstyle}
            onPress={() => signIn(email, pass)}
          >
            <Text style={{ textAlign: "center", color: "white" }}>Signin</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onRouteChange("register")}>
            <Text>Don't have an account? Sign up.</Text>
          </TouchableOpacity>
          <Text style={{ color: "white", padding: 20 }}>{err}</Text>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bc: {
    width: "100%",
    height: "100%",
  },
  text: {
    padding: 10,
    flex: 1,
  },
  parentOrg: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  flex: {
    flex: 1,
  },
  inputtextback: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    margin: 10,
  },
  buttonstyle: {
    width: "80%",
    backgroundColor: "#31d4d4",
    borderRadius: 5,
    padding: 15,
    margin: 10,
  },
});
export { Signin };
