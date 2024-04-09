import React, {useEffect, useState, useRef} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/style.css'
import Loader from './loader';
import LoginLogo from '../images/Logo.png'
import { Icon } from '@iconify/react';
import { register } from '../APIConfig/authService';

function Register(){

    useEffect(()=>{
        if(sessionStorage.getItem('UserId'))
        {
            navigate("/Dashboard")
        }
        else if(!sessionStorage.getItem('UserId'))
        {
            navigate("/Register")
        }
    },[])

    const [success, setSuccess] = useState(false)

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
      
    const loginbtn = async () => {
        try {
        if (email.trim() === '' || password.trim() === '') {
            alert('Please fill in all fields before submitting.');
            return;
            }
            if (!isValidEmail) {
            alert('Please enter a valid email address.');
            return;
            }

        const id = await register(email, password);
        console.log('Registration Successful, Token:', id);

        setSuccess(true);
        
        

        } catch (error) {
        console.error('Login failed', error);
        }

    }

        
    function setOk(){
        setSuccess(true);
        navigate("/")
    }
    

    const backtoLogin = () =>{
        navigate("/")
    }

        
     

    return(
    <>
        {success &&(
            <div className='box-full-popup'>
                <div className="error-popup">
                    <Icon icon="ep:success-filled" className='error-login' />
                    <p className='projectDetailsp redp mt-3 mb-0'>Success</p>
                    <p className='projectDetailsp'>Details Registered Successfully, Press Ok </p>
                    <button className='btn btn-primary' onClick={setOk}>Ok</button>
                </div>
            </div>
        )}

        <section className='login-page'>
            <div className='login-page-up d-flex align-items-center justify-content-center'>
                <img src={LoginLogo} className='image-logo-login' alt='login-logo' />
            </div>
            <div className='login-page-box'>
                <div className='sign-up-form pt-3'>
                    <div className='text-center'>
                       <h3><strong>Register Yourself</strong></h3>
                    </div>
                    <div className='form-box'>
                        <div className='row d-flex'>
                            <div className='col-lg-3'>

                            </div>
                            <div className='col-lg-6'>
                                <form>
                                    <div className='d-flex mb-3'>
                                        <div className="form-group w-100 p-1" style={{position: 'relative'}}>
                                            <label className='lableInput'>Email <span style={{color:'red'}}>*</span></label>
                                            <input type="email" className="form-control loginBox" placeholder="Enter Email" value={email} onChange={handleEmailChange} />
                                        </div>
                                    </div>
                                    
                                    <div className='d-flex mb-3'>
                                    <div className="form-group w-100 p-1" style={{position: 'relative'}}>
                                            <label className='lableInput'>Password <span style={{color:'red'}}>*</span></label>
                                            <input type="password" className="form-control loginBox" id="exampleInputPassword1" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className='text-center pt-2'>
                                    <button type="button" className="btn btn-primary login" onClick={loginbtn}>Submit</button>
                                    </div>
                                </form>
                            </div>
                            <div className='col-lg-3'>

                            </div>
                        </div>
                        
                        <div className='mt-3'>
                            <p className='NewUser p-0 m-0'>Already Registered ?</p>
                            <p className='RegisterNew p-0' onClick={backtoLogin}>Back to Login</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
   )
}

export default Register