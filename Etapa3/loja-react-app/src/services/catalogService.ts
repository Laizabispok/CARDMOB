import Constants from 'expo-constants'; 

const { apiUrl } = Constants.expoConfig?.extra || {}; 

export async function getCatalog(): Promise<any[]> { 
    try {
        
        const response = await fetch(`${apiUrl}/api/catalog`);
        const data = await response.json();
        // console.log(data);
        // return Promise.resolve(data.catalog);
        return data.catalog; // incluido / alterado
    }
    catch (error) {
        console.error(error);
        return Promise.reject('Erro ao obter produtos');
    }
}