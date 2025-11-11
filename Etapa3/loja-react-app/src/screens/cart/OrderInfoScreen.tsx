import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import { useShop } from "../../contexts/ShopContext";

const OrderInfoScreen = ({ navigation }: any) => {
    const { orderInfo } = useShop();
    const [orderData, setOrderData] = useState<any[]>([]);

    const loadOrder = () => {
        console.log(orderInfo);

        if (orderInfo && orderInfo.id) {
            const lastOrder = [
                { label: "Status", value: orderInfo.status, isStatus: true },
                { label: "Nome", value: orderInfo.customerName },
                { label: "Endereço de entrega", value: orderInfo.customerAddress },
                { label: "Total", value: `R$ ${orderInfo.totalPrice?.toFixed(2) || "0.00"}` },
                ...(orderInfo.orderOffering?.map((item: any) => ({
                    label: item.offering.name,
                    value: `x${item.quantity} - subtotal: R$ ${item.subtotal?.toFixed(2) || "0.00"}`,
                    image: item.offering.image,
                    isOrderItem: true,
                })) || []),
            ];
            setOrderData(lastOrder);
        } else {
            setOrderData([]);
        }
    };

    useEffect(() => {
        loadOrder();
    }, [orderInfo]);

    const renderItem = ({ item }: any) => {
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
                {!!item.label && <Text style={styles.label}>{item.label}</Text>}
                <Text style={styles.value}>{item.value}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {orderInfo && orderInfo.id ? (
                <View>
                    <Text style={styles.title}>Nº {orderInfo.id}</Text>
                    <FlatList
                        data={orderData}
                        renderItem={renderItem}
                        keyExtractor={(_, index) => index.toString()}
                        contentContainerStyle={styles.listContainer}
                    />
                </View>
            ) : (
                <View style={styles.infoRow}>
                    <Text style={styles.title}>Nenhum pedido encontrado.</Text>
                </View>
            )}
        </View>
    );
};

export default OrderInfoScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 16,
    },
    listContainer: {
        paddingBottom: 20,
    },
    itemRow: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 8,
    },
    itemImage: {
        height: 80,
        width: 80,
        borderRadius: 8,
        marginRight: 12,
    },
    itemInfo: {
        flex: 1,
    },
    itemName: {
        fontSize: 16,
        color: "#333",
    },
    infoRow: {
        marginVertical: 6,
    },
    label: {
        fontWeight: "bold",
        fontSize: 14,
        color: "#555",
    },
    value: {
        fontSize: 14,
        color: "#333",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 12,
        color: "#000",
    },
});
