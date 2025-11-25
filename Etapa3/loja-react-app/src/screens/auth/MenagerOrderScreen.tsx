import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, FlatList, SafeAreaView } from "react-native";

import { useAuth } from "../../contexts/AuthContext";
import { getOrders, updateOrderStatus } from "../../services/orderService";

function ManagerOrdersScreen({ navigation }: any) {
  const { user, userData } = useAuth();
  const [ordersInfo, setOrdersInfo] = useState<any[]>([]);

  const loadOrders = async () => {
    try {
      const orders = await getOrders(user);
      console.log(orders);
      setOrdersInfo(orders);
    } catch (error) {
      console.log("Erro ao carregar pedidos:", error);
    }
  };

  useEffect(() => {
    if (!userData?.is_admin) {
      navigation.navigate("OrderInfo");
      return;
    }
    loadOrders();
  }, [userData?.is_admin]);

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.customerName}</Text>
      <Text style={styles.statusValue}>{item.status}</Text>

      <Text style={styles.label}>Endereço de entrega: {item.customerAddress}</Text>
      <Text style={styles.label}>Telefone: {item.customerPhone}</Text>
      <Text style={styles.label}>Total: R$ {item.totalPrice?.toFixed(2)}</Text>

      <Text style={styles.label}>
        Data:{" "}
        {new Date(item.createdAt).toLocaleDateString("pt-BR", {
          timeZone: "America/Sao_Paulo",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Text>

      <Text style={styles.itemHeader}>Produtos:</Text>

      {item?.orderOffering?.length > 0 ? (
        item.orderOffering.map((orderItem: any, index: number) => (
          <View key={index} style={styles.itemContainer}>
            <Text style={styles.itemDetails}>
              {orderItem.offering.name} - x{orderItem.quantity} - R${" "}
              {orderItem.subtotal?.toFixed(2)}
            </Text>
          </View>
        ))
      ) : (
        <Text>Nenhum produto no pedido</Text>
      )}

      <View style={styles.buttonContainer}>
        {["Em Preparação", "A Caminho", "Entregue", "Cancelado"].map((title, index) => (
          <View key={index} style={styles.buttonWrapper}>
            <Button
              title={title}
              color="grey"
              onPress={async () => {
                await updateOrderStatus(item.id, title, user);
                loadOrders();
              }}
            />
          </View>
        ))}
      </View>
    </View>
  );

  if (!userData?.is_admin) return null;

  return (
    <SafeAreaView style={styles.container}>
      {ordersInfo?.orders ? (
        <FlatList
          data={ordersInfo.orders}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ padding: 10 }}
        />
      ) : (
        <View style={styles.infoRow}>
          <Text style={styles.title}>Nenhum pedido encontrado</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

export default ManagerOrdersScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  card: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
    marginVertical: 2,
  },
  itemHeader: {
    fontWeight: "bold",
  },
  statusValue: {
    fontWeight: "bold",
    color: "orange",
    backgroundColor: "#fff3cd",
    padding: 4,
    borderRadius: 5,
    marginBottom: 10,
  },
  itemContainer: {
    marginVertical: 4,
  },
  itemDetails: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
  },
  buttonWrapper: {
    width: "45%",
    marginBottom: 10,
  },
  infoRow: {
    fontSize: 18,
  },
});
