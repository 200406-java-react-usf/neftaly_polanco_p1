import React, { useState } from 'react';
import { Typography, FormControl, InputLabel, Input, Button, makeStyles } from '@material-ui/core';
import { Redirect } from 'react-router';
import { Alert } from '@material-ui/lab';
import { NewUser } from '../../dtos/new-user';
import { User } from '../../dtos/user';
import { NewReimbursement } from '../../dtos/new-reimbursement';

export interface IAddReimbursementProps {
    authUser: User | undefined;
    errorMessage: string;
    addReimbursementAction: (newReimbursement: NewReimbursement) => void;
}

const useStyles = makeStyles({
    addReimbursementContainer: {
        display: 'flex',
        justifyContent: 'center',
        margin: 20,
        marginTop: 40,
        padding: 20
    },
    addReimbursementForm: {
        width: '50%'
    }
});

const addReimbursementComponent = (props: IAddReimbursementProps) => {

    const classes = useStyles();

    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState('');
    const [author, setAuthor] = useState('');
    const [reimbType, setReimbType] = useState('');

    let updateFormField = (e: any) => {
        switch (e.currentTarget.id) {
            case 'amount':
                setAmount(e.target.value);
                break;
            case 'description':
                setDescription(e.target.value);
                break;
            case 'author':
                setAuthor(e.target.value);
                break;
            case 'reimbType':
                setReimbType(e.target.value);
                break;
            default:
                console.warn(`Improper binding detected on element with id: ${e.currentTarget.id}`);
        }
    }

    let addNewReimbursement = async () => {
        props.addReimbursementAction(new NewReimbursement(amount, description, author, reimbType));
    }

    return (
        props.authUser ? <Redirect to='/home' /> :
        <div className={classes.addReimbursementContainer}>
            
            <form className={classes.addReimbursementForm}>
                <Typography align='center' variant='h4'>addReimbursement for Revaboards!</Typography>

                <FormControl margin='normal' fullWidth>
                    <InputLabel htmlFor='amount'>Amount</InputLabel>
                    <Input 
                        onChange={updateFormField} 
                        value={amount} 
                        id='amount' type='text' 
                        placeholder='Enter Reimbursement Amount' />
                </FormControl>

                <FormControl margin='normal' fullWidth>
                    <InputLabel htmlFor='description'>Description</InputLabel>
                    <Input 
                        onChange={updateFormField} 
                        value={description} 
                        id='description' type='text' 
                        placeholder='Provide Description for Reimbursement' />
                </FormControl>

                <FormControl margin='normal' fullWidth>
                    <InputLabel htmlFor='author'>Author</InputLabel>
                    <Input 
                        onChange={updateFormField} 
                        value={author} 
                        id='author' type='text' 
                        placeholder='Enter your Username' />
                </FormControl>

                <FormControl margin='normal' fullWidth>
                    <InputLabel htmlFor='reimbType'>Type of Reimbursement</InputLabel>
                    <Input 
                        onChange={updateFormField} 
                        value={reimbType} 
                        id='reimbType' type='text' 
                        placeholder='Provide category of the Reimbursement' />
                </FormControl>

                <br/><br/>
                <Button 
                    onClick={addNewReimbursement} 
                    variant='contained' 
                    color='primary' 
                    size='medium'>addReimbursement
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
    );

}

export default addReimbursementComponent;