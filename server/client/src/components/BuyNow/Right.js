import React, { useEffect, useState } from 'react'

const Right = ({items}) => {
  // console.log("items",items)
  const [price,setPrice] = useState(0)

  useEffect(()=>{
    totalAmount()
  },[items])

  const totalAmount = () => {
    let price = 0;
    items.map((item) => {

      price += item.price.cost;
    });
    // return price;
    setPrice(price)
  }
  return (
    <div className='right_buy'>
        <img src="https://images-eu.ssl-images-amazon.com/images/G/31/checkout/assets/TM_desktop._CB443006202_.png" alt="rightimg" />
        <div className='cost_right'>
            <p>Your order is eligible FREE Delivery</p> <br />
            <span style={{color:"#565959"}}>Select this option at checkout. Details</span>
            <h3>SubTotal ({items.length} items): <span style={{fontWeight:700}}>${price}.00</span></h3>
            <button className='rightbuy_btn'>Process To Buy</button>
            <div className='emi'>
                Emi available
            </div>
        </div>
    </div>
  )
}

export default Right