import { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { useToast } from "react-native-toast-notifications";
import axios from "axios";

import { validateEmail } from "../../utils";
import { API_URL } from "../../constant";

const RegisterForm = ({ navigation }) => {
  const [error, setError] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [email, setEmail] = useState("");

  const toast = useToast();

  const handleRegister = () => {
    if (!fullname || !password || !email) {
      setError("Pleaes fill out all fields!");
      return;
    }

    if (!validateEmail(email)) {
      setError("Enter valid email format!");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match!");
      return;
    }

    setError("");

    axios
      .post(`${API_URL}/api/auth/signup`, {
        email,
        fullname,
        password,
      })
      .then(({ data }) => {
        toast.show("User registered successfully!", {
          type: "success",
          duration: 4000,
          offset: 30,
          animationType: "slide-in | zoom-in",
        });
        navigation.navigate("Login");
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
      <Text className="text-2xl font-bold, mb-4"> Register New Account</Text>
      <View className="w-3/4">
        <TextInput
          className="border rounded p-2"
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={setEmail}
        />
        <TextInput
          className="mt-4 border rounded p-2"
          placeholder="Fullname"
          onChangeText={setFullname}
        />
        <TextInput
          className="mt-4 p-2 border rounded"
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={setPassword}
        />
        <TextInput
          className="mt-4 p-2 border rounded"
          placeholder="Confirm"
          secureTextEntry={true}
          onChangeText={setConfirm}
        />

        {error ? (
          <Text className="text-red-500 text-center mt-4">{error}</Text>
        ) : null}

        <TouchableOpacity
          className="bg-blue-500 rounded p-2 mt-4"
          onPress={handleRegister}
        >
          <Text className="text-white text-center font-bold">Register</Text>
        </TouchableOpacity>

        <View className="flex-row mt-4 justify-center">
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text className="text-blue-500 underline">
              Already have an account?
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default RegisterForm;
