import React, { useState, useEffect } from 'react'; // novo: useEffect
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, TextInput, FlatList, Alert } from 'react-native'; // novo: Alert

// Indicar o endereço do backend.
const BASE_URL = 'http://10.81.205.6:5000'; // novo

export default function App() {
  // Excluir tudo que tem relação com counter, pois não usar.
  const [catalog, setCatalog] = useState([]);
  const [newProduct, setNewProduct] = useState({});
  const [editProduct, setEditProduct] = useState({});
  // const [text, setText] = useState('');
  // const [editItemId, setEditItemId] = useState(null);
  // const [editItemText, setEditItemText] = useState('');
  // loading ... efeito de carregando...
  const [loading, setLoading] = useState(false); // novo

  // Buscar tudo.
  const fetchItems = async () => {
    setLoading(true);
    try {
      // executa o que precisa, se der erro entra no catch.
      const response = await fetch(`${BASE_URL}/api/catalog`);
      const data = await response.json();
      console.log(JSON.stringify(data.catalog)); // debug
      setCatalog(data.catalog);

    } catch (error) {-
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
    if (Object.keys(newProduct).length !== 3) {
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}/api/catalog`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({...newProduct}),
      });
      if (response.ok) {
        await fetchItems();
        setNewProduct({});
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
      const response = await fetch(`${BASE_URL}/api/catalog/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: editProduct.name,
          description: editProduct.description,
          price: editProduct.price
        }),
      });
      if (response.ok) {
        await fetchItems();
        setEditProduct({});
        // setEditItemId(null);
        // setEditItemText('');
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
  const deleteItem = async (item) => {
    Alert.alert(
      'Confirm Delete',
      `Deseja realmente excluir: \n${item.name} ?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete',
          onPress: async () => {
            try {
              const response = await fetch(`${BASE_URL}/api/catalog/${item.id}`, {
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


  // Update state editProduct.
  const updateEditProduct = (field, value) => {
    setEditProduct((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Update state newProduct.
  const updateNewProduct = (field, value) => {
    setNewProduct((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // READ -> um único item e/ou lista de itens
  const renderItem = ({item}) => {
    if (item.id != editProduct.id) {
      return (
        <View style={styles.item}>
          <Image 
            source={{uri: item.image }}
            style={{width: 100, height: 100}}
          />
          <Text style={styles.itemText}>{item.name}</Text>
          <Text style={styles.itemText}>{item.description}</Text>
          <Text style={styles.itemText}>{item.price}</Text>

          <View style={styles.buttons}>
            <Button title='Edit' onPress={() => {setEditProduct(item)}}></Button>
            <Button title='Delete' onPress={() => {deleteItem(item)}}></Button>
          </View>
        </View>
      );

    } else {
      // Um item esta sendo editado
      return (
        <View style={styles.item}>
          <TextInput 
            style={styles.editInput}
            onChangeText={(text) => updateEditProduct('name', text)}
            value={editProduct.name}
            autoFocus
          />
          <TextInput 
            style={styles.editInput}
            onChangeText={(text) => updateEditProduct('description', text)}
            value={editProduct.description}
          />
          <TextInput 
            style={styles.editInput}
            onChangeText={(text) => updateEditProduct('price', parseFloat(text))}
            value={editProduct.price?.toString()}
            keyboardType='numeric'
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
        value={newProduct.name}
        onChangeText={(text) => updateNewProduct('name', text)}
        placeholder='Enter name item'
      />
      <TextInput 
        style={styles.input}
        value={newProduct.description}
        onChangeText={(text) => updateNewProduct('description', text)}
        placeholder='Enter description item'
      />
      <TextInput 
        style={styles.input}
        value={newProduct.price?.toString()}
        onChangeText={(text) => updateNewProduct('price', parseFloat(text))}
        placeholder='Enter price item'
        keyboardType='numeric'
      />
      <Button 
        title='Incluir produto'
        onPress={addItem}
      />
      <FlatList
        data={catalog}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.list}
      />

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