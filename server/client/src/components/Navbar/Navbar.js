import React, { useContext, useEffect, useState } from 'react'
import  {Link, NavLink, useNavigate } from 'react-router-dom'
import "./Navbar.css"
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Avatar from '@mui/material/Avatar';
import ContextProvider, { LoginContext } from '../Context/ContextProvider';
import  IconButton  from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import  Drawer  from '@mui/material/Drawer';
import RightHeader from './RightHeader';
import  Menu from '@mui/material/Menu';
import MenuItem  from '@mui/material/MenuItem';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import LogoutIcon from '@mui/icons-material/Logout'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {useSelector} from 'react-redux'
const Navbar = () => {
    const history = useNavigate()
    const {account,setAccount} = useContext(LoginContext)
    console.log("Acount",account?.carts)
    console.log("Acount",account)
    const [dropen,setDropen] = useState(false)
    

    const [text,setText] = useState("")
    console.log("Search Text ",text)
    const [liopen,setliopen] = useState(true)
    const {products} = useSelector(state=>state.getproductsdata);


    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
    setAnchorEl(null);
    };

    // const AccountCart = localStorage.setItem('account',account.carts.length||0);

    // const history = useNavigate()
    // const send =()=> {
    //     if(account) {
    //         history("/")
    //     }
    // }
  
    const getdetailsvaliduser = async()=> {
        const res = await fetch("/validuser",{
            method: 'GET',
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            },
            credentials:"include"
        });
        const data = await res.json();
        // console.log("valid user",data)
        if(res.status !== 201) {
            console.log("Error")
        } else  {
            console.log("data valid")
            setAccount(data)
            console.log("Acount",account)
        }
    }

    const handleopen = ()=>{
        setDropen(true)
    }

    const handleclose = ()=>{
        setDropen(false)
    }

    
    const logoutuser = async()=> {
        const res2 = await fetch("/logout",{
            method: 'GET',
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            },
            credentials:"include"
        });
        const data2 = await res2.json();
        // console.log("valid user",data2)
        if(res2.status !== 201) {
            console.log("Error")
        } else  {
            alert("Logout User")
            toast.success("Logout User",{
                position: "top-center",
            })
            setAccount(false)
            history('/')
        }
    }

    const getText = (items) => {
        setText(items)
        setliopen(false)
    }


    useEffect(()=>{
        getdetailsvaliduser()
    },[])

    return (
    <header>
        <nav>
            <div className="left">

            <IconButton className='hamburgur' onClick={handleopen} >
                <MenuIcon style={{color:"#fff"}} />
            </IconButton>    

            <Drawer open={dropen} onClose={handleclose}>
                <RightHeader logclose={handleclose} logoutuser={logoutuser}/>
            </Drawer>

                <div className='navlogo'>
                    <NavLink to="/"><img src='./amazon_PNG25.png' alt='' /></NavLink>
                </div>
                <div className='nav_searchbar'>
                    <input 
                    type='text' 
                    name='' 
                    id='' 
                    placeholder='Search your products...'
                    onChange={(e)=>getText(e.target.value)}
                    />
                    <div className='search_icon'>
                        <SearchIcon  id='search'/>
                    </div>

                    {/* Search Filter */}
                    {
                        text && 
                        <List className='extrasearch' hidden={liopen}>
                            {
                                products.filter(product=>product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product=>(
                                    <ListItem key={product.id}>
                                        <NavLink to={`/getproductsone/${product.id}`} onClick={()=>setliopen(true)}>
                                            {product.title.longTitle}
                                        </NavLink>
                                    </ListItem>
                                ))
                            }
                        </List>
                    }
                </div>
            </div>
            <div className='right'>
                <div className='nav_btn'>
                    <NavLink to='/login'>SignIn</NavLink>
                </div>
                <div className='cart_btn'>
                {/* <Badge badgeContent={4} color="primary"> */}

                {
                    account ?  
                    <NavLink to="/buynow">
                        <Badge badgeContent={account?.carts?.length||0} color="primary">
                        {/* <Badge badgeContent={localStorage.getItem('account')} color="primary"> */}
                            <ShoppingCartIcon id="icon" />
                        </Badge>
                   </NavLink> : 
                    <NavLink to="/login">
                        <Badge badgeContent={0} color="primary">
                            <ShoppingCartIcon id="icon" />
                        </Badge>
                   </NavLink>
                }
                <ToastContainer />
               
                <p>Cart</p>
                {/* </Badge> */}
                </div>
                {
  account && account.fname  ? (
    <Avatar
      className='avtar2'
      id="basic-button"
      aria-controls={open ? 'basic-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
      onClick={handleClick}
    >
      {account.fname?.[0]?.toUpperCase() || ''}
    </Avatar>
  ) : (
    <Avatar
      className='avtar'
      id="basic-button"
      aria-controls={open ? 'basic-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
      onClick={handleClick}
    />
  )
}

                {/* <Avatar className='avatar'>K</Avatar> */}
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
            'aria-labelledby': 'basic-button',
            }}
        >
        <MenuItem onClick={handleClose}>My account</MenuItem>
        {
            account ? <MenuItem onClick={() => { handleClose(); logoutuser(); }}><LogoutIcon style={{fontSize:16,marginRight:3}}/> Logout</MenuItem> : ""

        }
      </Menu>
            </div>
        </nav>
    </header>
  )
}
export default Navbar