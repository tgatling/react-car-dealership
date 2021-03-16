import React from 'react';
import {
    Route,
    BrowserRouter,
    Redirect,
    Link,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// REDUX
import { getUser } from '../redux/actions';
import { UserState } from '../redux/store';
//PAGE
import HomeComponent from '../home/home.component';
import ErrorBoundaryComponent from '../error.component';
//USER
import { User } from '../user/user';
import userService from '../user/user.service';
import LoginComponent from '../user/login.component';

export default function RouterComponent() {
    const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);
    const dispatch = useDispatch();

    function logout() {
        let loggedOut = new User();
        userService.logout().then(() => {
            dispatch(getUser(loggedOut));
        });
    }

    return (
        <BrowserRouter>
            <div>
                <header>
                    <nav id='nav'>
                        <ul className='nav bg-info'>
                            <li className='nav-item'>
                                <a
                                    className='nav-link active text-dark'
                                    href='/'
                                >
                                    HOME
                                </a>
                            </li>
                            <li className='nav-item'>
                                {user.username ? (
                                    <button
                                        className='nav-link active text-dark'
                                        onClick={logout}
                                    >
                                        LOGOUT
                                    </button>
                                ) : (
                                    <a
                                        className='nav-link active text-dark'
                                        href='/login'
                                    >
                                        LOGIN
                                    </a>
                                )}
                            </li>
                        </ul>
                    </nav>
                </header>
                <ErrorBoundaryComponent>
                    <Route exact path='/' component={HomeComponent}/>
                    <Route exact path='/login' component={LoginComponent}/>
                    
                </ErrorBoundaryComponent>
            </div>
        </BrowserRouter>
    );
}
