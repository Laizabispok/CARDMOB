import React, { useState } from 'react';
import Contato from './Contato';

function ListaContato() {
  const [contatos, setContatos] = useState([]);
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [editId, setEditId] = useState(null);

  const handleAddContato = (e) => {
    e.preventDefault();
    if (editId) {
      // Atualizar contato existente
      setContatos(
        contatos.map((contato) =>
          contato.id === editId ? { ...contato, nome, telefone } : contato
        )
      );
      setEditId(null);
    } else {
      // Adicionar novo contato
      const newContato = {
        id: Date.now(),
        nome,
        telefone,
      };
      setContatos([...contatos, newContato]);
    }
    setNome('');
    setTelefone('');
  };

  const handleEditContato = (id) => {
    const contato = contatos.find((contato) => contato.id === id);
    setNome(contato.nome);
    setTelefone(contato.telefone);
    setEditId(id);
  };

  const handleDeleteContato = (id) => {
    setContatos(contatos.filter((contato) => contato.id !== id));
  };

  return (
    <div>
      <h2>Lista de Contatos</h2>
      <form onSubmit={handleAddContato}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          required
        />
        <button type="submit">{editId ? 'Atualizar' : 'Adicionar'}</button>
      </form>
      <div>
        {contatos.map((contato) => (
          <Contato
            key={contato.id}
            id={contato.id}
            nome={contato.nome}
            telefone={contato.telefone}
            onEdit={handleEditContato}
            onDelete={handleDeleteContato}
          />
        ))}
      </div>
    </div>
  );
}

export default ListaContato;