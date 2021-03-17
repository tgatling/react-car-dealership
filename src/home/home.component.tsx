import React from 'react';
//import {useSelector} from 'react-redux';
import TableComponent from '../car/table.component';
//import {UserState} from '../redux/store';

function HomeComponent(){
    //let userSelector = (state: UserState) => state.user;
    //let user = useSelector(userSelector);
    

    return(
        <div>
            <p>Home Page</p>
            <TableComponent></TableComponent>
        </div>
    );
}

export default HomeComponent;