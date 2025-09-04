export const getProducts = () => {
    return async(dispatch) => {
        dispatch({type: "SUCCESS_GET_PRODUCTS"});
        try {
            const response = await fetch("/getproducts", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            // console.log("Response data:", data);

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

