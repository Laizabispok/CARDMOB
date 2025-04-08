import React from 'react';

function ProductCard({ nome, preco, onAddToCart, children }) {
  return (
    <div style={styles.card}>
      <h3>{nome}</h3>
      <p>Preço: R$ {preco.toFixed(2)}</p>
      <button style={styles.button} onClick={onAddToCart}>
        Adicionar ao Carrinho
      </button>
      <div style={styles.actions}>
        {children} {}
      </div>
    </div>
  );
}

const styles = {
  card: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    margin: '16px',
    textAlign: 'center',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  button: {
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '8px',
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
    gap: '8px',
    marginTop: '8px',
  },
};

export default ProductCard;
