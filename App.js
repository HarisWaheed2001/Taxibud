import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Picker,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Registration } from "./components/Registration";
import { Signin } from "./components/Signin";
import { Button } from "./components/Button";
import { Home } from "./components/Home";
import { Inputpage } from "./components/Inputpage";
import * as firebase from "firebase";
import { firebaseConfig } from "./firebaseConfig";
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
firebase.initializeApp(firebaseConfig);

export default function App() {
  const [state, setState] = useState("register");
  const [bool, setBool] = useState(true);
  const Drawer = createDrawerNavigator();

  const onRouteChange = (newState) => {
    setState(newState);
  };
  const clickFalse = () => {
    setBool(false);
  };
  const clickTrue = () => {
    setBool(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      {state === "home" ? (
        <Home onRouteChange={onRouteChange} />
      ) : state === "register" ? (
        <Registration onRouteChange={onRouteChange} />
      ) : (
        <Signin onRouteChange={onRouteChange} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
