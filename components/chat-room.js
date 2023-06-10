import { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  SafeAreaView,
} from "react-native";

const ChatRoom = ({ navigation }) => {
  const [model, setModel] = useState("gpt-4");

  return (
    <SafeAreaView className="h-full flex p-6">
      <View className="flex flex-row">
        <View className="flex-1 flex-row bg-slate-200 p-2 rounded-xl h-12">
          <TouchableOpacity
            className={`flex-1 rounded ${
              model === "gpt-3.5" ? "bg-white" : ""
            }`}
            onPress={() => setModel("gpt-3.5")}
          >
            <Text className="text-2xl text-center">GPT 3.5</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 rounded ${model === "gpt-4" ? "bg-white" : ""}`}
            onPress={() => setModel("gpt-4")}
          >
            <Text className="text-2xl text-center">GPT 4</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          className="bg-slate-200 rounded h-12 mx-2 px-2 justify-center"
          onPress={() => navigation.navigate("Settings")}
        >
          <Image
            source={require("../assets/more-icon.png")}
            style={{ width: 25, height: 25 }}
          />
        </TouchableOpacity>
      </View>
      <View className="flex-1 justify-center">
        <Text className="text-center text-4xl font-bold">ChatGPT</Text>
      </View>
      <View className="flex flex-row gap-2">
        <TextInput
          className="flex-1 bg-slate-200 rounded-2xl p-3 text-lg text-black"
          placeholder="Message"
        />
        <TouchableOpacity>
          <Image source={require("../assets/submit-icon.png")} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChatRoom;
