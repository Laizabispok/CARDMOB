import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';

const CatalogCard = ({product, onBuyPress}: any) => {
    return (
        <View style={styles.card}>
            <Image  
                source={{ uri: product.image }}
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
    image: {},
    details: {},
    name: {},
    description: {},
    price: {},
    buttonsContainer: {}
});