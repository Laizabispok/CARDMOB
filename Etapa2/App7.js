import React, { useState, useEffect } from "react";
import {StyleSheet, Text, View, TextInput, Button, FlatList,Image,} from "react-native";

const BASE_URL = "http://10.0.2.2:5000";

export default function App() {
  const [catalog, setCatalog] = useState([]);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [descricao, setDescricao] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [editNome, setEditNome] = useState("");
  const [editPreco, setEditPreco] = useState("");
  const [editDescricao, setEditDescricao] = useState("");

  const fetchCatalog = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/catalog?page=1`);
      const data = await res.json();
      setCatalog(data.catalog);
    } catch (error) {
      console.error("Erro ao buscar catálogo:", error);
    }
  };

  useEffect(() => {
    fetchCatalog();
  }, []);

  const adicionarItem = async () => {
    if (!nome.trim() || !preco.trim() || !descricao.trim()) return;

    try {
      await fetch(`${BASE_URL}/api/catalog`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nome.trim(),
          price: parseFloat(preco),
          description: descricao.trim(),
        }),
      });
      setNome("");
      setPreco("");
      setDescricao("");
      fetchCatalog();
    } catch (error) {
      console.error("Erro ao adicionar item:", error);
    }
  };

  const atualizarItem = async (id) => {
    try {
      await fetch(`${BASE_URL}/api/catalog/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editNome,
          price: parseFloat(editPreco),
          description: editDescricao,
        }),
      });
      setEditandoId(null);
      setEditNome("");
      setEditPreco("");
      setEditDescricao("");
      fetchCatalog();
    } catch (error) {
      console.error("Erro ao atualizar item:", error);
    }
  };

  const deletarItem = async (id) => {
    try {
      await fetch(`${BASE_URL}/api/catalog/${id}`, {
        method: "DELETE",
      });
      fetchCatalog();
    } catch (error) {
      console.error("Erro ao deletar item:", error);
    }
  };

  const renderItem = ({ item }) => {
    if (item.id === editandoId) {
      return (
        <View style={styles.itemEditando}>
          <TextInput
            style={styles.input}
            value={editNome}
            onChangeText={setEditNome}
            placeholder="Nome"
          />
          <TextInput
            style={styles.input}
            value={editPreco.toString()}
            onChangeText={setEditPreco}
            placeholder="Preço"
            keyboardType="decimal-pad"
          />
          <TextInput
            style={styles.input}
            value={editDescricao}
            onChangeText={setEditDescricao}
            placeholder="Descrição"
          />
          <Button title="Salvar" onPress={() => atualizarItem(item.id)} color="#9C27B0" />
        </View>
      );
    }

    return (
      <View style={styles.item}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={{ flex: 1 }}>
          <Text style={styles.itemText}>{item.name}</Text>
          <Text style={styles.itemText}>R$ {item.price.toFixed(2)}</Text>
          <Text style={styles.itemDescricao}>{item.description}</Text>
        </View>
        <View style={styles.buttonsVertical}>
          <View style={styles.buttonSpacing}>
            <Button
              title="Editar"
              color="#E91E63"
              onPress={() => {
                setEditandoId(item.id);
                setEditNome(item.name);
                setEditPreco(item.price.toString());
                setEditDescricao(item.description);
              }}
            />
          </View>
          <Button
            title="Excluir"
            color="#9C27B0"
            onPress={() => deletarItem(item.id)}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: "#9C27B0" }]}>Catálogo de Produtos</Text>

      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Nome do produto"
      />
      <TextInput
        style={styles.input}
        value={preco}
        onChangeText={setPreco}
        placeholder="Preço"
        keyboardType="decimal-pad"
      />
      <TextInput
        style={styles.input}
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Descrição"
      />
      <View style={styles.buttonSpacing}>
        <Button title="Adicionar Produto" onPress={adicionarItem} color="#E91E63" />
      </View>

      <FlatList
        data={catalog}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        style={{ marginTop: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    padding: 20,
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 45,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    backgroundColor: "#e9ecef",
    padding: 15,
    borderRadius: 10,
    gap: 12,
  },
  itemEditando: {
    backgroundColor: "#fff3cd",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
  },
  itemText: {
    fontSize: 16,
    color: "#333",
  },
  itemDescricao: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  buttonsVertical: {
    flexDirection: "column",
    gap: 8,
  },
  buttonSpacing: {
    marginBottom: 8,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
});
