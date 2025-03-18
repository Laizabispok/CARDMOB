import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import Counter from "./components/Counter";
import Photo from "./components/Photo";
import Album from "./components/Album"; 

function App() {
  const [count, setCount] = useState(0);
  const [photos, setPhotos] = useState([]);
  const [albumId, setAlbumId] = useState(1); 

  const fetchPhotos = async () => {

    try {
      const url = "https://jsonplaceholder.typicode.com/albums/1/photos";
      const response = await fetch(url); // Por padrão executa uma request do tipo GET	
      // console.log(response);
      if (response.status === 200) {
        const data = await response.json();
        // console.log(data);
        const updatedPhotos = data.map((photo) => ({
          ...photo,
          thumbnailUrl: `https://picsum.photos/150?random=${photo.id}`,
        }));
        // ...photo {id: 1, title: 'rótulo', thumbnailUrl: "https:///",...}
        // {photo: {id: 1, title: 'rótulo', ...}
        setPhotos(updatedPhotos);
      }
    } catch (error) {
      console.error("Erro ao buscar fotos", error);
    }
  }

  useEffect(() => {
    fetchPhotos();
  }, []); // [] -> executa apenas uma vez

  // function updateCount() {
   const updateCount = () => {
    return count + 1;
  };
  const updateCount1 = () => count + 1; // return é implícito

  const dados = {
    "nome": "fulano",
    "atualiza":(novo_nome) => `Meu nome é ${novo_nome}`,
    "endereco": {
      "rua": "xyz",
      "numero": 111,
      "complementos": ["casa", "na esquina do supermercado"]
    }
  };  // é um objeto JS
  dados.atualiza("gerson");
  dados.endereco.complementos[1]; // acessando a referência

  return (
    <>
      <Counter title="Contando..." />
      <Counter initial="100" />
  
      {/* <article>
        <h1>Album da API</h1>
        {photos.map((photo) => (
          <Photo key={photo.id} photo={photo} /> // ✅ Adicionado key no .map()
        ))}
      </article> */}

      <div>
        <button onClick={() => setAlbumId(1)}>Album #1</button>
        <button onClick={() => setAlbumId(2)}>Album #2</button>
        <button onClick={() => setAlbumId(3)}>Album #3</button>
        <button onClick={() => setAlbumId(4)}>Album #4</button>
      </div>

      <Album albumId={albumId}></Album>
      </>

  )
}

export default App;

