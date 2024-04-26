import React, { useState } from 'react'
import InputComponent from '../input/input'
import Button from '../Button/Button';
import './styles.css'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {auth, db} from '../../firebase'
import { doc, setDoc } from 'firebase/firestore';
import {useDispatch} from 'react-redux'
import { useNavigate } from "react-router-dom";
import { setUser } from '../../slices/userSlice';
import {toast} from 'react-toastify'

function SignUpForm() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [fullName, setFullName] = useState("");
    const [email, setEmail]= useState("");
    const [password , setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading , setLoading] = useState(false)

  async function handleSignup(){
    console.log("signup")
    setLoading(true)
    if(password === confirmPassword && password.length>6 && fullName && email){
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;
            console.log(user)
            
            await setDoc(doc(db, "users" , user.uid),{
                name: fullName,
                email: user.email,
                uid : user.uid,
                // profilePic: fileURL,
            });

            dispatch(
                setUser({
                    name: fullName,
                    email: user.email,
                    uid : user.uid,
                })
            );
            toast.success("User has been created")
            setLoading(false)
            navigate("/profile");
            
        } catch (error) {
            console.log("error", error)
            toast.error(error.message)
            setLoading(false)
        }
    }
    else{
        if(password !== confirmPassword){
            toast.error("Password Should be Same")
        }
        else if(password.length<6){
            toast.success("Password should be more than 8 character long")
        }
        setLoading(false)
    }
  }


  return (
    <>
      <InputComponent
        type='text'
        state={fullName}
        setState={setFullName}
        placeholder="Full Name"
        required={true}
      />

      <InputComponent
        type='text'
        state={email}
        setState={setEmail}
        placeholder="Email"
        required={true}
      />

      <InputComponent
        type='password'
        state={password}
        setState={setPassword}
        placeholder="Password"
        required={true}
      />

      <InputComponent
        type='password'
        state={confirmPassword}
        setState={setConfirmPassword}
        placeholder="Confirm Password"
        required={true}
      />

      <Button text={loading ? "Loading..." : "SignUp"} disabled={loading}  onClick={handleSignup}/>

    </>
  )
}

export default SignUpForm
