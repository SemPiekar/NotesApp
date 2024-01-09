// Screen component displayed on the first app launch.
// Prompts the user to enter their name before proceeding.

import React, { useState } from "react";
import tw from "twrnc";
import { View, StyleSheet, TextInput, Text, Dimensions } from "react-native";
import { StatusBar } from "expo-status-bar";
import RoundIconBtn from "../components/RoundIconBtn";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Intro = ({ onFinish }) => {
  // Get window width
  const { width } = Dimensions.get("window");

  // State variable for user name
  const [name, setName] = useState("");

  // Function to handle text input changes
  const handleOnChangeText = (text) => setName(text);

  // Function to handle form submission
  const handleSubmit = async () => {
    const user = { name: name };
    await AsyncStorage.setItem("user", JSON.stringify(user));
    if (onFinish) onFinish();
  };

  return (
    <>
      {/* Hide status bar */}
      <StatusBar hidden />

      {/* Intro screen layout */}
      <View style={tw`flex-1 justify-center items-center`}>
        {/* Name input prompt */}
        <Text style={tw`opacity-50 mb-[5] pl-[25] self-start`}>
          Enter Your Name to Continue
        </Text>

        {/* Name input field */}
        <TextInput
          value={name}
          onChangeText={handleOnChangeText}
          placeholder="Enter Name"
          style={[
            tw`mb-[15] text-[#dbb2ff] text-[25px] pl-[15] border-2 border-[#dbb2ff] h-[15] rounded-xl`,
            { width: width - 50 },
          ]}
        />

        {/* Proceed button when name has 3 or more characters */}
        {name.trim().length >= 3 ? (
          <RoundIconBtn antIconName="arrowright" onPress={handleSubmit} />
        ) : null}
      </View>
    </>
  );
};

export default Intro;
