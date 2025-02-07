import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import { products } from "../assets/assets"
import axios from 'axios'

export const ShopContext = createContext();

function ShopContextProvider({ children }) {
    const currency = '$';
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItem] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('')
    const navigate = useNavigate();

    const addToCart = async (itemId, colour) => {

        if (!colour) {
            toast.error('Select Product colour')
            return;
        }

        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            if (cartData[itemId][colour]) {
                cartData[itemId][colour] += 1;
            }
            else {
                cartData[itemId][colour] = 1;
            }
        }
        else {
            cartData[itemId] = {};
            cartData[itemId][colour] = 1;
        }
        setCartItem(cartData);

        if (token) {
            try {
                await axios.post(backendUrl + "/api/cart/add",{itemId,colour},{                    headers: {
                    Authorization: `Bearer ${token}`, // Correct format
                },})
            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }
        }


    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {

                }
            }
        }
        return totalCount;

    }

    useEffect(() => {
        // console.log(cartItems);
    }, [cartItems])

    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list');
            if (response.data.success) {
                setProducts(response.data.products);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            console.log(error.message);
                  
        }
    }

    // const getUserCart = async (token) => {
    //     try {
    //         const response = await axios.post(backendUrl + "/api/cart/get", {}, { headers: { token } });
    
    //         if (response.data.success) {
    //             console.log("Fetched cart data:", response.data.cartData); // Debug log
    //             setCartItem(response.data.cartData || {}); // Ensure default object
    //         }
    //     } catch (error) {
    //         console.error("Error fetching user cart:", error);
    //         toast.error(error.message);
    //     }
    // };

    const getUserCart = async (token) => {
        try {
            // if (!token) {
            //     console.warn("No token found. Skipping request.");
            //     return;
            // }
    
            // console.log("Making request with token:", token);
    
            const response = await axios.post(
                backendUrl + "/api/cart/get",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Correct format
                    },
                }
            );
    
            // console.log("Response received:", response.data);
    
            if (response.data.success) {
                setCartItem(response.data.cartData || {}); // Update state with cart data
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error fetching cart:", error);
            toast.error(error.response?.data?.message || "Failed to fetch cart");
        }
    };
    
      

    useEffect(() => {
        getProductsData()
    }, [])


    useEffect(()=>{
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
    },[])


    const updateQuantity = async (itemId, colour, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][colour] = quantity;
        setCartItem(cartData);

        if (token) {
            try {
                await axios.post(backendUrl + "/api/cart/update",{itemId,colour,quantity},{                    headers: {
                    Authorization: `Bearer ${token}`, // Correct format
                },})
            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }
        }

    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }

                } catch (error) {

                }
            }
        }
        return totalAmount;
    }



    const value = {
        products,
        currency,
        delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        backendUrl,
        setToken,token
    };



    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    );
}

export default ShopContextProvider;