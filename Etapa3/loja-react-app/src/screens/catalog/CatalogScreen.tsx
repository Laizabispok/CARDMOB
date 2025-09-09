import React, { useContext } from "react";
import { View, Text, FlatList, StyleSheet} from 'react-native';

import CatalogCard from "./CatalogCard";

// Todo: importar o serviço de recuperação do catalog

const CatalogScreen = ({navigation} : any) => {

    const handleBuyPress = (product : any) => {
        // 1 - Adicionar ao carrinho
        // 2 - Ir para a tela do carrinho
        console.log(product);
    };

    const renderItem = ({ product }: any) => (
        <CatalogCard 
            product={product}
            onBuyPress={() => handleBuyPress(product)}
        />
    );

    return (
        <View style={styles.container}>
            <Text>Menu</Text>
            <FlatList 
                data={[]}
                renderItem={renderItem}
                keyExtractor={(item: any) => item.id}
            />
        </View>
    );
};

export default CatalogScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#F8F8F8',
    }
});