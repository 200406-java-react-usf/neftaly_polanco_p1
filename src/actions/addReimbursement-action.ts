import { Dispatch } from 'redux';
import { addReimbursement } from '../remote/reimbursement-service';
import { NewReimbursement } from '../dtos/new-reimbursement';

export const addReimbursementActionTypes = {
    SUCCESSFUL_ADDITION: 'ERS_SUCCESSFUL_ADDITION',
    BAD_REQUEST: 'ERS_BAD_REQUEST',
    INTERNAL_SERVER_ERROR: 'ERS_INTERNAL_SERVER_ERROR'
}

export const addReimbursementAction = (newReimbursement: NewReimbursement) => async (dispatch: Dispatch) => {
    try {
        let addedReimbursement = await addReimbursement(newReimbursement);
        dispatch({
            type: addReimbursementActionTypes.SUCCESSFUL_ADDITION,
            payload: addedReimbursement
        });
    } catch (e) {
        let status = e.response.data.statusCode;
        if(status === 400) {
            dispatch({
                type: addReimbursementActionTypes.BAD_REQUEST,
                payload: e.response.data.message
            })
        } else {
            dispatch({
                type:addReimbursementActionTypes.INTERNAL_SERVER_ERROR,
                payload: e.response.data.message || 'Uh oh! We could not reach the server!'                
            })
        }
    }
}