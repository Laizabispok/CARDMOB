import React from 'react';
import ProductCard from './components/ProductCard';
import ProductList from './components/ProductList'; 
import './styles/App.css';
function App() {
  return (
    <div>
      <h1>Lista de Produtos</h1>
      <ProductList />
    </div>
  );
}

export default App;