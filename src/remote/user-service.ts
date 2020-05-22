import { User } from '../dtos/user';
import { ERSClient } from './ers-client';
import { NewUser } from '../dtos/new-user';

export async function register(newUser: NewUser) {
    let response = await ERSClient.post('/users', newUser);
    return await response.data;
}

export async function getUsers() {
    let response = await ERSClient.get('/users');
    return await response.data;
}

export async function getUserById(id: number) {
    let response = await ERSClient.get(`/users/${id}`);
    return await response.data;
}

export async function getUserByUniqueKey(key: string, value: string) {
    let response = await ERSClient.get(`/users?${key}=${value}`);
    return await response.data;
}

export async function updateUser(updatedUser: User) {
    let response = await ERSClient.put('/users', updatedUser);
    return await response.data;
}

export async function deleteUserById(id: number) {
    await ERSClient.delete(`/users/${id}`);
    return true;
}

export async function logout() {
    let response = await ERSClient.get('/auth');
    console.log(`response data: ${response.data}`)
    return await response.data;
}
