import React, { useState } from 'react';
import { 
    Typography,
    FormControl, 
    InputLabel, 
    Input, 
    Button, 
    makeStyles
    } from '@material-ui/core';
import { Redirect } from 'react-router';
import { Alert } from '@material-ui/lab';
import { NewUser } from '../../dtos/new-user';
import { User } from '../../dtos/user';

export interface IRegisterProps {
    authUser: User | undefined;
    errorMessage: string;
    registerAction: (newUser: NewUser) => void;
}

const useStyles = makeStyles({
    registerContainer: {
        display: 'flex',
        justifyContent: 'center',
        margin: 20,
        marginTop: 40,
        padding: 20
    },

    registerForm: {
        width: '50%'
    }
});

const RegisterComponent = (props: IRegisterProps) => {

    const classes = useStyles();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [role_name, setRole] = useState('');
    

    let updateFormField = (e: any) => {
        switch (e.currentTarget.id) {
            case 'username':
                setUsername(e.target.value);
                break;
            case 'password':
                setPassword(e.target.value);
                break;
            case 'firstName':
                setFirstName(e.target.value);
                break;
            case 'lastName':
                setLastName(e.target.value);
                break;
            case 'email':
                setEmail(e.target.value);
                break;
            case 'role_name':
                setRole(e.target.value);
                break;
            
            default:
                console.warn(`Improper binding detected on element with id: ${e.currentTarget.id}`);
        }
    }

    let addUser = async () => {
        props.registerAction(new NewUser(username, password, firstName, lastName, email, role_name));
    }
        //console.log(props.authUser.role_name);
    return (
        (!props.authUser || props.authUser.role_name !== 'ADMIN') ? <Redirect to='/home' /> :
        <>
        <h1>{props.authUser.role_name}</h1>
        <div className={classes.registerContainer}>            
            <form className={classes.registerForm}>
                <Typography align='center' variant='h4'>Register for Revaboards!</Typography>

                <FormControl margin='normal' fullWidth>
                    <InputLabel htmlFor='username'>Username</InputLabel>
                    <Input 
                        onChange={updateFormField} 
                        value={username} 
                        id='username' type='text' 
                        placeholder='Enter your username' />
                </FormControl>

                <FormControl margin='normal' fullWidth>
                    <InputLabel htmlFor='password'>Password</InputLabel>
                    <Input 
                        onChange={updateFormField}
                        value={password}
                        id='password' type='password'
                        placeholder='Enter your password'/>
                </FormControl>

                <FormControl margin='normal' fullWidth>
                    <InputLabel htmlFor='firstName'>First Name</InputLabel>
                    <Input 
                        onChange={updateFormField} 
                        value={firstName} 
                        id='firstName' type='text' 
                        placeholder='Enter your first name' />
                </FormControl>

                <FormControl margin='normal' fullWidth>
                    <InputLabel htmlFor='lastName'>Last Name</InputLabel>
                    <Input 
                        onChange={updateFormField} 
                        value={lastName} 
                        id='lastName' type='text' 
                        placeholder='Enter your last name' />
                </FormControl>

                <FormControl margin='normal' fullWidth>
                    <InputLabel htmlFor='email'>Email Address</InputLabel>
                    <Input 
                        onChange={updateFormField} 
                        value={email} 
                        id='email' type='text' 
                        placeholder='Enter your email address' />
                </FormControl>

                <FormControl margin='normal' fullWidth>
                    <InputLabel htmlFor='role_name'>Enter a Role Name</InputLabel>
                    <Input 
                        onChange={updateFormField} 
                        value={role_name} 
                        id='role_name' type='text' 
                        placeholder='Enter a Role Name' />
                </FormControl> 

                <br/><br/>

                <Button 
                    onClick={addUser} 
                    variant='contained' 
                    color='primary' 
                    size='medium'>
                    Register
                </Button>
                <br/><br/>
                {
                    props.errorMessage 
                        ? 
                    <Alert severity='error'>{props.errorMessage}</Alert>
                        :
                    <></>
                }
            </form>
        </div>
        </>
    );

}

export default RegisterComponent;