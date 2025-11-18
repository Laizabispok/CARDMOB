import React, { useContext, useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, FlatList} from 'react-native';

import Constants from 'expo-constants';  // novo

import { useShop } from "../../contexts/ShopContext";

const OrderInfoScreen = ({navigation}: any) => {
    const { orderInfo } = useShop();
    const [orderData, setOrderData ] = useState<any[]>([]);
    const { apiUrl } = Constants.expoConfig?.extra || {}; // novo

    const loadOrder = () => {
        console.log(orderInfo);
        if (orderInfo.id) {
            const lastOrder = [
                {label: '', value: orderInfo.status, isStatus: true},
                {label: 'Nome', value: orderInfo.customerName},
                {label: 'Endereço de entrega', value: orderInfo.customerAddress},
                {label: 'Total', value: `R$ ${orderInfo.totalPrice.toFixed(2)}`},
                ...orderInfo.orderOffering.map((item: any) => ({
                    label: item.offering.name,
                    value: `x${item.quantity} - subtotal: R$ ${item.subtotal.toFixed(2)}`,
                    image: `${apiUrl}/${item.offering.image}`,
                    isOrderItem: true,
                }))
            ];
            setOrderData(lastOrder);
        }
    }
    useEffect(() => {
        loadOrder();
    }, []);

    const renderItem = ({item}: any) => {
        if (item.isOrderItem) {
            return (
                <View style={styles.itemRow}>
                    <Image source={{ uri: item.image }} style={styles.itemImage} />
                    <View style={styles.itemInfo}>
                        <Text style={styles.itemName}>
                            {item.label} ({item.value})
                        </Text>
                    </View>
                </View>
            );
        }

        return (
            <View style={styles.infoRow}>
                <Text style={styles.label}>
                    {item.label}
                </Text>
                <Text style={item.isStatus ? styles.statusValue : styles.value}>{item.value}</Text>
            </View>
        );
    }

    return ( 
        <View style={styles.container}>
            {orderInfo.id ? (
                <View> 
                    <Text style={styles.title}>
                        Nº {orderInfo.id}
                    </Text>
                    <FlatList 
                        data={orderData}
                        renderItem={renderItem}
                        keyExtractor={(item: any, index: number) => index.toString()}
                        contentContainerStyle={styles.container}
                    />
                </View>
            ) : (
                <View style={styles.infoRow}>
                    <Text style={styles.title}>
                        Nenhum pedido encontrado.
                    </Text>
                </View>
            )}
        </View>
    );
}
export default OrderInfoScreen;

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 4,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    itemImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 10,
    },
    itemInfo: {
        flex: 1,
    },
    itemName: {
        fontWeight: 'bold'
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
        paddingVertical: 4
    },
    label: {
        fontWeight: 'bold',
    },
    value: {},
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    statusValue: {
        flex: 1,
        textAlign: 'left',
        fontWeight: 'bold',
        color: 'orange',
        backgroundColor: '#fff3cd',
        padding: 4,
        borderRadius: 5,
    },
});