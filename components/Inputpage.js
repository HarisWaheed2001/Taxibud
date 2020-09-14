import React, { useState } from "react";
import {
  Platform,
  StatusBar,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  Button,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";

const Inputpage = (props) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
      enabled={false}
      style={styles.newview}
    >
      <View style={styles.textinputview}>
        <View style={styles.halfflextp}>
          <Text style={styles.newtext}>{props.children}</Text>
        </View>
        <View style={styles.halfflexbtm}>
          <TextInput
            placeholder={"Enter here"}
            placeholderTextColor={"black"}
          ></TextInput>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  newtext: {
    fontSize: 25,
    textAlign: "center",
  },
  textinputview: {
    flex: 1 / 3,
    backgroundColor: "lightgrey",
    borderRadius: 50,
    justifyContent: "flex-start",
  },
  newview: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: "white",
  },
  halfflexbtm: {
    flex: 1 / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  halfflextp: {
    flex: 1 / 2,
    justifyContent: "center",
  },
});
export { Inputpage };
