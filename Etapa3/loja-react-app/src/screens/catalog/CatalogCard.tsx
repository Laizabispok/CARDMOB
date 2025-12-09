import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';

import { useShop } from '../../contexts/ShopContext';
import { useAuth } from '../../contexts/AuthContext';

const CatalogCard = ({product, onBuyPress}: any) => {
    const { pickImage }= useShop();
    const { userData } = useAuth();
    const [updatedImage, setUpdatedImage] = useState(product.image)

    const updateImage = async () => {
        const loadedImage = await pickImage();
        if (loadedImage) setUpdatedImage(loadedImage);
    }

    return (
        <View style={styles.card}>
            <Image  
                source={
                    updatedImage
                        ? { uri: updatedImage }
                        : { uri: product.image }
                }
                style={styles.image}
            />
            
            <View style={styles.details}>
                <Text style={styles.name}>{product.name}</Text>
                <Text style={styles.description}>{product.description}</Text>
                <Text style={styles.price}>R$ {product.price.toFixed(2)}</Text>
                <View style={styles.buttonsContainer}>
                        <Button 
                            title="Comprar"
                            color="#28A745"
                            onPress={onBuyPress}
                        />
                        {userData.is_admin ? (
                                <Button 
                                    title="Editar"
                                    color="#007BFF"
                                    onPress={updateImage}
                                />
                            ) : null
                        }
                </View>
            </View>
        </View>
    );
}
export default CatalogCard;

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 15,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#ddd',
    },
    details: {
        paddingHorizontal: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
        color: '#555',
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#28A745',
        marginVertical: 10,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});