import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

const Welcome = ({ changeScreen }: { changeScreen: () => void }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selamat Datang</Text>
      <Text style={styles.subtitle}>Di Aplikasi</Text>
      <Text style={styles.subtitleBold}>Ruang Meeting</Text>

      <TouchableOpacity style={styles.button} onPress={() => changeScreen()}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
    marginTop: 10,
    textAlign: "left",
  },
  subtitleBold: {
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    marginTop: 40,
    backgroundColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 16,
  },
});
export default Welcome;
