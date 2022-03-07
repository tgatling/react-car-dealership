import React, {useEffect, useState} from 'react';
import {useSelector, RootStateOrAny} from 'react-redux';
import CarTable from '../components/car/CarTable';

const UserCars = () => {
  const carState = useSelector((state: RootStateOrAny) => state.car);
  const currentUser = useSelector((state: RootStateOrAny) => state.user.currentUser);
  const [userId, setUserId] = useState('');
  
  useEffect(() => {
    if (currentUser) {
      let user = JSON.parse(currentUser);
      setUserId(user.userId);
    }

  }, [carState, currentUser]);
  

  return (
    <div>
      <CarTable editMode={false} cars={carState.cars} owner={userId} />
    </div>
  );
};

export default UserCars;
