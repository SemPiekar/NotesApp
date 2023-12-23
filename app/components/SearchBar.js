import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import tw from "twrnc";

const SearchBar = () => {
  return (
    <View style={tw`my-[15]`}>
      <TextInput style={tw`border-[0.5] border-[#dbb2ff] rounded-xl h-10 pl-[15] text-xl`} placeholder="Search here..."/>
    </View>
  );
};

export default SearchBar;
