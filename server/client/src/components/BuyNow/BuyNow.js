import React, { useEffect, useState } from 'react'
import './BuyNow.css'
import { Divider } from '@mui/material'
import Option from './Option'
import SubTotal from './SubTotal'
import Right from './Right'
const BuyNow = () => {
  
  const[cartdata,setCartdata] = useState([]);
 
  // if(cartdata&&cartdata.carts) {
  //   console.log(cartdata.carts)
  //   console.log(cartdata)
  // }
  // console.log(cartdata.length)
  
  const getdatabuy = async(e)=>{
    const res = await fetch("/cartdetails",{
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    });
    
    const data = await res.json();
    
    if(res.status !== 201) {
      console.log("error");
    } else {
      // setCartdata(data)
      
      // if(cartdata&&cartdata.carts) {
        // setCartdata(cartdata.carts)
        setCartdata(data.carts)
        // window.location.reload()
        // }
      }
      // console.log(data.carts)
    };  
    
      
    
    useEffect(()=>{
      getdatabuy();
    },[])
    
    return (
    <>
    {
      cartdata.length ? 
      <div className='buynow_section'>
        <div className='buynow_container'>
            <div className='left_buy'>
                <h1>Shopping Cart</h1>
                <p>Select all items</p>
                <span className='leftbuyprice'>Price</span>
                <Divider />

                {/* <div className='item_containert'>
                    <img src='https://rukminim1.flixcart.com/image/300/300/kll7bm80/smartwatch/c/1/n/43-mo-sw-sense-500-android-ios-molife-original-imagyzyycnpujyjh.jpeg?q=70' alt='' /> 
                    <div className='item_details'>
                      <h3>Molife Sense 500 smartwatch (Black Strap, Freesize)</h3>
                      <h3>Smart Watches</h3>
                      <h3 className='diffrentprice'>$4049.00</h3>
                      <p className='unusual'>Usually dispatched in 8 days.</p>
                      <p>Eligible for FREE Shipping</p>
                      <img src='https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px-2x._CB485942108_.png' alt='' />
                      <Option />
                    </div>
                    <h3 className='item_price'>$4049.00</h3>
                  </div> */}

                {
                  cartdata.map((e,k)=>{
                    return (
                    <>
                    <div className='item_containert'>
                    <img src={e.url} alt='' /> 
                    <div className='item_details'>
                      <h3>{e.title.longTitle}</h3>
                      <h3>{e.title.shortTitle}</h3>
                      <h3 className='diffrentprice'>$4049.00</h3>
                      <p className='unusual'>Usually dispatched in 8 days.</p>
                      <p>Eligible for FREE Shipping</p>
                      <img src='https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px-2x._CB485942108_.png' alt='' />
                      <Option deletedata={e.id} get={getdatabuy} />
                    </div>
                    <h3 className='item_price'>${e.price.cost}.00</h3>
                  </div>
                  <Divider />
                    </>
                    )
                  })
                }
                
                <SubTotal items={cartdata} />
            </div>
            <Right  items={cartdata}/>
        </div>
        
    </div> : ""
    }
    
    </>
    
  )
}

export default BuyNow