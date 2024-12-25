import React, { useState } from "react"

import LoginForm from "./login";

import SignupForm from "./signup"
import RequestResetPassword from "./resetPassword/RequestResetPassword";
type AuthenticationFormProps={
    closeModal: ()=> void;
}
export default function AuthenticationForm({closeModal}:AuthenticationFormProps){

    const [visible , setVisible] = useState<string>('l');
   
    return (<>
    { visible==='l'?(
    <LoginForm closeModal={closeModal} setVisible={setVisible} />): visible==='r'?( <RequestResetPassword setVisible={setVisible}/>):
    
    (
    <SignupForm  setVisible={setVisible}/>)}

   


    </>);
}