import React, { useContext } from 'react'
import Avatar from '@mui/material/Avatar';
import { LoginContext } from '../Context/ContextProvider';
import { NavLink } from 'react-router-dom';
import { Divider } from '@mui/material';
import './RightHeader.css'
import LogoutIcon from '@mui/icons-material/Logout';
const RightHeader = ({logclose,logoutuser}) => {
    const {account,setAccount} = useContext(LoginContext)
    return (
    <>
        <div className="rightheader">
            <div className='right_nav'>
                {
                    account ? <Avatar className='avtar2'>{account.fname[0].toUpperCase()}</Avatar> :
                    <Avatar className='avtar'></Avatar>
                }
                {account ? <h3>Helloo, {account.fname.toUpperCase()}</h3>:""}
            </div>
            <div className='nav_btn' onClick={()=>logclose()}>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/'>Shop By Category</NavLink>

                <Divider style={{width:"100%",marginLeft:"-20px",marginBottom:"15px"}} />

                <NavLink to='/'>today's Deal</NavLink>
                {
                    account ? <NavLink to='/buynow'>Your orders </NavLink> : <NavLink to='/login'>Your orders </NavLink>
                }
                <Divider style={{width:"100%",marginLeft:"-20px",marginBottom:"15px"}} />
                <div className='flag'>
                    <NavLink to="/">Settings</NavLink>
                    <img src='./india.png' style={{width:35,marginLeft:10}} alt='' />
                </div>
                {
                    account ? 
                    <div className='flag'>
                        <LogoutIcon style={{fontSize:18,marginRight:4}} />
                        <h3 onClick={()=>logoutuser()} style={{cursor:"pointer",fontWeight:500}}>Logout</h3>
                    </div>
                    :
                    <NavLink to='/login'>Sign In</NavLink>
                }
            </div>
        </div>
    </>
  )
}

export default RightHeader