import { User } from '../dtos/user';
import { combineReducers } from 'redux';
import { loginReducer } from './login-reducer';
import { registerReducer } from './register-reducer';
import { addReimbursementReducer } from './addReimbursement-reducer'
import { Reimbursement } from '../dtos/reimbursement';
import { addReimbursement } from '../remote/reimbursement-service';
import { logoutReducer } from './logout-reducer';

export interface ILoginState {
    authUser: User;
    errorMessage: string;
}

export interface IAddReimbursementState {
    reimb: Reimbursement;
    errorMessage: string;
}

export interface IRegisterState {
    errorMessage: string;
}

export interface ILogoutState {
    errorMessage: string;
}

export interface IState {
    logout: ILogoutState;
    login: ILoginState;
    register: IRegisterState;
    addReimbursement: IAddReimbursementState;
}

export const state = combineReducers<IState>({
    login: loginReducer,
    logout: logoutReducer,
    register: registerReducer,
    addReimbursement: addReimbursementReducer
});