import React from 'react'
import { Provider, Auth } from '../firebase-config'
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import "../generator.css"

const Login = () => {
  const navigator = useNavigate();
  
  const signIn = async () =>{
    await signInWithPopup(Auth, Provider)
    .then(res=>{console.log(res); navigator("/")})
    .catch(err=>console.log(err))
  }
  return (
    <div className='login-page'>
        {/* <h2>Login Here!</h2> */}
        <div className='signIn-button'>
          {/* <img src='D:\ai-image\firebase\src\Google_logo.png'></img>  */}
          <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png'></img>
          <button onClick={signIn} className="btn btn-primary">Continue with Google</button>
        </div>
        {/* <button className='signIn-button' onClick={signIn}>Sign In With Google</button> */}
    </div>
  ) 
}

export default Login