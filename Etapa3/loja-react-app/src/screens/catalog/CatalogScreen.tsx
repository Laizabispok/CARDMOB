import React, { useState, useEffect } from "react"; // alterado
import { View, Text, FlatList, StyleSheet} from 'react-native';

import CatalogCard from "./CatalogCard";

// Todo: importar o serviço de recuperação do catalog
import { getCatalog } from '../../services/catalogService'; // novo

import { useShop } from "../../contexts/ShopContext";

const CatalogScreen = ({navigation} : any) => {
    const [catalog, setCatalog] = useState<any[]>([]); // novo
    const { addToCart } = useShop();

    // bloco novo
    useEffect(() => {
        const fetchCatalog = async () => {
            try {
                const data = await getCatalog();
                setCatalog(data);
            }
            catch (error) {
                console.error('Erro ao buscar o catálogo:', error);
            }
        };
        fetchCatalog();
        console.log(catalog);
    }, []);

    const handleBuyPress = (product : any) => {
        // 1 - Adicionar ao carrinho
        // 2 - Ir para a tela do carrinho
        addToCart(product);
        console.log(product);
    };

    const renderItem = ({ item }: any) => ( // alterado
        <CatalogCard 
            product={item} // alterado
            onBuyPress={() => handleBuyPress(item)} // alterado
        />
    );

    return (
        <View style={styles.container}>
            <Text>Menu</Text>
            <FlatList 
                data={catalog} // alterado
                renderItem={renderItem}
                keyExtractor={(item: any) => item.id.toString()} // alterado
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