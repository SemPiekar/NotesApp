// Component for a search bar with customizable value, onChangeText, and onClear handlers.

import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import tw from "twrnc";
import { AntDesign } from "@expo/vector-icons";

const SearchBar = ({ value, onChangeText, onClear }) => {
  return (
    <View style={tw`my-[15] justify-center`}>
      {/* TextInput for search input */}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={tw`border-[0.5] border-[#dbb2ff] rounded-xl h-10 pl-[15] text-xl`}
        placeholder="Search here..."
      />

      {/* Clear button when there is text in the search input */}
      {value ? <AntDesign name="close" size={20}  onPress={onClear} style={tw`absolute right-2`}/> : null}
    </View>
  );
};

export default SearchBar;
