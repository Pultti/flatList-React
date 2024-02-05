import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@persons_key';

const AddItemForm = ({ items, setItems }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const storeData = async (newItems) => {
    try {
      const jsonValue = JSON.stringify(newItems);
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    } catch (ex) {
      console.log(ex);
    }
  };

  const save = () => {
    if (!firstName.trim() || !lastName.trim()) {
      Alert.alert('Invalid Input', 'First name and last name cannot be empty.'); // Show alert if either field is empty
      return; // Exit the function early if validation fails
    }

    const newPerson = {
      id: String(items.length + 1), // Create a new id
      firstName: firstName,
      lastName: lastName,
    };
    const newItems = [...items, newPerson]; // Create a new items array with the new person
    setItems(newItems); // Update the items state
    storeData(newItems); // Store the updated items array in AsyncStorage
    setFirstName(''); // Reset the form fields
    setLastName('');
  };

  return (
    <View style={styles.formContainer}>
      <TextInput
        value={firstName}
        onChangeText={setFirstName}
        placeholder="First Name"
      />
      <TextInput
        value={lastName}
        onChangeText={setLastName}
        placeholder="Last Name"
      />
      <Button title='Save' onPress={save} />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
});

export default AddItemForm;