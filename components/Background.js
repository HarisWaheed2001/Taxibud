import React from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
const Background = (props) => {
  return (
    <LinearGradient
      colors={["yellow", "#9b870c", "black"]}
      style={styles.bc}
    ></LinearGradient>
  );
};

const styles = StyleSheet.create({
  bc: {
    flex: 1,
  },
});

export { Background };
