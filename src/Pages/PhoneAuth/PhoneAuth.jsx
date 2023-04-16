import { Card, Button } from "bootstrap-4-react";
import { useState } from "react";
import { Input, OTPInput } from "./PhoneAuth.styled";
import 'react-phone-input-2/lib/style.css';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../firebase";
import { Navigate } from "react-router-dom";
import { isUserExistPhone } from "../../firestoreApi";
import { toast } from 'react-hot-toast';


const PhoneAuth = () => {
const [otp, setOtp] = useState("");
const [phone, setPhone] = useState("");
const [showOtp, setShowOtp] = useState(false);
const [user, setUser] = useState(null);

function captcha() {
    if(!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier('captcha', {
            'size': 'invisible',
            'callback': (response) => {
                signUp();
            }
          }, auth);
          
    }
}

function signUp() {
captcha();
const appVerifier = window.recaptchaVerifier;
const phoneNumber = '+' + phone;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      setShowOtp(true);
          }).catch((err) => {
      toast.error(err.message)
    });

}

function OTPVerify() {
    window.confirmationResult.confirm(otp).then(async(result) => {
        const user = result.user;
        setUser(user);
        isUserExistPhone(user.phoneNumber, {phoneNumber: user.phoneNumber, displayName: user.displayName})
        toast.success("Welcome to your CRM")
      }).catch((err) => {
        toast.error(err.message)
      });
}

    return (
       <div>
        <div id="captcha"></div>
        {user ? 
        <Navigate to='/users'/>
        : 
        <Card text="center">
        
        <Card.Body>
          {/* <Card.Title>Phone Auth</Card.Title> */}
          {showOtp ? <>
            <Card.Text>
            Enter your OTP
          </Card.Text>
          <OTPInput OTPLength={6} otpType="number" disabled={false} autofocus value={otp} onChange={setOtp}/>
          <Button onClick={OTPVerify} info>Verify OTP</Button></>
          :  <><Card.Text>
        Enter your Phone Number
      </Card.Text>
      <Input country='ua' value={phone} onChange={setPhone}/>
      <Button info onClick={signUp}>Send SMS</Button>
      </>}
         
        </Card.Body>
      </Card>}
       </div>
    )
};

export default PhoneAuth;