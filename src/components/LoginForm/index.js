import React, { useState } from 'react'
import InputComponent from '../input/input'
import Button from '../Button/Button';
import { signInWithCredential, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase';
import {useDispatch} from 'react-redux'
import { doc, getDoc } from 'firebase/firestore';
import { setUser } from '../../slices/userSlice';
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'

function LoginForm() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail]= useState("");
    const [password , setPassword] = useState("")
    const [loading, setLoading] = useState(false)

  async function handleLogin(){
    console.log("Login")
    setLoading(true)
    if(email && password){
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;
            const userDoc = await getDoc(doc(db, "users", user.uid));
            const userData = userDoc.data()
            
            dispatch(
                setUser({
                    name: userData.name,
                    email: user.email,
                    uid : user.uid,
                })
            );
            toast.success("Login Successful")
            setLoading(false)
            navigate("/profile");
            
        } catch (error) {
            console.log("error", error)
            setLoading(false)
            toast.error(error.message)
        }
    }
    else{
        toast.error("Please Enter Email and Password")
        setLoading(false)
    }
  }


  return (
    <>
      
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

     
      <Button text={loading ? "Loading..." : "Login"}  onClick={handleLogin} disabled={loading}/>

    </>
  )
}

export default LoginForm;
