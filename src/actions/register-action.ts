import { NewUser } from '../dtos/new-user';
import { Dispatch } from 'redux';
import { register } from '../remote/user-service';

export const registerActionTypes = {
    SUCCESSFUL_REGISTRATION: 'ERS_SUCCESSFUL_REGISTRATION',
    BAD_REQUEST: 'ERS_BAD_REQUEST',
    CONFLICT_ERROR: 'ERS_CONFLICT_ERROR',
    INTERNAL_SERVER_ERROR: 'ERS_INTERNAL_SERVER_ERROR'
}

export const registerAction = (newUser: NewUser) => async (dispatch: Dispatch) => {
    try {
        let registeredUser = await register(newUser);
        dispatch({
            type: registerActionTypes.SUCCESSFUL_REGISTRATION,
            payload: registeredUser
        });

    } catch (e) {
        let status = e.response.data.statusCode;
        if(status === 400) {
            dispatch({
                type: registerActionTypes.BAD_REQUEST,
                payload: e.response.data.message
            })
        } else if (status === 409) {
            dispatch({
                type: registerActionTypes.CONFLICT_ERROR,
                payload: e.response.data.reason
            });
        } else {
            dispatch({
                type:registerActionTypes.INTERNAL_SERVER_ERROR,
                payload: e.response.data.message || 'Uh oh! We could not reach the server!'                
            })
        }
    }
}