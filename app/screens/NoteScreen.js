// Displays the main screen of the app, showing a list of notes and providing options to add, search, and manage notes.
// Fetches user data, greets the user based on the time of day, and handles note CRUD operations.

import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from "react-native";
import { useNotes } from "../contexts/NoteProvider";
import tw from "twrnc";
import colors from "../misc/colors";
import SearchBar from "../components/SearchBar";
import RoundIconBtn from "../components/RoundIconBtn";
import NoteInputModal from "../components/NoteInputModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Note from "../components/Note";
import NotFound from "../components/NotFound";

const NoteScreen = ({ user, navigation }) => {
  // State variables
  const [greet, setGreet] = useState("Evening");
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { notes, setNotes, findNotes } = useNotes();
  const [resultNotFound, setResultNotFound] = useState(false);

  // Function to determine the greeting based on the time of day
  const findGreet = () => {
    const hrs = new Date().getHours();
    if (hrs === 0 || hrs < 12) return setGreet("Morning");
    if (hrs === 1 || hrs < 17) return setGreet("Afternoon");
    setGreet("Evening");
  };

  // Effect hook to fetch user data and set the greeting on component mount
  useEffect(() => {
    findGreet();
  }, []);

  // Function to handle note submission
  const handleOnSubmit = async (title, desc) => {
    const note = { id: Date.now(), title, desc, time: Date.now() };
    const updatedNotes = [...notes, note];
    setNotes(updatedNotes);
    await AsyncStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  // Function to open a selected note for detailed view
  const openNote = (note) => {
    navigation.navigate("NoteDetail", { note });
  };

  // Function to handle search input
  const handleOnSearchInput = async (text) => {
    setSearchQuery(text);
    if (!text.trim()) {
      setSearchQuery("");
      setResultNotFound(false);
      return await findNotes();
    }
    const filteredNotes = notes.filter((note) => {
      if (note.title.toLowerCase().includes(text.toLowerCase())) {
        return note;
      }
    });

    if (filteredNotes.length) {
      setNotes([...filteredNotes]);
    } else {
      setResultNotFound(true);
    }
  };

  // Function to handle search input clearing
  const handleOnClear = async () => {
    setSearchQuery("");
    setResultNotFound(false);
    await findNotes();
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.LIGHT} />
      {/* TouchableWithoutFeedback to dismiss the keyboard on outside press */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={tw`px-[20] flex-1 z-10`}>
          {/* Greeting text */}
          <Text
            style={tw`text-xl font-bold mt-6`}
          >{`Good ${greet} ${user.name}`}</Text>

          {/* SearchBar component for note search */}
          {notes.length ? (
            <SearchBar
              value={searchQuery}
              onChangeText={handleOnSearchInput}
              style={tw`my-12`}
              onClear={handleOnClear}
            />
          ) : null}

          {/* Conditional rendering based on search results */}
          {resultNotFound ? (
            <NotFound />
          ) : (
            <FlatList
              data={notes}
              numColumns={2}
              columnWrapperStyle={tw`justify-between mb-4`}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <Note onPress={() => openNote(item)} item={item} />
              )}
            />
          )}

          {/* Display message if no notes are available */}
          {!notes.length ? (
            <View
              style={[
                StyleSheet.absoluteFillObject,
                tw`flex-1 justify-center items-center -z-10`,
              ]}
            >
              <Text style={tw`text-3xl font-bold opacity-20`}>ADD NOTES</Text>
            </View>
          ) : null}
        </View>
      </TouchableWithoutFeedback>

      {/* Floating action button to add a new note */}
      <View style={tw`absolute right-8 bottom-16 z-10`}>
        <RoundIconBtn
          onPress={() => setModalVisible(true)}
          antIconName="plus"
          size={30}
          color={colors.PRIMARY}
          style={{ borderRadius: 30, backgroundColor: colors.PRIMARY }}
        />
      </View>

      {/* Note input modal */}
      <NoteInputModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleOnSubmit}
      />
    </>
  );
};

export default NoteScreen;
