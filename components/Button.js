import React from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";

const Button = ({ route, routeChangeS, children }) => {
  return (
    <TouchableOpacity
      style={styles.buttonback}
      onPress={() => routeChangeS(route)}
    >
      <Text style={styles.buttontext}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttontext: {
    textAlign: "center",
    color: "white",
    fontSize: 15,
  },
  buttonback: {
    width: "80%",
    backgroundColor: "#31d4d4",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    padding: 10,
    margin: 10,
    marginBottom: 20,
  },
});
export { Button };
