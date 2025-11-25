import Constants from 'expo-constants';
const { apiUrl } = Constants.expoConfig?.extra || {};

export async function getOrders(user: string | null): Promise<any[]> {
    console.log(user);
    try {
        const options = {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${user.token}`,
          }
        };
        const response = await fetch(`${apiUrl}/api/orders`, options);
        if (!response.ok) {
          return Promise.reject('Erro ao obter os pedidos');
        }
        const data = await response.json();
        console.log(data);
        return data;
    }
    catch (error) {
        console.error(error);
        return Promise.reject('Erro ao obter pedidos');
    }
}

export async function updateOrderStatus(orderId: number, status: string, user: string | null):Promise<any[]> {
    try {
        const options = {
          method: 'PATCH',
          headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${user.token}`,
          },
          body: JSON.stringify({status}),
        };
        const response = await fetch(`${apiUrl}/api/orders/${orderId}`, options
        );
        if (!response.ok) {
          throw new Error('Erro ao atualizar o status do pedido');
        }
        const data = await response.json();
        console.log(data);
        return data;

    }
    catch (error) {
        console.error(error);
        return Promise.reject('Erro ao atualizar o status do pedido');
    }
}