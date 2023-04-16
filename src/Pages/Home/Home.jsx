import { List } from 'bootstrap-4-react';
import {mail, phone, github, google, facebook} from '../../icons';
import { Link } from 'react-router-dom';
import { useState } from "react";
import {  signInWithPopup } from "firebase/auth";
import { googleAuthProvider, facebookAuthProvider, githubAuthProvider, auth } from "../../firebase";
import { isUserExistEmail } from '../../firestoreApi';
import {useNavigate, Navigate} from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Home = () => {
  const [user, setUser] = useState(null);

const navigate = useNavigate();
  const googleSignIn = () => {

    signInWithPopup(auth, googleAuthProvider)
    .then((result) => {
      const user = result.user;
      const {email, displayName} = user;
      isUserExistEmail(email, {email, displayName});
      setUser(user);
      navigate('/users');
      toast.success('Welcome to your CRM');
    })
    .catch((err) => {
      if(err.message === "Firebase: Error (auth/account-exists-with-different-credential).") {
        toast.error("Нou are already registered with this mail");
      }
    });
    
  };
  
   const facebookSignIn = () => {
    signInWithPopup(auth, facebookAuthProvider).then((result) => {
      const user = result.user;
      const {email, displayName} = user;
      isUserExistEmail(email, {email, displayName});
      setUser(user);
      navigate('/users');
      toast.success('Welcome to your CRM');
    }).catch((err) => {
      if(err.message === "Firebase: Error (auth/account-exists-with-different-credential).") {
        toast.error("Нou are already registered with this mail");
      }
    })
  };

 const gitHubSignIn = () => {
    signInWithPopup(auth, githubAuthProvider).then((result) => {
      const user = result.user;
      const {email, displayName} = user;
      isUserExistEmail(email, {email, displayName});
      setUser(user);
      navigate('/users');
      toast.success('Welcome to your CRM');
    }).catch((err) => {
      if(err.message === "Firebase: Error (auth/account-exists-with-different-credential).") {
        toast.error("Нou are already registered with this mail");
      }
      
    })
  };

    return (
        <div>
        {user ? <Navigate to='/users'/>
        : <>
        <h1>Enter or register</h1>
        <List inline>
        <List.Item inline><Link onClick={googleSignIn}><img src={google} alt='google icon'/></Link></List.Item>
        <List.Item inline><Link onClick={facebookSignIn}><img src={facebook} alt='facebook icon'/></Link></List.Item>
        <List.Item inline><Link onClick={gitHubSignIn}><img src={github} alt='github icon'/></Link></List.Item>
        <List.Item inline><Link to='/sign-up-with-email'><img src={mail} alt='mail icon'/></Link></List.Item>
        <List.Item inline><Link to='/sign-up-with-phone'><img src={phone} alt='phone icon'/></Link></List.Item>
      </List>
        </>
      }
        </div>
    )
};

export default Home;