import Constants from "expo-constants";

const { apiUrl } = Constants.expoConfig?.extra || {};

export async function requestProfileById(id: number): Promise<any> {
    try {
        const response = await fetch(`${apiUrl}/api/users/${id}`);
        const data = await response.json(); 
        if (!data.image) {
            data.image = `${apiUrl}/uploads/placeholder.png`;
        }

        return data;
    } catch (error) {
        console.error('Erro ao buscar perfil:', error);
        throw error;
    }
}
