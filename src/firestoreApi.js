import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebase';

const database = collection(db, 'users');

 export const getData = async (setData) => {
const data = await getDocs(database);
    setData(data.docs.map(item => {
      return {...item.data(), id: item.id }
    }));
  };


 export const isUserExistEmail = async (email, data) => {
    const q = query(database, where("email", "==", email))
    
    const querySnapshot = await getDocs(q);
    
    
    if (querySnapshot.empty) {
        await addDoc(database, data);
      } 
    }

    export const isUserExistPhone = async (phoneNumber, data) => {
        const q = query(database, where("phoneNumber", "==",  phoneNumber))
        
        const querySnapshot = await getDocs(q);
        
        
        if (querySnapshot.empty) {
            console.log("Add user");
           
            await addDoc(database, data);
          }
        }