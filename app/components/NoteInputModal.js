// Modal component for adding or editing notes.
// Provides input fields for title and description.

import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
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

const NoteInputModal = ({ visible, onClose, onSubmit, note, isEdit }) => {
  // State variables
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  // Function to handle modal close
  const handleModalClose = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    // Populate fields if editing an existing note
    if (isEdit) {
      setTitle(note.title);
      setDesc(note.desc);
    }
  }, [isEdit]);

  // Function to handle text input changes
  const handleOnChangeText = (text, valueFor) => {
    if (valueFor === "title") setTitle(text);
    if (valueFor === "desc") setDesc(text);
  };

  // Function to handle form submission
  const handleSubmit = () => {
    if (!title.trim() && !desc.trim()) return onClose();

    if (isEdit) {
      onSubmit(title, desc, Date.now());
    } else {
      onSubmit(title, desc);
      setTitle("");
      setDesc("");
    }
    onClose();
  };

  // Function to close modal
  const closeModal = () => {
    if (!isEdit) {
      setTitle("");
      setDesc("");
    }
    onClose();
  };

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

          {/* Buttons for submitting and closing the modal */}
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

        {/* TouchableWithoutFeedback to close the modal when tapping outside */}
        <TouchableWithoutFeedback onPress={handleModalClose}>
          <View style={[StyleSheet.absoluteFillObject, tw`flex-1 -z-10`]} />
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default NoteInputModal;
