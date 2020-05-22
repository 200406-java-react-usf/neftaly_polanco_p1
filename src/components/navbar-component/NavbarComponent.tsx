import React, { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import { makeStyles, Typography } from '@material-ui/core';
import { User } from '../../dtos/user';

interface INavbarProps {
    authUser: User;
    errorMessage: string;
    logoutAction: () => void;
}

const useStyles = makeStyles({
    link: {
        textDecoration: 'none',
        color: 'white'
    },

    logoutButton: {
        background: 'red',
        border: 3,
        borderRadius: 5,
        boxShadow: '0 2% 4% 2% rgba(255, 105, 135, .3)',
        color: 'white',
        height: 20,
        padding: '2% 3%',
        marginLeft: 0
    }
});


const NavbarComponent = (props: INavbarProps) => {

    let logout = async () => {
        props.logoutAction();
        localStorage.clear();
    }

    const classes = useStyles();

    return (
        <div>
            <List component="nav">
                <ListItem component="div">
                    <Typography color="inherit" variant="h5">ERS</Typography>
                    {
                        props.authUser
                        ?
                        <>
                            <ListItemText inset>
                                <Typography color="inherit" variant="h6">
                                    <Link to="/home" className={classes.link}>Home</Link>
                                </Typography>
                            </ListItemText>
                        {
                            (props.authUser.role_name === 'EMPLOYEE') 
                            ?
                            <>
                                <ListItemText inset>
                                    <Typography color="inherit" variant="h6">
                                        <Link to="/reimbursements" className={classes.link}>Reimbursements</Link>
                                    </Typography>
                                </ListItemText>
                            </>
                            :
                            <></>
                        }

                        {
                            (props.authUser.role_name === 'ADMIN') 
                            ?
                            <>
                                <ListItemText inset>
                                    <Typography color="inherit" variant="h6">
                                        <Link to="/users" className={classes.link}>View All Users</Link>
                                    </Typography>
                                </ListItemText>

                                <ListItemText inset>
                                    <Typography color="inherit" variant="h6">
                                        <Link to="/register" className={classes.link}>Register a New User</Link>
                                    </Typography>
                                </ListItemText>
                            </>
                            :
                            <></>
                        }
                        {
                            (props.authUser.role_name === 'FINANCIAL MANAGER')
                            ?
                            <>
                                <ListItemText inset>
                                    <Typography color="inherit" variant="h6">
                                        <Link to="/reimbursements" className={classes.link}>View All Reimbursments</Link>
                                    </Typography>
                                </ListItemText>
                            </>
                            :
                            <></>
                        }

                            <ListItemText inset>
                                <Typography color="inherit" variant="h6">
                                    <span className={classes.link}>{props.authUser.username}</span>
                                </Typography>
                             </ListItemText>

                             
                            <ListItemText inset>
                                <Typography color="secondary" variant="h6">
                                    <Link to="/login" className={classes.logoutButton} onClick={logout}>Logout</Link>
                                </Typography>
                            </ListItemText>
                        </>
                        :
                        <></>
                    }                    

                    {
                        !props.authUser
                        ?
                        <>
                        <ListItemText inset>
                            <Typography color="inherit" variant="h6">
                                <Link to="/login" className={classes.link}>Login</Link>
                            </Typography>
                        </ListItemText>
                        </> 
                        :
                        <></>
                    }
                    

                </ListItem>
            </List>
        </div>
    );
}

export default NavbarComponent;