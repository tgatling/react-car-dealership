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
            {viewUserCars===false &&(
            <button className='btn btn-outline-info tab' onClick={()=>{changeView(true)}}>View Your Cars</button>
            )}

            {viewUserCars===true &&(
                <div>
                    <button className='btn btn-outline-info tab' onClick={()=>{changeView(false)}}>Hide Your Cars</button>
                    <TableComponent owner={user.username}/>
                </div>
            )}
            <br></br>
            <br></br>
            <p className='tab'>Our Car Lot</p>
            <TableComponent owner={'Dealer'} />
            
        </div>
    );
}

export default HomeComponent;