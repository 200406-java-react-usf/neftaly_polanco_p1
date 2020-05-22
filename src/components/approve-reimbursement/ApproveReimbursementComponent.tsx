import React, { useState, useEffect } from 'react';
import { Reimbursement } from '../../dtos/reimbursement';
import { makeStyles } from '@material-ui/core';
import MaterialTable, { Column } from 'material-table';
import { Alert } from '@material-ui/lab';
import { Redirect } from 'react-router';
import { User } from '../../dtos/user';
import { getReimbursements, updateReimbursement, addReimbursement } from '../../remote/reimbursement-service';

interface IReimbProps {
    authUser: User | undefined;
    errorMessage: string;
    
}
interface TableState {
    columns: Array<Column<Reimbursement>>;
    data: Reimbursement[];
  }


const useStyles = makeStyles({
    ReimbContainer: {
        display: 'flex',
        justifyContent: 'center',
        margin: 20,
        marginTop: 40,
        padding: 20
    },

    ReimbTable: {
        width: '50%'
    }
});

 const AppReimbComponent = (props: IReimbProps) => {

    const classes = useStyles();
    const [reimbs, setReimbsData] = useState([new Reimbursement(0, 0, '', '', '', '', '', '', '', '')]);
    const[errorMessage, setErrorMessage] = useState('');

    

    const [state, setState] = useState<TableState>({
        columns: [
          { title: 'Id', field: 'id', editable: 'never'},
          { title: 'Amount', field: 'amount', editable: 'never', type: 'currency', cellStyle: {textAlign: 'left'} },
          { title: 'Submitted (Time)', field: 'submitted' , editable: 'never', type: 'datetime'},
          { title: 'Resolved (Time)', field: 'resolved', editable: 'never', type: 'datetime'},
          { title: 'Description', field: 'description' , editable: 'never'},
          { title: 'Receipt', field: 'receipt' , editable: 'never'},
          { title: 'Author', field: 'author' , editable: 'never'},
          { title: 'Resolver', field: 'resolver', editable: 'never' },
          { title: 'Status', field: 'reimb_status', editable: 'never', editComponent:((props) => 
          (<select value={props.value || ''} onChange={e => props.onChange(e.target.value)} >
            <option value={'DENIED'}>Denied</option>
            <option value={'PENDING'}>Pending</option>
            <option value={'APPROVED'}>Approved</option>
            </select>)) },
          { title: 'Reimb Type', field: 'reimb_type', editable: 'never'}
           
        ],
        data: [],
      });


    let  getReimbs = async() => {
        let result = await getReimbursements();
        setReimbsData(result);
    }
    
    const updateRow = async (updatedReimb: Reimbursement) => {
        try {
            await updateReimbursement(updatedReimb);
            getReimbs();
        } catch(e) {
            setErrorMessage(e.response.data.reason)
        }
    }

    const addNewReimb = async (newReimb: Reimbursement) => {
        try {
            await addNewReimb(newReimb);
            getReimbs();
        } catch (e) {
            setErrorMessage(e.response.data.reason)
        }
    }

    useEffect(() => {
        getReimbs();
    }, []);
    

    return (
        !props.authUser ? <Redirect to='/login' />:
        <>
        <div className={classes.ReimbContainer}>


            <MaterialTable

            title = "ERS Reimbursements"
            columns={state.columns}
            data = {reimbs}            
            editable= {{
                onRowUpdate: (newData) =>
                new Promise((resolve) =>{
                    resolve();
                    updateRow(newData);
                })
            }}
            />
            {
                props.errorMessage ?
                <Alert severity='error'>{props.errorMessage}</Alert>:
                <></>
            }
        
        </ div> 
        </>
   )
}
export default AppReimbComponent;



