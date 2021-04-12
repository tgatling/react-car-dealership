import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import TableComponent from '../car/table.component';
import {UserState} from '../redux/store';

function HomeComponent(){
    let userSelector = (state: UserState) => state.user;
    let user = useSelector(userSelector);
    let [viewUserCars, setView] = useState(false);
    
    let changeView = (status: boolean) =>{
        setView(status);
    }

    return(
        <div>
            <br></br>
            <p className='tab'>Our Car Lot</p>
            <TableComponent owner={'Dealer'} />
            
        </div>
    );
}

export default HomeComponent;