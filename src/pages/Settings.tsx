import React from 'react';
import {useSelector, RootStateOrAny} from 'react-redux';
import Profile from '../components/settings/Profile';

const Settings = () => {
    const currentUser = useSelector((state: RootStateOrAny)=> state.user.currentUser);
    const user = JSON.parse(currentUser);

    console.log(user);

    return (
        <div style={{margin: '40px 80px 0 80px'}}>
            <h1>Account Settings</h1>
            <Profile user={user}/>
        </div>
    );
};

export default Settings;