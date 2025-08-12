import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useTheme } from '../contexts/ThemeContext'; //NOVA

function HomeScreen() {
    const { theme, toggleTheme } = useTheme();
    return (
        <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
            <Text style={{ color: theme.colors.text, marginBottom: theme.spacing(1) }}>
                Home Screen
            </Text>
            <Button title="Alterar Tema" color={theme.colors.primary} 
            onPress={toggleTheme}/>
     </View>
    );


}
export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})