import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Keyboard,
} from "react-native";
import tw from "twrnc";
import RoundIconBtn from "./RoundIconBtn";

const NoteInputModal = ({ visible, onClose, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const handleModalClose = () => {
    Keyboard.dismiss();
  };

  const handleOnChangeText = (text, valueFor) => {
    if (valueFor === "title") setTitle(text);
    if (valueFor === "desc") setDesc(text);
  };

  const handleSubmit = () => {
    if (!title.trim() && !desc.trim()) return onClose();
    onSubmit(title, desc);
    setTitle("");
    setDesc("");
    onClose();
  };

const closeModal = () => {
    setTitle("");
    setDesc("");
    onClose();
}

  return (
    <>
      <StatusBar hidden />
      <Modal visible={visible} animationType="fade">
        <View style={tw`px-8 pt-6`}>
          <TextInput
            value={title}
            onChangeText={(text) => handleOnChangeText(text, "title")}
            placeholder="Title"
            style={tw`border-b-2 border-[#dbb2ff] text-[20px] h-10 mb-4 font-extrabold`}
          />
          <TextInput
            value={desc}
            multiline
            placeholder="Note"
            style={tw`border-b-2 border-[#dbb2ff] text-[20px] h-20`}
            onChangeText={(text) => handleOnChangeText(text, "desc")}
          />

          <View style={tw`flex-row justify-center py-8`}>
            <RoundIconBtn
              size={15}
              antIconName="check"
              onPress={handleSubmit}
            />
            {title.trim() || desc.trim() ? (
              <RoundIconBtn
                size={15}
                style={tw`ml-4`}
                onPress={closeModal}
                antIconName="close"
              />
            ) : null}
          </View>
        </View>
        <TouchableWithoutFeedback onPress={handleModalClose}>
          <View style={[StyleSheet.absoluteFillObject, tw`flex-1 -z-10`]} />
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default NoteInputModal;
