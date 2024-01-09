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
  const [greet, setGreet] = useState("Evening");
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { notes, setNotes, findNotes } = useNotes();
  const [resultNotFound, setResultNotFound] = useState(false);

  const findGreet = () => {
    const hrs = new Date().getHours();
    if (hrs === 0 || hrs < 12) return setGreet("Morning");
    if (hrs === 1 || hrs < 17) return setGreet("Afternoon");
    setGreet("Evening");
  };

  useEffect(() => {
    findGreet();
  }, []);

  const handleOnSubmit = async (title, desc) => {
    const note = { id: Date.now(), title, desc, time: Date.now() };
    const updatedNotes = [...notes, note];
    setNotes(updatedNotes);
    await AsyncStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const openNote = (note) => {
    navigation.navigate("NoteDetail", { note });
  };

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

  const handleOnClear = async () => {
    setSearchQuery("");
    setResultNotFound(false);
    await findNotes();
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.LIGHT} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={tw`px-[20] flex-1 z-10`}>
          <Text
            style={tw`text-xl font-bold mt-6`}
          >{`Good ${greet} ${user.name}`}</Text>
          {notes.length ? (
            <SearchBar
              value={searchQuery}
              onChangeText={handleOnSearchInput}
              style={tw`my-12`}
              onClear={handleOnClear}
            />
          ) : null}

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
      <View style={tw`absolute right-8 bottom-16 z-10`}>
        <RoundIconBtn
          onPress={() => setModalVisible(true)}
          antIconName="plus"
          size={30}
          color={colors.PRIMARY}
          style={{ borderRadius: 30, backgroundColor: colors.PRIMARY }}
        />
      </View>
      <NoteInputModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleOnSubmit}
      />
    </>
  );
};

export default NoteScreen;
