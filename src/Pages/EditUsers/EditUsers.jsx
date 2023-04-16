import { collection, addDoc, doc, deleteDoc } from 'firebase/firestore';
import {  db } from '../../firebase';
import { Form, Button, List } from 'bootstrap-4-react';
import { useState, useEffect } from "react";
import { getData } from '../../firestoreApi';
import { toast } from 'react-hot-toast';
import { FormBox, ListItem, Label, ListDivider, ItemLabel } from './EditUsers.styled';

const AddUser = () => {
  const [dataArr, setDataArr] = useState([]);
const [data, setData] = useState({
  email: '',
  name: '',
  age: 0,
})
  const database = collection(db, 'users');


  const AddUser = (evt) => {
    evt.preventDefault();
    addDoc(database, data)
    .then(() => {
      toast.success('User added successfully')
      getData(setDataArr);
    })
    .catch(err => {
      toast.error(err.message)
    })
  };

  const deleteData = (id) => {
    let deletedData = doc(db, 'users', id);
    deleteDoc(deletedData)
    .then(() => {
      toast.success('User deleted successfully');
      getData(setDataArr);
    })
    .catch(err => {
      toast.error(err.message)
    })
  }

  const inputChange = (evt) => {
    const inputs = {[evt.target.name] : evt.target.value};
    setData({...data, ...inputs});
    };

    useEffect(() =>{
      getData(setDataArr);
    }, []);

    return (
<>
<FormBox>
<Form.Group>
          <Label htmlFor="name">Name</Label>
          <Form.Input onChange={inputChange} name="name" type="text" id="name" placeholder="Name" />
        </Form.Group>
        <Form.Group>
          <Label htmlFor="email">Email address</Label>
          <Form.Input onChange={inputChange} name="email" type="email" id="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group>
          <Label htmlFor="age">Age</Label>
          <Form.Input onChange={inputChange} name="age" type="number" id="age" placeholder="Age" />
        </Form.Group>
        <Button onClick={AddUser} info type="submit">Create user</Button>
      </FormBox>
      {dataArr && dataArr.map(item => {
        return (
          <List key={item.id}>
{item.displayName && <ListItem><ItemLabel>Name:</ItemLabel> {item.displayName}</ListItem>}
            {item.name && <ListItem><ItemLabel>Name:</ItemLabel> {item.name}</ListItem>}
            {item.email && <ListItem><ItemLabel>Email:</ItemLabel> {item.email}</ListItem>}
            {item.phoneNumber && <ListItem><ItemLabel>Number:</ItemLabel> {item.phoneNumber}</ListItem>}
            {item.age && <ListItem><ItemLabel>Age:</ItemLabel> {item.age}</ListItem>}
            {item.role && <ListItem><ItemLabel>Role:</ItemLabel> {item.role}</ListItem>}
            <Button info onClick={() => deleteData(item.id)} type="submit">Delete</Button>
            <ListDivider/>
          </List>
        )
      })}
</>
    )
};

export default AddUser;