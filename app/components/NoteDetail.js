// Displays the detailed view of a selected note, allowing users to edit or delete it.
// Manages note updates, deletions, and provides an option to edit notes.

import React, { useState } from "react";
import { Text, View, ScrollView } from "react-native";
import { Alert } from "react-native";
import { useNotes } from "../contexts/NoteProvider";
import tw from "twrnc";
import RoundIconBtn from "./RoundIconBtn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NoteInputModal from "./NoteInputModal";

// Function to format date
const formatDate = (ms) => {
  const date = new Date(ms);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hrs = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();

  return `${day}/${month}/${year} - ${hrs}:${min}:${sec}`;
};

const NoteDetail = (props) => {
  // State variables
  const [note, setNote] = useState(props.route.params.note);
  const { setNotes } = useNotes();
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  // Function to delete a note
  const deleteNote = async () => {
    const result = await AsyncStorage.getItem("notes");
    let notes = [];
    if (result !== null) notes = JSON.parse(result);

    const newNotes = notes.filter((n) => n.id !== note.id);
    setNotes(newNotes);
    await AsyncStorage.setItem("notes", JSON.stringify(newNotes));
    props.navigation.goBack();
  };

  // Function to display delete confirmation alert
  const displayDeleteAlert = () => {
    Alert.alert(
      "Are You Sure?",
      "This action will delete the note permanently",
      [
        { text: "Delete", onPress: deleteNote },
        { text: "Cancel", onPress: () => console.log("Canceled") },
      ],
      {
        cancelable: true,
      }
    );
  };

  // Function to handle note update
  const handleUpdate = async (title, desc, time) => {
    const result = await AsyncStorage.getItem("notes");
    let notes = [];
    if (result !== null) notes = JSON.parse(result);

    const newNotes = notes.filter((n) => {
      if (n.id === note.id) {
        n.title = title;
        n.desc = desc;
        n.isUpdated = true;
        n.time = time;

        setNote(n);
      }
      return n;
    });

    setNotes(newNotes);
    await AsyncStorage.setItem("notes", JSON.stringify(newNotes));
  };
  const handleOnClose = () => setShowModal(false);

  // Function to open edit modal
  const openEditModal = () => {
    setIsEdit(true);
    setShowModal(true);
  };

  return (
    <>
      <ScrollView style={tw`pt-14 px-8`}>
        {/* Display last updated or created time */}
        <Text style={tw`text-xs opacity-50 text-right`}>
          {note.isUpdated
            ? `Updated At ${formatDate(note.time)}`
            : `Created At ${formatDate(note.time)}`}
        </Text>
        <Text style={tw`text-3xl text-[#dbb2ff] font-bold`}>{note.title}</Text>
        <Text style={tw`text-xl opacity-60`}>{note.desc}</Text>
      </ScrollView>

      {/* Action buttons */}
      <View style={tw`absolute right-8 bottom-16`}>
        <RoundIconBtn
          antIconName="delete"
          style={tw`bg-[#ff0000] mb-4`}
          onPress={displayDeleteAlert}
        />
        <RoundIconBtn antIconName="edit" onPress={openEditModal} />
      </View>
      {/* Note input modal */}
      <NoteInputModal
        isEdit={isEdit}
        note={note}
        onClose={handleOnClose}
        onSubmit={handleUpdate}
        visible={showModal}
      />
    </>
  );
};

export default NoteDetail;
