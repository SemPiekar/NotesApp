// Functional component representing a single note card with a title and description.
// Used in the NoteScreen for displaying individual notes.

import React from "react";
import { Text, View, Dimensions, TouchableOpacity } from "react-native";
import tw from "twrnc";

const Note = ({ item, onPress }) => {
    // Destructuring note properties
    const { title, desc } = item;
    const containerWidth = (Dimensions.get("window").width - 40) / 2 - 10;

    return (
        // TouchableOpacity for handling note press
        <TouchableOpacity onPress={onPress} style={[tw`bg-[#dbb2ff] p-4 rounded-md`, { width: containerWidth }]}>
            <Text style={tw`font-bold text-lg `} numberOfLines={2}>{title}</Text>
            <Text numberOfLines={3}>{desc}</Text>
        </TouchableOpacity>
    );
};

export default Note;
