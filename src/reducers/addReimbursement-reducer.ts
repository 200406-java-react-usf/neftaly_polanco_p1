import { IAddReimbursementState, state } from '.'
import { AnyAction } from "redux"
import { addReimbursementActionTypes } from '../actions/addReimbursement-action'
//import { Reimbursement } from '../dtos/reimbursement'





const initialState: IAddReimbursementState = {
    // @ts-ignore
    reimb: (null as Reimbursement),
    errorMessage: ''
}

export const addReimbursementReducer = (state: IAddReimbursementState = initialState, action: AnyAction) => {
    switch (action.type) {
        case addReimbursementActionTypes.SUCCESSFUL_ADDITION:
            return {
                ...state,
                reimb: action.payload
            }

        case addReimbursementActionTypes.BAD_REQUEST:
        case addReimbursementActionTypes.INTERNAL_SERVER_ERROR:
            return {
                ...state,
                errorMessage: action.payload
            }
            
        default:
            return state;
    }
}