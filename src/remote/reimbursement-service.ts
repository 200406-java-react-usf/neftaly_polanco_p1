import { Reimbursement } from '../dtos/reimbursement';
import { ERSClient } from './ers-client';
import { NewReimbursement } from '../dtos/new-reimbursement';

export async function addReimbursement(newReimb: NewReimbursement) {
    let response = await ERSClient.post('/reimbursements', newReimb);
    return await response.data;
}


export async function getReimbursements() {
    let response = await ERSClient.get('/reimbursements');
    return await response.data;}

export async function getReimbursementById(id: number) {
    let response = await ERSClient.get(`/reimbursements/${id}`);
    return await response.data;
}

export async function getReimbursementByUniqueKey(key: string, value: string) {
    let response = await ERSClient.get(`/reimbursements?${key}=${value}`);
    return await response.data;
}

export async function updateReimbursement(updatedReimbursement: Reimbursement) {
    let response = await ERSClient.put('/reimbursements', updatedReimbursement);
    return await response.data;
}

// export async function deleteReimbursementById(id: number) {
//     let response = await ERSClient.delete(`/reimbursements/${id}`);
//     return true;
// }
