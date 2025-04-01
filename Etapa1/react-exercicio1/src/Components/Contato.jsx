import React from 'react';

function Contato({ id, nome, telefone, onEdit, onDelete }) {
  return (
    <div>
      <p><strong>Nome:</strong> {nome}</p>
      <p><strong>Telefone:</strong> {telefone}</p>
      <button onClick={() => onEdit(id)}>Editar</button>
      <button onClick={() => onDelete(id)}>Excluir</button>
    </div>
  );
}

export default Contato;