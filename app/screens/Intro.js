import React, { useState } from "react";
import tw from "twrnc";
import { View, StyleSheet, TextInput, Text, Dimensions } from "react-native";
import { StatusBar } from "expo-status-bar";
import RoundIconBtn from "../components/RoundIconBtn";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Intro = ({ onFinish }) => {
  const { width } = Dimensions.get("window");
  const [name, setName] = useState("");
  const handleOnChangeText = (text) => setName(text);
  const handleSubmit = async () => {
    const user = { name: name };
    await AsyncStorage.setItem("user", JSON.stringify(user));
    if (onFinish) onFinish();
  };

  return (
    <>
      <StatusBar hidden />
      <View style={tw`flex-1 justify-center items-center`}>
        <Text style={tw`opacity-50 mb-[5] pl-[25] self-start`}>
          Enter Your Name to Continue
        </Text>
        <TextInput
          value={name}
          onChangeText={handleOnChangeText}
          placeholder="Enter Name"
          style={[
            tw`mb-[15] text-[#dbb2ff] text-[25px] pl-[15] border-2 border-[#dbb2ff] h-[15] rounded-xl`,
            { width: width - 50 },
          ]}
        />
        {name.trim().length >= 3 ? (
          <RoundIconBtn antIconName="arrowright" onPress={handleSubmit} />
        ) : null}
      </View>
    </>
  );
};

export default Intro;
