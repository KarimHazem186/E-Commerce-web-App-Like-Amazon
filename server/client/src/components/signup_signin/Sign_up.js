import React, { useState } from 'react'
import './SignUp.css'
import { NavLink } from 'react-router-dom'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const SignUp = () => {
    const [udata,setUdata] = useState({
        fname:"",
        email:"",
        mobile:"",
        password:"",
        cpassword:""
    });

    const handleChange = (e)=> {
        const {name,value} = e.target;
        setUdata(()=>{
            return {
                ...udata,
                [name]:value
            }

        });
    }

    console.log(udata)

    
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const {fname,email,mobile,password,cpassword} = udata;

        // if(fname==="") {
        //     toast.warn("Please enter your fname",{
        //         position:"top-center"
        //     })
        // } else if(email==="") {
        //     toast.warn("Please enter your email",{
        //         position:"top-center"
        //     })
        // } 
        
        const res = await fetch("/register",{
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fname,email,mobile,password,cpassword
            })
        });

        const data = await res.json();
        // console.log(data)
        if(res.status === 422 ||!data) {
            // alert("No data")
            toast.warn("invalid details",{
                position:"top-center"
            }
            )
        } else {
            // alert("data successfully added")
            toast.success("data successfully added",{
                position: "top-center",
            })
            setUdata({...udata,fname:'',email:'',mobile:'',password:'',cpassword:''})
        }
    }


    return (
    <>
        <section>
            <div className='sign_container'>
                <div className='sign_header'>
                    <img src='./blacklogoamazon.png' alt='' />
                </div>
                <div className='sign_form'>
                    <form method='POST'>
                        <h1>Create New Account</h1>
                        <div className='form-data'>
                            <label htmlFor='fname'>Your Name</label>
                            <input type='text' 
                            name='fname' 
                            value={udata.fname} 
                            id='fname' 
                            onChange={handleChange} 
                            // onChange={(e) => setUdata({...udata, fname: e.target.value})}                            
                            />
                        </div>

                        <div className='form-data'>
                            <label htmlFor='email'>Email</label>
                            <input type='text' name='email' value={udata.email} id='email' onChange={handleChange} />
                        </div>

                        <div className='form-data'>
                            <label htmlFor='number'>Mobile</label>
                            <input type='text' name='mobile' value={udata.mobile} id='mobile' onChange={handleChange} />
                        </div>

                        <div className='form-data'>
                            <label htmlFor='password'>Password</label>
                            <input type='text' name='password' value={udata.password} placeholder='At least 6 char' id='password'  onChange={handleChange}/>
                        </div>

                        <div className='form-data'>
                            <label htmlFor='cpassword'>Password Again</label>
                            <input type='text' name='cpassword' value={udata.cpassword} placeholder='At least 6 char' id='cpassword' onChange={handleChange} />
                        </div>

                        <button className='signin_btn' onClick={handleSubmit}>Continue</button>
                        <div className='signin_info'>
                            <p>Already have an account ?</p>
                            <NavLink to='/login'>Sign In</NavLink>
                        </div>
                    </form>
                </div>
                <ToastContainer />
            </div>
        </section>
    </>
  )
}

export default SignUp