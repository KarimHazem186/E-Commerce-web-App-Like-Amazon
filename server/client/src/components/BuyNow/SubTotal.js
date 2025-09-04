import React, { useEffect, useState } from 'react'

const SubTotal = ({items}) => {
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
    <div className='sub_item'>
        {/* <h3>SubTotal (1 items): <strong style={{fontWeight:700,color:"#111"}}>$4049.00</strong></h3> */}
        <h3>SubTotal ({items.length} items): <strong style={{fontWeight:700,color:"#111"}}>${price}.00</strong></h3>
    </div>
  )
}

export default SubTotal