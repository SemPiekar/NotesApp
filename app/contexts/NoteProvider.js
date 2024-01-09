// Context provider for managing the state of notes.
// Fetches and sets notes from AsyncStorage.

import React, { createContext, useEffect, useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NoteContext = createContext();

const NoteProvider = ({children}) => {
  // State variable for notes
  const [notes, setNotes] = useState([]);

  // Function to find and set notes from AsyncStorage
  const findNotes = async () => {
    const result = await AsyncStorage.getItem("notes");
    if (result !== null) setNotes(JSON.parse(result));
  };

  // Effect hook to fetch notes on component mount
  useEffect(() => {
    findNotes();
  }, []);

  return (
    // Provide notes context to children components
    <NoteContext.Provider value={{notes, setNotes, findNotes}}>
        {children}
    </NoteContext.Provider>
  );
};

// Custom hook for using notes context
export const useNotes = () => useContext(NoteContext);

export default NoteProvider;
