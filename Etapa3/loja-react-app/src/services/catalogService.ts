const API_URL = 'http://10.81.205.50:5000';


export async function getCatalog(): Promise<any[]> { 
    try {
        const response = await fetch(`${API_URL}/api/catalog`);
        const data = await response.json();
        
        
        return data.catalog; 
    }
    catch (error) {
        console.error(error);
        return Promise.reject('Erro ao obter produtos');
    }
}