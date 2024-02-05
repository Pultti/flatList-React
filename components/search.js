import React, { useState } from 'react';
import { TextInput, StyleSheet } from 'react-native';

const Search = ({ executeSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    executeSearch(searchText);
  };

  return (
    <TextInput
      style={styles.input}
      onChangeText={setSearchText}
      value={searchText}
      placeholder="Search by last name..."
      onSubmitEditing={handleSearch} // Search when enter is hit
      returnKeyType="search" // Show search button on soft keypad
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default Search;