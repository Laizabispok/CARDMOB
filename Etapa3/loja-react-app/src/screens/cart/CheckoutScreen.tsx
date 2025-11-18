import React, { useState, useContext } from "react";
import { 
    View,
    Text,
    TextInput,
    StyleSheet,
    Platform,
    ScrollView,
    KeyboardAvoidingView,
    Button,
} from "react-native";

import { useShop } from "../../contexts/ShopContext";
import { postOrder } from "../../services/catalogService";

const CheckoutScreen = ( {navigation}: any) => {
    const { getTotalPrice, clearCart, cartItems, lastOrderInfo } = useShop();
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [customer, setCustomer] = useState('');
    const [paymentOption, setPaymentOption] = useState('');

    const confirmOrder = async () => {
        const customerInfo = {
            customerName: customer,
            customerPhone: phone,
            customerAddress: address,
        }
        // enviar para o backend 
        // todo: implementar o serviço de "checkout"
        const orderInfo = await postOrder(customerInfo, cartItems);
        lastOrderInfo(orderInfo);
        alert('Pedido confirmado!');
        clearCart();
        console.log(customerInfo);
        // navigation.navigate('Catalog');
        // navigation.replace('Tabs', {screen: 'Catalog'});
        navigation.navigate('OrderInfo');
    }

    return (
        <KeyboardAvoidingView
            style={{flex: 1}}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView contentContainerStyle={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Telefone"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad" 
                />
                <TextInput 
                    style={styles.input}
                    placeholder="Nome completo"
                    value={customer}
                    onChangeText={setCustomer}
                />
                <TextInput 
                    style={styles.input}
                    placeholder="Endereço de entrega"
                    value={address}
                    onChangeText={setAddress}
                />
                <Text style={styles.label}>Forma de pagamento</Text>
                <View style={styles.paymentOption}>
                    <Button 
                        title="PIX"
                        onPress={() => setPaymentOption('PIX')}
                        color={paymentOption === 'PIX' ? '#007BFF' : '#DDD'}
                    />
                    <Button 
                        title="Cartão de débito"
                        onPress={() => setPaymentOption('Cartão de débito')}
                        color={paymentOption === 'Cartão de débito' ? '#007BFF' : '#DDD'}
                    />
                    <Button 
                        title="Cartão de crédito"
                        onPress={() => setPaymentOption('Cartão de crédito')}
                        color={paymentOption === 'Cartão de crédito' ? '#007BFF' : '#DDD'}
                    />
                </View>
                <Text style={styles.selectedPayment}>Pagar com: {paymentOption}</Text>
                <Text style={styles.totalText}>Total a pagar: R$ {getTotalPrice()}</Text>
                <Button 
                    title="Confirmar pedido"
                    onPress={confirmOrder}
                    color='#28A275'
                />
            </ScrollView>

        </KeyboardAvoidingView>
    );

}
export default CheckoutScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    totalText: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    label: {
        fontSize: 18,
        marginVertical: 10,
    },
    paymentOption: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    selectedPayment: {
        fontSize: 16,
        marginVertical: 10,
        textAlign: 'center'
    },
});