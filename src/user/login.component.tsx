import React, { SyntheticEvent } from 'react';
import {Row} from 'react-bootstrap';
import userService from './user.service';
import { useHistory } from 'react-router-dom';
import { UserState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, loginAction } from '../redux/actions';
import '../home/styles.css';

function LoginComponent(){
    const userSelector = (state: UserState) => state.loginUser;
    const user = useSelector(userSelector);
    const dispatch = useDispatch();
    const history = useHistory();

    function handleFormInput(e: SyntheticEvent) {
        let u: any = { ...user };
        if((e.target as HTMLInputElement).name === 'username'){
            u.username = (e.target as HTMLInputElement).value;
        } else {
            u.password = (e.target as HTMLInputElement).value;
        }
        dispatch(loginAction(u));
    }
    function submitForm() {
        userService.login(user).then((returnUser) => {
            dispatch(getUser(returnUser));
            history.push('/');
        }).catch((err) => {
            console.log('error');
            alert('Incorrect Login.  Please Try Again.');
        });
    }
    return (
        <div className='container'>
            <br></br>
            <div className='col login card'>
                <br></br>  
                Username <input type='text' className='form-control' onChange={handleFormInput} name='username'/>
                <br/>
                Password <input type='password' className='form-control' onChange={handleFormInput} name='password'/>
                <br/>
                <Row>
                    <button className='btn btn-info tab' onClick={submitForm}>Login</button>
                    <button className='btn btn-outline-info tab'>Register for an Account!</button>
                </Row>
                <br></br>
            </div>
        </div>
    );
}

export default LoginComponent;