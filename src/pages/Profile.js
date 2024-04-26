import React from 'react'
import {useSelector} from 'react-redux'
import Header from '../components/Header/Header';
import Button from '../components/Button/Button';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import {toast} from 'react-toastify'
import Loader from '../components/Loader';

function Profile() {

    const user = useSelector((state)=> state.user.user);
    console.log(user);
    if(!user){
      return <Loader/>
    }

    const handleLogout = ()=>{
      signOut(auth)
        .then(()=>{
          toast.success("User Logged Out")
        })
        .catch((err)=>{
          toast.error(err.message)
        })
    }

  return (
   <>
      <Header/>
      <div className='input-wrapper'>
      <h1>Name: {user.name}</h1>
      <h1>Email: {user.email}</h1>
      <h1>UID: {user.uid}</h1>
      <Button text={"Logout"} onClick={handleLogout}  style={{width:"200px", margin:0 }}/>
      </div>
    </>
  )
}

export default Profile
