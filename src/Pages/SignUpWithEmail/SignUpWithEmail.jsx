import { Form, Button } from 'bootstrap-4-react';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { isUserExistEmail } from '../../firestoreApi';
import { toast } from 'react-hot-toast';

const SignUpWithEmail = () => {
const [data, setData] = useState({
    email: "",
    password: "",
});
const navigate = useNavigate();

const hundleSubmit = (evt) => {
evt.preventDefault();
const {email, password} = data;
createUserWithEmailAndPassword(auth, email, password)
.then(res => {
    console.log(res.user);
    isUserExistEmail(email, {email, password});
    navigate('/users');
    toast.success('Welcome to your CRM');
})
.catch(err => {
  if(err.message === "Firebase: Error (auth/email-already-in-use).") {
    toast.error("You already have an account, go to link below")
  }
})
};


const inputChange = (evt) => {
const inputs = {[evt.target.name] : evt.target.value};
setData({...data, ...inputs});
};
    return (
        <>
        <h1>Create your account</h1>
        <Form onSubmit={hundleSubmit}>
        <Form.Group>
          <label htmlFor="exampleInputEmail1">Email address</label>
          <Form.Input onChange={inputChange} name="email" type="email" id="exampleInputEmail1" placeholder="Enter email" lg/>
        </Form.Group>
        <Form.Group>
          <label htmlFor="exampleInputPassword1">Password</label>
          <Form.Input onChange={inputChange} name="password" type="password" id="exampleInputPassword1" placeholder="Password" lg/>
        </Form.Group>
        
       
        <Button primary type="submit">Sign Up</Button>
        <Form.Text >Already have an account? <Link to='/sign-in-with-email'>Click here</Link></Form.Text>
      </Form>
      </>
    )
};

export default SignUpWithEmail;