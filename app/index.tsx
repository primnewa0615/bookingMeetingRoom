import React, { useState } from "react";
import { View, Text } from "react-native";
import Welcome from "./screens/Welcome";
import LoginScreen from "./screens/LoginScreen";

function index() {
  const [first, setFirst] = useState(true);

  const changeScreen = () => {
    setFirst(!first);
  };
  return (
    <View style={{ flex: 1 }}>
      {first ? <Welcome changeScreen={changeScreen} /> : <LoginScreen />}
    </View>
  );
}

export default index;
