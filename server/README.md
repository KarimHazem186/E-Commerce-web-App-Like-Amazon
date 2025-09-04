export const getProducts = () => {
    return async(dispatch) => {
        dispatch({type: "REQUEST_GET_PRODUCTS"});
        try {
            const response = await fetch("http://localhost:8005/getproducts", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Response data:", data);

            if (data && Object.keys(data).length > 0) {
                dispatch({type: "SUCCESS_GET_PRODUCTS", payload: data});
            } else {
                console.log("Empty response");
                dispatch({type: "FAIL_GET_PRODUCTS", payload: "Empty response"});
            }
        } catch (error) {
            console.error("Fetch error:", error);
            dispatch({type: "FAIL_GET_PRODUCTS", payload: error.message});
        }
    }
}
//////////////////////////
const initialState = {
    products: [],
    loading: false,
    error: null
};

const getProductsReducer = (state = initialState, action) => {
    switch(action.type) {
        case "REQUEST_GET_PRODUCTS":
            return {...state, loading: true};
        case "SUCCESS_GET_PRODUCTS":
            return {...state, loading: false, products: action.payload};
        case "FAIL_GET_PRODUCTS":
            return {...state, loading: false, error: action.payload};
        default:
            return state;
    }
};
//////////////////////////
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from './actions';

const ProductsComponent = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector(state => state.getProductsData);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    console.log(products);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            {products.length > 0 ? (
                products.map(product => (
                    <div key={product.id}>{product.name}</div>
                ))
            ) : (
                <p>No products found</p>
            )}
        </div>
    );
};

export default ProductsComponent;
//////////////////////////