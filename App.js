import React, { useState, useEffect } from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import Row from './components/Row';
import Search from './components/search';
import { StatusBar } from 'expo-status-bar';
import AddItemForm from './components/add';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@persons_key';

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (ex) {
    console.error(ex);
  }
};

export default function App() {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [items, setItems] = useState([]);

 //useEffect(() => {
           //setFilteredData(items); // Use items state instead of DATA
   // AsyncStorage.clear()  // Use this to clear the storage
   // getData()
  //}, []); // items // Add items to the dependency array 

  useEffect(() => {
    const fetchItems = async () => {
      const storedItems = await getData();
      if (storedItems && storedItems.length > 0) {
        setItems(storedItems);
        setFilteredData(storedItems);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    executeSearch(searchText);
  }, [items, searchText]); // Re-run when items or searchText changes

  const executeSearch = searchText => {
    setSearchText(searchText);
    const formattedQuery = searchText.toLowerCase();
    const data = items.filter(item => {
      return item.lastName.toLowerCase().startsWith(formattedQuery);
    });
    setFilteredData(data);
  };

  const handleSelect = (id) => {
    setSelectedId(id);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bigBox}>
        <Search executeSearch={executeSearch} />
        <AddItemForm items={items} setItems={setItems} executeSearch={executeSearch} searchText={searchText} />
        <FlatList
          data={filteredData}
          keyExtractor={item => item.id ? item.id.toString() : Math.random().toString()}
          renderItem={({ item }) => (
            <Row 
              item={item} 
              selectedId={selectedId}
              onSelect={handleSelect}
            />
          )}
          extraData={items} // to trigger re-render when 'items' changes
        />
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  bigBox: {
    marginTop: 50,
    flex: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 10,
    margin: 10,
  },
  // ... any other styles you have
});