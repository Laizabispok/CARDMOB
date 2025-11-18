import Constants from 'expo-constants'; 

const { apiUrl } = Constants.expoConfig?.extra || {}; 

export async function fakeLogin(email: string, password: string): Promise<string> {
    if (email === 'teste@example.com' && password === '123') {
        return Promise.resolve('fake-jwt-token');
    }
    return Promise.reject('Credenciais inválidas');
}

export async function requestLogin(email: string, password: string): Promise<string> {
    console.log(apiUrl); 
      
        const response = await fetch(`${apiUrl}/api/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password}),
        });
        const data = await response.json();
        const jwt = data.accessToken;
        console.log(jwt);
        return Promise.resolve(jwt);
    }
    catch (error) {
        console.error(error);
        return Promise.reject(error);
       
}


export async function requestRegister(name: string, email: string, password: string): Promise<string> {
    try {
        const response = await fetch(`${apiUrl}/api/users`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, email, password}), 
        });
        const data = await response.json();
        const jwt = data.accessToken;
        console.log(jwt);
        return Promise.resolve(jwt);
    }
    catch (error) {
        console.error(error);
        return Promise.reject(error);
      
    }
}

export async function getTokenData(token: string | null): Promise<any[]> {
    try {
        if (!token) {
            return [];
        }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(atob(base64));
        return payload;
    } catch (error) {
        console.error(error);
        return Promise.reject('Token inválido.');
    }
}
