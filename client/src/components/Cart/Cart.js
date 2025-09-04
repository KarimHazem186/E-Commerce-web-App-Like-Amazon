import React, { useContext, useEffect, useState } from 'react'
import './Cart.css'
import { Divider } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate, useParams } from 'react-router-dom'
import {LoginContext} from '../Context/ContextProvider'
const Cart = () => {
    const { id } = useParams("");
    // const [details, setDetails] = useState([]);
    const [details, setDetails] = useState("");
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);

    const history = useNavigate("")

    const {account,setAccount} = useContext(LoginContext)

    console.log(details)
    const getDetails = async () => {
        try {
            const res = await fetch(`/getproductsone/${id}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await res.json();
            // console.log(data)
            if(res.status !==201) {
                console.log("no data available")
            } else {
                console.log("getdata")
                setDetails(data);
            }
        } catch (error) {
            // setError(error.message);
        } finally {
            // setLoading(false);
        }
    };

    useEffect(() => {
        // setTimeout(()=>{
        //     getDetails()
        // },1000)
        // getDetails();
        setTimeout(getDetails,1000)
    }, [id]);

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    // if (error) {
    //     return <div>Error: {error}</div>;
    // }

    // add cart function 
    const addtocart = async (id) => {
        // e.preventDefault();
        const checks = await fetch(`/addcart/${id}`,{
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                details
            }),
            credentials:"include"
        });

        const data1 = await checks.json()
        // console.log("Frontend data ",data1)

        if(checks.status===401 || !data1) {
            console.log("user Invalid");
            alert("user invalid")
        } else {
            // alert("data added in your cart")
            setAccount(data1)
            // console.log("data1 ",data1.carts)
            if(data1.carts) {
                history("/buynow")
            }
        }
    }

  return (
    // {details ?:""}
    <div className='cart_section'>
        {details && Object.keys(details).length&&
        <div className='cart_container'>
            <div className='left_cart'>
                {/* <img src='https://rukminim1.flixcart.com/image/416/416/kohigsw0/resistance-tube/c/s/e/new-adjustable-single-resistance-tube-multicolor-na-ajro-deal-original-imag2xg88mhmwxz5.jpeg?q=70' alt='' /> */}
                <img src={details.url} alt='' />
                <div className='cart_btn'>
                    <button className='cart_btn1' onClick={(e)=>addtocart(details.id,e)}>Add To Cart</button>
                    <button className='cart_btn2'>Buy Now</button>
                </div>
            </div>
            <div className='right_cart'>
                {/* <h3>Fitness Gear</h3> */}
                <h3>{details.title.shortTitle}</h3>
                {/* <h4>Pigeon FAVOURITE Electric Kettle (1.5L, Silver,Black)</h4> */}
                <h4>{details.title.longTitle}</h4>
                <Divider />
                {/* <p className='mrp'>M.R.P : $1195</p> */}
                <p className='mrp'>M.R.P : {details.price.mrp}</p>
                {/* <p>Deal of the Day : <span style={{color:"#B12704"}}>$625.00</span></p> */}
                <p>Deal of the Day : <span style={{color:"#B12704"}}>{details.price.cost}.00</span></p>
                <p>You Save :  <span style={{color:"B12704"}}>{details.price.mrp - details.price.cost}({details.price.discount})</span> </p>

                <div className='discount_box'>
                    {/* <h5>Discount : <span style={{color:"#111"}}>Extra 10% Off</span></h5> */}
                    <h5>Discount : <span style={{color:"#111"}}>{details.discount}</span></h5>
                    <h4>Free Delivery : <span style={{color:"#111",fontWeight:600}}>Oct 8 - 21 </span>Details</h4>
                    <p>Fastest delivery: <span style={{color:"#111",fontWeight:600}}>Tomorrow  11 AM</span></p>
                </div>
                {/* <p className='description'>About the Item : <span style={{ color: "#565959", fontSize: "14px", fontWeight: "500", letterSpacing: "0.4px" }}>This unique product can tone your back muscles, reduce belly fat, improve blood circulation and also improves your body posture. It increases the stamina, energy and vitality of the body. The elastic resistance of the rubber training rope can be used to train and exercise in whichever way you want, according to your physical needs.</span></p> */}
                <p className='description'>About the Item : <span style={{ color: "#565959", fontSize: "14px", fontWeight: "500", letterSpacing: "0.4px" }}>{details.description}</span></p>
            </div>
        </div>
    }

        {!details ?
        <div className='circle'>
            <CircularProgress />
            <h2>Loading...</h2>
        </div>   
         :
         ""
         }
    </div>
  )

}

export default Cart