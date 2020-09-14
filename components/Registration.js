import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  SafeAreaView,
  TextInput,
  Picker,
} from "react-native";
import { Button } from "./Button";
import { LinearGradient } from "expo-linear-gradient";
import { Input } from "./Input";
import firebase from "firebase";
const Registration = ({ onRouteChange }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const regButton = (e, p) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(e, p)
      .then(function (user) {
        var user = firebase.auth().currentUser;
        var userID = user.uid;
        onRouteChange("signin");
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        setErr(error.message);
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
            onPress={() => regButton(email, pass)}
          >
            <Text style={{ textAlign: "center", color: "white" }}>
              Register
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onRouteChange("signin")}>
            <Text>Already Registered? Sign in.</Text>
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
export { Registration };
