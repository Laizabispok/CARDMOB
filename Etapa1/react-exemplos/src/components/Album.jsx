import React, { useState, useEffect } from "react";
import "../Album.css";
import Photo from "./Photo";

const Album = ({ albumId }) => {
    const [photos, setPhotos] = useState([]);

    const fetchPhotos = async (albumId) => {
        try {
            const url = `https://jsonplaceholder.typicode.com/albums/${albumId}/photos`;
            const response = await fetch(url);
            if (response.status === 200) {
                const data = await response.json();
                const updatedPhotos = data.map((photo) => ({
                    ...photo,
                    thumbnailUrl: `https://picsum.photos/150?random=${photo.id}`
                }));
                setPhotos(updatedPhotos);
            }
        } catch (error) {
            console.error("Erro ao buscar fotos", error);
        }
    };

    useEffect(() => {
        fetchPhotos(albumId);
    }, [albumId]);

    return (
        <div className="album-container">
            <h1 className="album-title">Album #{albumId}</h1>
            <div className="grid-container">
                {photos.length > 0 ? (
                    photos.map((photo) => (
                        <div key={photo.id} className="album-item">
                            <Photo photo={photo} />
                        </div>
                    ))
                ) : (
                    <p>Não há fotos</p>
                )}
            </div>
        </div>
    );
};

export default Album;
