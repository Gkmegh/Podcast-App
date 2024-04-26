import React, { useState } from 'react'
import Header from '../components/Header/Header'
import SignUpForm from '../components/SignUpForm';
import LoginForm from '../components/LoginForm';

function SignInSignUp() {

  const [toggleForm, setToggleForm] = useState(false)
  

  return (
    <div>
      <Header/>
      <div className='input-wrapper'>
        {!toggleForm ? <h1>SignUp</h1>: <h1>Login</h1>}
        {!toggleForm ? <SignUpForm/>: <LoginForm/>}
        {!toggleForm ? <p onClick={()=> setToggleForm(!toggleForm)}>Already have an account. Login</p> : 
        <p onClick={()=> setToggleForm(!toggleForm)}>If you don't have an account SignUp</p>}


      </div>
    </div>
  )
}

export default SignInSignUp
