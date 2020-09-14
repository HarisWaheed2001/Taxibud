import React, { useState } from "react";
import { TextInput, StyleSheet } from "react-native";

const Input = (props) => {
  const [text, setText] = useState("");
  return (
    <TextInput
      onChangeText={(text) => setText(text)}
      style={styles.buttonback}
      placeholder={props.children}
    />
  );
};
const styles = StyleSheet.create({
  buttonback: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    margin: 10,
  },
});
export { Input };
