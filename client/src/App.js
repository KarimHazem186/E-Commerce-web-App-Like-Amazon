import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import MainCompoent from './components/Home/MainCompoent';
import Navbar from './components/Navbar/Navbar';
import NewNav from './components/Navbar/NewNavbar/NewNav';
import SignIn from './components/signup_signin/Sign_in';
import SignUp from './components/signup_signin/Sign_up';
import Cart from './components/Cart/Cart';
import BuyNow from './components/BuyNow/BuyNow';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from 'react';
function App() {
  const [data,setData] = useState(false)

  useEffect(()=>{
    setTimeout(()=>{
      setData(true)
    },3000)
  },[])
  return (
    <>
    {
      data ? (
        <> 
      <Navbar />
      <NewNav />
      <Routes>
        <Route path="/" element={<MainCompoent />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/getproductsone/:id" element={<Cart />} />
        <Route path="/buynow" element={<BuyNow />} />
      </Routes>
      {/* <MainCompoent /> */}
      <Footer />

        </>
      ) : (
        <div className='circle'>
          <CircularProgress />
          <h2>Loading...</h2>
        </div>
      )
    }
          </>
  );
}

export default App;



// A > B > C > D
// A => props
// store 5 userdata