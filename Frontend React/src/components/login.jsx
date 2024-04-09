import React, {useEffect, useState, useRef} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/style.css'
import Loader from './loader';
import LoginLogo from '../images/Logo.png'
import { login } from '../APIConfig/authService';
import { useDispatch } from 'react-redux'; // Import useDispatch hook
import { loginUser } from '../store/userSlice';

function Login(){


    useEffect(()=>{
        if(sessionStorage.getItem('UserId'))
        {
            navigate("/Dashboard")
        }
        else if(!sessionStorage.getItem('UserId'))
        {
            navigate("/")
        }
    },[])

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);

    const handleEmailChange = (e) => {
        const enteredEmail = e.target.value;
        setEmail(enteredEmail);
    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsValidEmail(emailRegex.test(enteredEmail));
      };


     const navigate = useNavigate();
     const dispatch = useDispatch();
      
        const loginbtn = async () => {
          try {
              if (!isValidEmail) {
                alert('Please enter a valid email address.');
                return;
              }
            const token = await login(email, password);
            console.log('Login Successful, Token:', token);

            dispatch(loginUser(token));

            navigate("/Dashboard")
            
          } catch (error) {
            console.error('Login failed', error);
           }
          
        }

        const RegisterClicked = () => {
            navigate("/Register")
        }
        
     

    return(
    <>


        <section className='login-page'>
            <div className='login-page-up d-flex align-items-center justify-content-center'>
                <img src={LoginLogo} className='image-logo-login' alt='login-logo' />
            </div>
            <div className='login-page-box'>
                <div className='sign-up-form pt-3'>
                    <div className='text-center'>
                       <h3><strong>Log In</strong></h3>
                    </div>
                    <div className='form-box'>
                            <div className='row d-flex'>
                                <div className='col-lg-3'>

                                </div>
                                <div className='col-lg-6'>
                                   <form>
                                        <div className="form-group w-100 p-1 mb-4 mt-4" style={{position: 'relative'}}>
                                            <label className='lableInput'>Email</label>
                                            <input type="email" className="form-control loginBox" placeholder="Enter Email" value={email} onChange={handleEmailChange} />
                                        </div>

                                        <div className="form-group w-100 p-1 mb-4" style={{position: 'relative'}}>
                                            <label className='lableInput'>Password</label>
                                            <input type="password" className="form-control loginBox" id="exampleInputPassword1" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                        </div>
                                        <div className='text-center pt-2'>
                                            <button type="button" className="btn btn-primary login" onClick={loginbtn}>Login</button>
                                        </div>
                                   </form>
                                   <div className='mt-3'>
                                      <p className='NewUser p-0 m-0'>New User ?</p>
                                      <p className='RegisterNew p-0' onClick={RegisterClicked}>Register yourself</p>
                                   </div>
                                </div>
                                <div className='col-lg-3'>
                                    
                                </div>
                               
                            </div>
 
                           
                            
                    </div>
                </div>
            </div>
        </section>
    </>
   )
}

export default Login