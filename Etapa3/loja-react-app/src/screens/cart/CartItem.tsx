import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

import { useShop } from "../../contexts/ShopContext";

const CartItem = ({ item }: any) => {
    // @todo implementar o context para persistir dados do carrinho.
    const { addToCart } = useShop();

    const handleRemove = () => {
        console.log('exclui produto');
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View>
                <Text style={styles.name}>{item.name}</Text>
                <View style={styles.quantity}>
                    <Text style={styles.price}>R$ {(item.price * item.quantity).toFixed(2)}</Text>
                    <TouchableOpacity onPress={() => addToCart(item)} style={styles.button}>
                        <Text style={styles.buttonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityValue}>{item.quantity}</Text>

                    <TouchableOpacity onPress={() => addToCart(item)} style={styles.button}>
                        <Text style={styles.buttonText}>+</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handleRemove()} style={styles.button}>
                        <Text style={styles.buttonText}>Remover</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

}
export default CartItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    image: {
        width: '50%',
        height: 100,
        borderRadius: 8,
        borderColor: '#ddd',
    },
    name: {},
    quantity: {},
    price: {},
    button: {},
    buttonText: {},
    quantityValue: {},

});