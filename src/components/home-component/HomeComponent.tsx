import React from 'react';
import { Redirect } from 'react-router';
import { User } from '../../dtos/user';
import { Button } from '@material-ui/core';

interface IHomeProps {
    authUser: User;
    logoutAction: () => void;
}

const HomeComponent = (props: IHomeProps) => {

    let logout = async () => {
        props.logoutAction();        
    }

    console.log(props.authUser)

    return (
        !props.authUser ? <Redirect to='/login' /> :
        <>
            <h1>
                Welcome, {props.authUser.username}!
            </h1>
            <br/><br/>
            <Button onClick={logout} variant="contained" color="inherit" size="medium">Logout</Button>
        </>
    );
}

export default HomeComponent;
