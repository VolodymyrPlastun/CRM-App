import { useEffect, useState } from "react";
import { getData } from "../../firestoreApi";
import { List, Form } from "bootstrap-4-react";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { toast } from 'react-hot-toast';
import {  ListItem, ListDivider, ItemLabel } from "./AddRole.styled";


const AddRole = () => {
    const [dataArr, setDataArr] = useState([]);

    useEffect(() =>{
        getData(setDataArr);
      }, []);

const updateData = (id, role) => {
                let updatedData = doc(db, 'users', id);
                updateDoc(updatedData, {
                    role,
                })
                .then(() => {
                  toast.success('Role added');
                  getData(setDataArr);
                })
                .catch(err => {
                  toast.error(err.message)
                })
              };

  return (
    <div>
      {dataArr.map(item => {
            return (
                <div key={item.id}>
         <Form.CustomSelect defaultValue="Choose Role" onChange={(evt) => updateData(item.id, evt.target.value)} sm mb="3">
         <option disabled>Choose Role</option>
          <option value="Driver">Driver</option>
          <option value="Passenger">Passenger</option>
          <option value="Dispatcher">Dispatcher</option>
        </Form.CustomSelect>
<List >
{item.displayName && <ListItem><ItemLabel>Name:</ItemLabel> {item.displayName}</ListItem>}
{item.name && <ListItem><ItemLabel>Name:</ItemLabel> {item.name}</ListItem>}
            {item.email && <ListItem><ItemLabel>Email:</ItemLabel> {item.email}</ListItem>}
            {item.phoneNumber && <ListItem><ItemLabel>Number:</ItemLabel> {item.phoneNumber}</ListItem>}
            {item.role && <ListItem><ItemLabel>Role:</ItemLabel> {item.role}</ListItem>}
            <ListDivider/>
          </List>
          </div>)})}
    </div>
  )
}

export default AddRole;
