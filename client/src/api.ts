import {serverUrl} from './config';
import {UserI} from './types';

enum UserEndpoint {
  LOGIN = 'login',
  REGISTER = 'register'
}

interface UserResponse {
  id?: string,
  error?: string
}

async function userApi(values: UserI, endpoint: UserEndpoint): Promise<UserResponse> {
  try {
    const res = await fetch(serverUrl+'/user/'+endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    });
    const userResponse: UserResponse = await res.json();
    return userResponse; 
  }catch(e) {
    console.log(e);
    return {
      error: 'Il servizio non è al momento disponibile!',
    }
  }
}

export {
  userApi,
  UserEndpoint
}