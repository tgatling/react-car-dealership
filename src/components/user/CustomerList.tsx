import React, { useEffect, useState } from 'react';
import { User } from '../../models/user';
import userService from '../../services/user.service';
import CustomerItem from './CustomerItem';
import { MASTER_ACCOUNT } from '../../models/constants';
import searchUserIcon from '../../images/icons/search-user-icon.png';
import styles from './Customers.module.css';

interface listProp {
  displayMaster?: boolean;
}

const CustomerList = ({ displayMaster = false }: listProp) => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  //   const [filteredUser, setFilteredUser] = useState([]);

  useEffect(() => {
    userService
      .getUserRoles()
      .then((response) => {
        let loadedUsers: User[] = [];
        for (const key in response) {
          loadedUsers.push({
            userId: response[key].userId,
            username: response[key].username,
            firstName: response[key]?.firstName,
            lastName: response[key].lastName,
            email: response[key].email,
            phoneNumber: response[key].phoneNumber,
            address: response[key].address,
            city: response[key].city,
            state: response[key].state,
            zip: response[key].zip,
            userRole: response[key].userRole,
          });
        }

        if (!displayMaster) {
          loadedUsers = loadedUsers.filter(
            (user) => user.email !== MASTER_ACCOUNT
          );
        }

        setUsers(loadedUsers);
      })
      .catch((error) => error);
  }, [displayMaster]);

  const searchUser = () => {
    console.log(search);
  };

  return (
    <div className={styles.list}>
      <div className={styles.searchBase}>
        <div className={styles.searchBar}>
          <input
            placeholder='Search User'
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <img src={searchUserIcon} alt='' onClick={searchUser} />
        </div>
      </div>
      {users.map((user) => {
        return (
          <div key={user.userId}>
            <CustomerItem user={user} />
          </div>
        );
      })}
    </div>
  );
};

export default CustomerList;
