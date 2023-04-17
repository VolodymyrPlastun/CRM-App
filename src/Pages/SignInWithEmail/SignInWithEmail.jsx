import { Form, Button } from 'bootstrap-4-react';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';


const SignInWithEmail = () => {
const [data, setData] = useState({
    email: "",
    password: "",
});
const navigate = useNavigate();

const hundleSubmit = (evt) => {
evt.preventDefault();
signInWithEmailAndPassword(auth, data.email, data.password)
.then(res => {
    toast.success('Welcome to your CRM');
    navigate('/users');
})
.catch(err => {
  console.log(err.message);
  if(err.message === "Firebase: Error (auth/user-not-found).") {
    toast.error("You don't have an account with this email, go to link below")
  }
})
};


const inputChange = (evt) => {
const inputs = {[evt.target.name] : evt.target.value};
setData({...data, ...inputs});
};
    return (
        <>
        <h1>Enter your account</h1>
        <Form onSubmit={hundleSubmit}>
        <Form.Group>
          <label htmlFor="exampleInputEmail1">Email address</label>
          <Form.Input onChange={inputChange} name="email" type="email" id="exampleInputEmail1" placeholder="Enter email" lg/>
        </Form.Group>
        <Form.Group>
          <label htmlFor="exampleInputPassword1">Password</label>
          <Form.Input onChange={inputChange} name="password" type="password" id="exampleInputPassword1" placeholder="Password" lg/>
        </Form.Group>
        
       
        <Button primary type="submit">Sign In</Button>
        <Form.Text >Don't have an account? <Link to='/'>Click here</Link></Form.Text>
      </Form>
      </>
    )
};

export default SignInWithEmail;