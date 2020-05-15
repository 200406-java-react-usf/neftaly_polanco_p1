import { User } from '../dtos/user';
import { ERSClient } from './ers-client';

export async function authenticate(username: string, password: string): Promise<User> {
    let response = await ERSClient.post('/auth', {username, password});
    return await response.data;
}

export async function invalidateSession() {
    return await ERSClient.get('/auth');
}