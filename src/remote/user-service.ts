import { User } from '../dtos/user';
import { ERSClient } from './ers-client';
import { NewUser } from '../dtos/new-user';

export async function register(newUser: NewUser) {
    let response = await ERSClient.post('/users', newUser);
    return await response.data;
}

export async function getUsers() {
    return await ERSClient.get('/users');
}

export async function getUserById(id: number) {
    return await ERSClient.get(`/users/${id}`);
}

export async function getUserByUniqueKey(key: string, value: string) {
    return await ERSClient.get(`/users?${key}=${value}`);
}

export async function updateUser(updatedUser: User) {
    return await ERSClient.put('/users', updatedUser);
}

export async function deleteUserById(id: number) {
    return await ERSClient.delete(`/users/${id}`);
}
