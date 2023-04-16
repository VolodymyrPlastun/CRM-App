import { List } from 'bootstrap-4-react';
import { useState, useEffect } from "react";
import { getData } from '../../firestoreApi';
import {  ListItem, ItemLabel, ListDivider } from './UsersList.styled';

const UsersList = () => {
    const [dataArr, setDataArr] = useState([]);

      useEffect(() =>{
        getData(setDataArr);
      }, []);

    return (
        <>
        {dataArr.map(item => {
            return (
<List key={item.id}>
{item.displayName && <ListItem> <ItemLabel>Name: </ItemLabel>{item.displayName}</ListItem>}
{item.name && <ListItem><ItemLabel>Name: </ItemLabel>{item.name}</ListItem>}
            {item.email && <ListItem><ItemLabel>Email: </ItemLabel>{item.email}</ListItem>}
            {item.phoneNumber && <ListItem><ItemLabel>Number: </ItemLabel>{item.phoneNumber}</ListItem>}
          
            <ListDivider/>
          </List>)})}

        </>
    )
};

export default UsersList;