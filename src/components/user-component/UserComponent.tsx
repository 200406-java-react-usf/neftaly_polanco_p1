import React, { useState, useEffect } from 'react';
import { User } from '../../dtos/user';
import { makeStyles } from '@material-ui/core';
import MaterialTable, { Column } from 'material-table';
import { Alert } from '@material-ui/lab';
import { Redirect } from 'react-router';
import { getUsers, updateUser, register, deleteUserById } from '../../remote/user-service';
import { NewUser } from '../../dtos/new-user';

interface IUserProps {
    authUser: User | undefined;
    errorMessage: string;
    
}

interface TableState {
    columns: Array<Column<User>>;
    data: User[];
  }


const useStyles = makeStyles({
    UserContainer: {
        display: 'flex',
        justifyContent: 'center',
        margin: 20,
        marginTop: 40,
        padding: 20
    },

    UserTable: {
        marginTop: '20'
    }
});

 const UserComponent = (props: IUserProps) => {

    const classes = useStyles();
    const [users, setUsersData] = useState([new User(0, '', '', '', '', '', '')]);
    const[errorMessage, setErrorMessage] = useState('');

    const [state, setState] = useState<TableState>({
    columns: [
        {title: 'User Id', field: 'id', editable: 'never'},
        {title: 'Username', field: 'username', editable: 'always'},
        {title: 'First Name', field: 'first_name', editable: 'always'},
        {title: 'Last Name', field: 'last_name', editable: 'always'},
        {title: 'Email', field: 'email', editable: 'always'},               
        {title: 'Role', field: 'role_name', editComponent:((props) => 
        (<select value={props.value || ''} onChange={e => props.onChange(e.target.value)} >
          <option value={'ADMIN'}>Admin</option>
          <option value={'FINANCIAL MANAGER'}>Manager</option>
          <option value={'EMPLOYEE'}>Employee</option>
          <option value={'LOCKED'}>Locked</option>
          </select>)) }        
    ],
    data: [],
})

    let getAllUsers = async() => {
        let result = await getUsers();
        setUsersData(result);
    }
    
    const updateRow = async (updatedUser: User) => {
        try {
            await updateUser(updatedUser);
            getUsers();
        } catch(e) {
            setErrorMessage(e.response.data.reason)
        }
    }

    const addNewUser = async (newUser: NewUser) => {
        try {
            await register(newUser);
            getUsers();
        } catch (e) {
            setErrorMessage(e.response.data.reason)
        }
    }

    const deleteUser = async (id: number) => {
        try{
            await deleteUserById(id);
            getUsers();
        }catch(e){
            setErrorMessage(e.response.data.reason)
        }
    }

    useEffect(() => {
        getAllUsers();
    }, []);
    

    return (
        !props.authUser ? <Redirect to='/login' />:
        <div className={classes.UserContainer}>
            <MaterialTable

            title = "ERS Users"
            columns = {state.columns}
            data = {users}            
            editable= {{
               onRowAdd: newData =>
               new Promise((resolve) => {
                   addNewUser(newData);
                   resolve();
               }),

               onRowUpdate: (newData) =>
               new Promise((resolve) =>{
                   resolve();
                   updateRow(newData);
               }),

               onRowDelete: (oldData) =>
                new Promise(() =>{                    
                    deleteUser(oldData.id);
                })
            }}
            />
            {
                props.errorMessage ?
                <Alert severity='error'>{props.errorMessage}</Alert>:
                <></>
            }
        
        </ div> 
   )
}
export default UserComponent;



