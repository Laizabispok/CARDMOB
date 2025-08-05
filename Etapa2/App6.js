import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';

const API_URL = 'http://10.81.205.6:3000/compras';

export default function App() {
  const [compras, setCompras] = useState([]);
  const [item, setItem] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [editingId, setEditingId] = useState(null);


  useEffect(() => {
    fetchCompras();
  }, []);

  const fetchCompras = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setCompras(data);
    } catch (error) {
      Alert.alert('Erro ao buscar compras', error.message);
    }
  };


  const salvarCompra = async () => {
    if (!item || !quantidade) {
      Alert.alert('Preencha os campos!');
      return;
    }

    const compra = { item, quantidade: Number(quantidade) };

    try {
      if (editingId) {
  
        await fetch(`${API_URL}/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(compra),
        });
        Alert.alert('Compra atualizada!');
      } else {
      
        await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(compra),
        });
        Alert.alert('Compra adicionada!');
      }
      setItem('');
      setQuantidade('');
      setEditingId(null);
      fetchCompras();
    } catch (error) {
      Alert.alert('Erro ao salvar compra', error.message);
    }
  };

  
  const excluirCompra = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      Alert.alert('Compra excluída!');
      fetchCompras();
    } catch (error) {
      Alert.alert('Erro ao excluir compra', error.message);
    }
  };


  const editarCompra = (compra) => {
    setItem(compra.item);
    setQuantidade(compra.quantidade.toString());
    setEditingId(compra.id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Compras</Text>

      <TextInput
        placeholder="Nome do item"
        value={item}
        onChangeText={setItem}
        style={styles.input}
      />

      <TextInput
        placeholder="Quantidade"
        value={quantidade}
        onChangeText={setQuantidade}
        keyboardType="numeric"
        style={styles.input}
      />

      <Button title={editingId ? 'Atualizar' : 'Adicionar'} onPress={salvarCompra} />

      <FlatList
        data={compras}
        keyExtractor={(compra) => compra.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.item} - Quantidade: {item.quantidade}</Text>
            <View style={styles.buttons}>
              <Button title="Editar" onPress={() => editarCompra(item)} />
              <Button title="Excluir" onPress={() => excluirCompra(item.id)} color="red" />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 30 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
  input: {
    borderWidth: 1,
    borderColor: '#888',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
   
  },
  item: {
    padding: 10,
    marginVertical: 5,
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 5,
    
  },
  buttons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 },
});
