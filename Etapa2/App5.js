import React, { useState, useEffect } from 'react'; // novo: useEffect
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, TextInput, FlatList, Alert } from 'react-native'; // novo: Alert


//Indicar o endereço  do backend.
const BASE_URL = 'http://10.81.205.6:3000/items';

export default function App() {
  // Excluir tudo que tem relação com counter, pois não usar.
  /// CRUD em memória
  const [items, setItems] = useState([]);
  const [text, setText] = useState('');
  const [editItemId, setEditItemId] = useState(null);
  const [editItemText, setEditItemText] = useState('');
  // loading ... efeito de carregando...
  const [loading, setLoading] = useState(false); // novo

  // Buscar tudo.
  const fetchItems = async () => {
    setLoading(true);
    try {
      // executa o que precisa, se der erro entra no catch.
      const response = await fetch(`${BASE_URL}/items`);
      const data = await response.json();
      console.log(JSON.stringify(data)); // debug
      setItems(data);

    } catch (error) {
      // quando ocorre algum erro.
      console.error('Error fetching items:', error);
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchItems();
  }, [])


  // CREATE
  const addItem = async () => {
    if (text.trim() === '') {
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({text: text.trim()}),
      });
      if (response.ok) {
        await fetchItems();
        setText('');
      }
      else {
        console.error('Failed to add item:', response.status);
      }
    } 
    catch (error) {
      console.error('Error adding item:', error);
    }

  }

  // UPDATE
  const updateItem = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/items/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({text: editItemText}),
      });
      if (response.ok) {
        await fetchItems();
        setEditItemId(null);
        setEditItemText('');
      }
      else {
        console.error('Failed to update item:', response.status);
      }
    }
    catch (error) {
      console.error('Error updating item:', error)
    }

  }

  // DELETE
  const deleteItem = async (id) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this item ?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete',
          onPress: async () => {
            try {
              const response = await fetch(`${BASE_URL}/items/${id}`, {
                method: 'DELETE'
              });
              if (response.ok) {
                await fetchItems();
              }
              else {
                console.error('Failed to delete item:', response.status);
              }
            }
            catch (error) {
              console.error('Error deleting item:', error);
            }
          }, 
        }
      ],
      { cancelable: true }
    );
  };

  // READ -> um único item e/ou lista de itens
  const renderItem = ({item}) => {
    if (item.id != editItemId) {
      return (
        <View style={styles.item}>
          <Text style={styles.itemText}>{item.text}</Text>
          <View style={styles.buttons}>
            <Button title='Edit' onPress={() => {setEditItemId(item.id)}}></Button>
            <Button title='Delete' onPress={() => {deleteItem(item.id)}}></Button>
          </View>
        </View>
      );

    } else {
      // Um item esta sendo editado
      return (
        <View style={styles.item}>
          <TextInput 
            style={styles.editInput}
            onChangeText={setEditItemText}
            value={editItemText}
            autoFocus
          />
          <Button title='Update' onPress={() => updateItem(item.id)}></Button>
        </View>
      );
    }
  }

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder='Enter text item'
      />
      <Button 
        title='Add Item'
        onPress={addItem}
      />
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.list}
      />
      <Text style={styles.text}>Olá App React Native - Atualiza!</Text>
      <Image 
        source={{uri: "https://picsum.photos/200"}}
        style={{width: 200, height: 200}}
      />

      <StatusBar style="auto" />
      {/* <Text style={styles.text}>Counter: {counter}</Text>

      <View style={styles.buttonContainer}>
        <Button title='Increment' onPress={incrementCounter} />
        <Button title='Decrement' onPress={decrementCounter} />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 60,
  },
  text: {
    fontSize: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  list: {
    marginTop: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  itemText: {
    flex: 1,
    marginRight: 10,
  },
  buttons: {
    flexDirection: 'row',
  },
  editInput: {
    flex: 1,
    marginRight: 10,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  }
});