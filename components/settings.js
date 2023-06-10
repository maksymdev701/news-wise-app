import { useEffect } from "react";
import { View, SafeAreaView, Text } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Settings = () => {
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const data = await AsyncStorage.getItem("user");
  //     const parseData = JSON.parse(data);
  //     console.log(parseData.settings);
  //   };
  //   fetchUser();
  // }, []);

  return (
    <SafeAreaView className="h-full m-6">
      <View className="flex flex-row my-3">
        <Text className="text-right basis-1/3 py-3 mr-1">Local Language :</Text>
        <SelectDropdown
          data={["Chinese", "English"]}
          defaultButtonText={"Select language"}
          buttonStyle={{ flexBasis: "66.666667%", borderWidth: 1 }}
        />
      </View>
      <View className="flex flex-row my-3">
        <Text className="text-right basis-1/3 py-3 mr-1">News Region :</Text>
        <SelectDropdown
          data={["US", "Europe", "China Mainland"]}
          defaultButtonText={"Select region"}
          buttonStyle={{ flexBasis: "66.666667%", borderWidth: 1 }}
        />
      </View>
      <View className="flex flex-row my-3">
        <Text className="text-right basis-1/3 py-3 mr-1">Interests :</Text>
        <SelectDropdown
          data={["Tech", "Business", "Sport", "Fashion"]}
          defaultButtonText={"Select interesting area"}
          buttonStyle={{ flexBasis: "66.666667%", borderWidth: 1 }}
        />
      </View>
      <View className="flex flex-row my-3">
        <Text className="text-right basis-1/3 py-3 mr-1">Summary Format :</Text>
        <SelectDropdown
          data={["Report", "Broadcast"]}
          defaultButtonText={"Select summary format"}
          buttonStyle={{ flexBasis: "66.666667%", borderWidth: 1 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Settings;
