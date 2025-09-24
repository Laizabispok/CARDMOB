import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

import CartItem from './CartItem';

import { useShop } from '../../contexts/ShopContext';

const CartScreen = ({ navigation }: any) => {
    const { cartItems } = useShop();

    const renderItem = ({item} : any) => (
        <CartItem item={item} />
    );

    const cartTemp = [
        { 
            id: 1,
            quantity: 2,
            price: 8.5,
            name: "Brigadeiro promoção especial",
            image: "http://10.81.205.50:5000/uploads/brigadeiro-matcha-white.png",
        }
    ];

    return (
        <View> 
            <Text>Carrinho de compras</Text>
            <FlatList 
                data={cartItems}
                renderItem={renderItem}
                keyExtractor={(item: any) => item.id.toString()}
            />
        </View>
    );
};
export default CartScreen;