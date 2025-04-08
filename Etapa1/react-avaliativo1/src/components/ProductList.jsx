import React, { useState } from 'react';
import ProductCard from './ProductCard';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [editId, setEditId] = useState(null);

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (editId) {
   
      setProducts(
        products.map((product) =>
          product.id === editId ? { ...product, nome, preco: parseFloat(preco) } : product
        )
      );
      setEditId(null);
    } else {
      
      const newProduct = {
        id: Date.now(),
        nome,
        preco: parseFloat(preco),
      };
      setProducts([...products, newProduct]);
    }
    setNome('');
    setPreco('');
  };

  const handleEditProduct = (id) => {
    const product = products.find((product) => product.id === id);
    if (product) {
      setNome(product.nome);
      setPreco(product.preco);
      setEditId(id);
    }
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div>
      <h2>Gerenciar Produtos</h2>
      <form onSubmit={handleAddProduct}>
        <input
          type="text"
          placeholder="Nome do Produto"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Preço"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          required
        />
        <button type="submit">{editId ? 'Atualizar Produto' : 'Adicionar Produto'}</button>
      </form>

      <div>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            nome={product.nome}
            preco={product.preco}
            onAddToCart={() => alert(`Produto "${product.nome}" adicionado ao carrinho!`)}
          >
            <button onClick={() => handleEditProduct(product.id)}>Editar</button>
            <button onClick={() => handleDeleteProduct(product.id)}>Excluir</button>
          </ProductCard>
        ))}
      </div>
    </div>
  );
}

export default ProductList;