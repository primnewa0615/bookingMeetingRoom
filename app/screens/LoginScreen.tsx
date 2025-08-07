import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useController, useForm } from "react-hook-form";
import { axiosInstance } from "@/utils/axiosInstance";
import InputField from "@/components/InputField";
import { USER } from "@/types/user";
import { useUserStore } from "@/storage/user";
import { router } from "expo-router";

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    getValues,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<USER>({
    defaultValues: {
      email: "", // default email
      password: "", // default password
    },
  });

  const login = async (data: USER) => {
    const { email, password } = data;

    if (email === "" || password === "") {
      alert("Email / Password Tidak boleh kosong!");
      return;
    }

    const datas = { email, password };
    try {
      const res = await axiosInstance.post("/login", datas);
      const r = res.data;
      console.log("response", r);

      if (r.status === "success") {
        alert("Login Success");
        useUserStore.getState().setLogin(true);
        useUserStore
          .getState()
          .setUser({ name: "Yosi", division: "Web Developer" });
        router.replace("/(tabs)");
      } else {
        alert("Login failed: " + r.message);
      }
    } catch (err: any) {
      alert("Login error: " + err?.response?.data?.message || err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Ruangan Meeting</Text>
      <View style={styles.card}>
        <Text style={styles.signInText}>Sign In</Text>

        <InputField control={control} name="email" placeHolder="Email" />
        <View style={styles.passwordContainer}>
          <InputField
            name="password"
            placeHolder="Password"
            control={control}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={handleSubmit(login)}
          style={styles.signInButton}
        >
          <Text>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
  },
  card: {
    marginTop: 30,
    padding: 20,
    width: "80%",
    backgroundColor: "#eee",
    borderRadius: 10,
  },
  signInText: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  passwordContainer: {
    position: "relative",
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: 20,
  },
  signInButton: {
    backgroundColor: "#fff",
    padding: 12,
    marginTop: 20,
    borderRadius: 5,
    alignItems: "center",
  },
});
