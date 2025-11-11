import Constants from 'expo-constants'; // novo

const { apiUrl } = Constants.expoConfig?.extra || {}; // novo

export async function getCatalog(): Promise<any[]> { // alterado
    try {
        // alterado
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

export async function postOrder(customer: any, cartItems: any):Promise<any[]> {
    try {
        // enviar para o backend.
        const orderData = {...customer, items: cartItems };
        const response = await fetch(`${apiUrl}/api/orders`,
          {        
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify(orderData),
          }
        );
        if (!response.ok) {
          throw new Error('Erro ao registrar o pedido');
        }
        const data = await response.json();
        console.log(data);
        return data;

    }
    catch (error) {
        console.error(error);
        return Promise.reject('Erro ao enviar o pedido');
    }
}