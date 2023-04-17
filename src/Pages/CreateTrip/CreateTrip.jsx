import { db } from "../../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { Form, Button, List } from "bootstrap-4-react";
import { useState, useEffect, useCallback } from "react";
import { toast } from "react-hot-toast";
import { ListItem, ItemLabel, ListDivider, Btn, FormBox, Label } from "./CreateTrip.styled";

const CreateTrip = () => {
  const [dataArr, setDataArr] = useState([]);
  const [data, setData] = useState();
  const database = collection(db, "trips");

  const createTrip = (evt) => {
    evt.preventDefault();
    addDoc(database, data)
      .then(() => {
        toast.success("Trip created");
        getData(setDataArr);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const deleteData = (id) => {
    let deletedData = doc(db, "trips", id);
    deleteDoc(deletedData)
      .then(() => {
        toast.success("Trip deleted");
        getData(setDataArr);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const inputChange = (evt) => {
    const inputs = { [evt.target.name]: evt.target.value };
    setData({ ...data, ...inputs });
  };

  const getData = useCallback(async () => {
    const data = await getDocs(database);
    setDataArr(
      data.docs.map((item) => {
        return { ...item.data(), id: item.id };
      })
    );
  });

  const updateData = (id) => {
    let updatedData = doc(db, "trips", id);
    updateDoc(updatedData, {
      carNumber: data.carNumber,
      from: data.from,
      to: data.to,
      passengers: data.passengers,
    })
      .then(() => {
        toast.success("Trip updated");
        getData(setDataArr);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div>
      <FormBox>
        <Form.Group>
          <Label htmlFor="email">Car Namber</Label>
          <Form.Input
            onChange={inputChange}
            name="carNumber"
            type="text"
            id="email"
            placeholder="Enter car number"
          />
        </Form.Group>
        <Form.Group>
          <Label htmlFor="from">From</Label>
          <Form.Input
            onChange={inputChange}
            name="from"
            type="text"
            id="from"
            placeholder="Enter first point"
          />
        </Form.Group>
        <Form.Group>
          <Label htmlFor="to">To</Label>
          <Form.Input
            onChange={inputChange}
            name="to"
            type="text"
            id="to"
            placeholder="Enter second point"
          />
        </Form.Group>
        <Form.Group>
          <Label htmlFor="from">Number of passengers</Label>
          <Form.Input
            onChange={inputChange}
            name="passengers"
            type="number"
            id="from"
            placeholder="Enter number of passengers"
          />
        </Form.Group>

        <Button onClick={createTrip} info type="submit">
          Create trip
        </Button>
      </FormBox>
      {dataArr &&
        dataArr.map((item) => {
          return (
            <List key={item.id}>
              {item.carNumber && (
                <ListItem>
                  <ItemLabel>Car Number:</ItemLabel> {item.carNumber}
                </ListItem>
              )}
              {item.name && (
                <ListItem>
                  <ItemLabel>Name:</ItemLabel> {item.name}
                </ListItem>
              )}
              {item.from && (
                <ListItem>
                  <ItemLabel>From:</ItemLabel> {item.from}
                </ListItem>
              )}
              {item.to && (
                <ListItem>
                  <ItemLabel>To:</ItemLabel> {item.to}
                </ListItem>
              )}
              {item.passengers && (
                <ListItem>
                  <ItemLabel>Passengers:</ItemLabel> {item.passengers}
                </ListItem>
              )}
              <Btn onClick={() => updateData(item.id)} info type="submit">
                Update trip
              </Btn>
              <Button onClick={() => deleteData(item.id)} info type="submit">
                Delete trip
              </Button>
              <ListDivider />
            </List>
          );
        })}
    </div>
  );
};

export default CreateTrip;
