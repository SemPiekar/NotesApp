import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import tw from "twrnc";

const RoundIconBtn = ({ antIconName, size, color, onPress }) => {
  return (
    <AntDesign
      style={tw`shadow-lg bg-[#dbb2ff] p-[15] rounded-full `}
      name={antIconName}
      size={size || 24}
      color={color || "#FFF"}
      onPress={onPress}
    />
  );
};

export default RoundIconBtn;
