import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";

import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";

import { requestProfileById } from "../../services/profileService";

function ProfileScreen({ navigation }: any) {
    const { theme, toggleTheme } = useTheme();
    const { logout, userData } = useAuth();

    const [user, setUser] = useState({
        image: "",
        name: "",
        email: ""
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                console.log(userData);
                const profileData = await requestProfileById(userData?.id);
                console.log(profileData);
                setUser(profileData);
                console.log("Carregou o usuário!");
            } catch (error) {
                console.error("Erro ao carregar o perfil do usuário:", error);
            }
        };

        fetchProfile();
    }, [userData?.id]);

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Text style={{ color: theme.colors.text, marginBottom: theme.spacing(1) }}>
                Profile Screen
            </Text>

            <View>
                <Image
                    source={{ uri: user.image || "https://via.placeholder.com/100" }}
                    style={styles.image}
                />
            </View>

            <Text style={[styles.text, { color: theme.colors.text }]}>{user.name}</Text>
            <Text style={[styles.text, { color: theme.colors.text }]}>{user.email}</Text>

            <Button
                title="Alternar Tema"
                color={theme.colors.primary}
                onPress={toggleTheme}
            />

            <Button 
                title="Ir para Detalhes" 
                onPress={() => navigation.navigate("Details")} 
            />

            <Button title="Sair" onPress={logout} />
        </View>
    );
}

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        height: 100,
        width: 100
    },
    text: {
        fontSize: 14
    }
});
