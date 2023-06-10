import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import axios from "axios";
import { useToast } from "react-native-toast-notifications";

import { validateEmail } from "../../utils";
import { API_URL } from "../../constant";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginForm = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const toast = useToast();

  const handleLogin = () => {
    if (!email || !password) {
      setError("Please fill out all the fields!");
      return;
    }

    if (!validateEmail(email)) {
      setError("Enter valid email format!");
      return;
    }

    setError("");

    const formData = new FormData();
    formData.append("username", email);
    formData.append("password", password);

    axios
      .post(`${API_URL}/api/auth/signin`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(async ({ data }) => {
        toast.show("User login successfully!", {
          type: "success",
          duration: 4000,
          offset: 30,
          animationType: "slide-in | zoom-in",
        });
        await AsyncStorage.setItem("token", data.access_token);
        await AsyncStorage.setItem("user", JSON.stringify(data.user));
        navigation.navigate("Top");
      })
      .catch((err) =>
        toast.show(err.response.data.detail, {
          type: "danger",
          duration: 4000,
          offset: 30,
          animationType: "slide-in | zoom-in",
        })
      );
  };

  return (
    <View className="flex h-full items-center justify-center">
      <Text className="text-2xl font-bold, mb-4"> Login to Your Account</Text>
      <View className="w-3/4">
        <TextInput
          className="border rounded p-2"
          placeholder="Email"
          onChangeText={setEmail}
        />
        <TextInput
          className="mt-4 p-2 border rounded"
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={setPassword}
        />

        {error ? (
          <Text className="text-red-500 text-center font-bold">{error}</Text>
        ) : null}

        <TouchableOpacity
          className="bg-blue-500 rounded p-2 mt-4"
          onPress={handleLogin}
        >
          <Text className="text-white text-center font-bold">Login</Text>
        </TouchableOpacity>

        <View className="flex-row mt-4 justify-center">
          <Text className="text-gray-700">Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text className="text-blue-500 underline">Sign up now!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginForm;
