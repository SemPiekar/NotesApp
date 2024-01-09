import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import tw from "twrnc";

const NotFound = () => {
  return (
    <View>
      <AntDesign name="frowno" size={90} color="black" />
      <Text
        style={[
          StyleSheet.absoluteFillObject,
          tw`flex-1 justify-center items-center opacity-50 -z-10 mt-18 text-3xl`,
        ]}
      >
        No Notes Found
      </Text>
    </View>
  );
};

export default NotFound;
