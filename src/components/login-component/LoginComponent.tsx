import React, { useState } from 'react';
import { User } from '../../dtos/user';
import { 
    Typography,
    FormControl, 
    InputLabel, 
    Input, 
    Button,
    makeStyles
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Redirect } from 'react-router';


export interface ILoginProps {
    authUser: User;
    loginAction: (username: string, password: string) => void;
}

const useStyles = makeStyles({
    loginContainer: {
        display: 'flex',
        justifyContent: 'center',
        margin: 20,
        marginTop: 40,
        padding: 20
    },
    loginForm: {
        width: '50%'
    }
});

const LoginComponent = (props: ILoginProps) => {

    const classes = useStyles();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    let updateFormField = (e: any) => {
        switch (e.currentTarget.id) {
            case 'username':
                setUsername(e.currentTarget.value);
                break;
            case 'password':
                setPassword(e.currentTarget.value);
                break;
            default:
                console.warn(`Improper binding detected on element with id: ${e.currentTarget.id}!`)
        }
    }

    let login = async () => {
        props.loginAction(username, password);
    }
    return (
        props.authUser ? <Redirect to='home' /> :
        <div className={classes.loginContainer}>
            <form className={classes.loginForm}>
                <Typography align='center' variant='h4'>Login into Expense Reimbursement System!</Typography>

                <FormControl margin='normal' fullWidth>
                    <InputLabel htmlFor='username'>Username</InputLabel>
                    <Input
                        onChange={updateFormField}
                        value={username}
                        id='username' type='text'
                        placeholder='Enter your username'/>
                </FormControl>

                <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input 
                        onChange={updateFormField}
                        value={password}
                        id="password" type="password"
                        placeholder="Enter your password"/>
                </FormControl>
                <br/><br/>

                <Button 
                    onClick={login} 
                    variant="contained" 
                    color="primary" 
                    size="medium">Login
                </Button>
                <br/><br/>
                
            </form>
        </div>
    );
}

export default LoginComponent;