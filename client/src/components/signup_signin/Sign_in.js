import React, { useContext, useState } from 'react';
import './SignUp.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginContext } from '../Context/ContextProvider';

const SignIn = () => {
  const navigate = useNavigate();
  const { setAccount } = useContext(LoginContext);

  const [logdata, setData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const { email, password } = logdata;

  if (!email || !password) {
    toast.warn('Please fill in all fields', {
      position: 'top-center'
    });
    return;
  }

  try {
    const res = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message || 'Invalid login credentials', {
        position: 'top-center'
      });
      return;
    }

    // ✅ Success: set context and localStorage
    setAccount(data.user); // Assuming your backend returns { user, token }
    localStorage.setItem('account', JSON.stringify(data.user));
    localStorage.setItem('token', data.token); // Optional: if token is sent

    toast.success('Login successful', {
      position: 'top-center'
    });

    setData({ email: '', password: '' });

    setTimeout(() => {
      navigate('/');
    }, 2000);
  } catch (error) {
    console.error('Login error:', error);
    toast.error('Server error during login', {
      position: 'top-center'
    });
  }
};


  return (
    <>
      <section>
        <div className="sign_container">
          <div className="sign_header">
            <img src="./blacklogoamazon.png" alt="Amazon Logo" />
          </div>
          <div className="sign_form">
            <form onSubmit={handleSubmit}>
              <h1>Sign-In</h1>
              <div className="form-data">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  value={logdata.email}
                  id="email"
                  placeholder='enter email'
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-data">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  value={logdata.password}
                  id="password"
                  onChange={handleChange}
                  placeholder="At least 6 characters"
                  required
                />
              </div>

              <button className="signin_btn" type="submit">
                Continue
              </button>
            </form>
          </div>
          <div className="create_accountinfo">
            <p>New to Amazon?</p>
            <NavLink to="/register">
              <button>Create Your Amazon Account</button>
            </NavLink>
          </div>
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default SignIn;


// import React, {useContext,useState } from 'react'
// import './SignUp.css'
// import { NavLink } from 'react-router-dom'
// import {ToastContainer, toast} from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
// import { LoginContext } from '../Context/ContextProvider';
// import { useNavigate } from "react-router-dom";

// const SignIn = () => {
//     const navigate = useNavigate();

//     const [logdata,setData] = useState({
//         email:"",
//         password:""
//     });
//     console.log(logdata)

//     const {account,setAccount} = useContext(LoginContext)

//     const handleChange = (e) => {
//         const {name,value} = e.target;
//         setData(()=>{
//             return {
//                 ...logdata,
//                 [name]:value 
//             }
//         })
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault();
    
//         const { email, password } = logdata;
//         const res = await fetch("/login", {
//             method: "POST", // Corrected from "methods" to "method"
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 email,
//                 password
//             })
//         });
    
//         const data = await res.json();
//         console.log(data);
    
//         // if (res.status === 400 || !data) {
//         //     // console.log("Invalid details");
//         //     toast.warn("invalid details",{
//         //         position:"top-center"
//         //     }
//         //     )
//         // } else {
//         //     console.log("data valid");
           
//         //     if(data) {
//         //         setAccount(data)
//         //     }
           
//         //     toast.success("User valid",{
//         //         position: "top-center",
//         //     })
//         //     setData({ ...logdata, email: "", password: "" });
//         // }
//         if (res.status === 400 || !data) {
//     toast.warn("Invalid details", {
//         position: "top-center"
//     });
// } else {
//     setAccount(data); // update global context
//     toast.success("Login successful", {
//         position: "top-center"
//     });
//     setData({ email: "", password: "" });
//     navigate("/"); // 🔥 redirect to homepage to trigger Navbar refresh
// }
//     };
    
//     return (
//     <>
//         <section>
//             <div className='sign_container'>
//                 <div className='sign_header'>
//                     <img src='./blacklogoamazon.png' alt='' />
//                 </div>
//                 <div className='sign_form'>
//                     <form method='POST'>
//                         <h1>Sign-In</h1>
//                         <div className='form-data'>
//                             <label htmlFor=''>Email</label>
//                             <input type='text' name='email' value={logdata.email} id='email' onChange={handleChange} />
//                         </div>

//                         <div className='form-data'>
//                             <label htmlFor=''>Password</label>
//                             <input type='text' name='password' value={logdata.password} placeholder='At least 6 char' id='password' onChange={handleChange}/>
//                         </div>
//                         <button className='signin_btn' onClick={handleSubmit}>Continue</button>
//                     </form>
//                 </div>
//                 <div className='create_accountinfo'>
//                     <p>New To Amazon</p>
//                     <NavLink to="/register"><button>Create Your amazon account</button></NavLink>
//                 </div>
//             </div>
//             <ToastContainer />
//         </section>
//     </>
//   )
// }

// export default SignIn