import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { Star } from 'lucide-react';
import RelatedProducts from '../component/RelatedProducts';


const Product = () => {

  const {productId} = useParams();
  const {products ,currency,addToCart} = useContext(ShopContext);
  const [productData,setProductData] = useState(false);
  const [image,setImage] = useState('');
  const [colour,setColour] = useState('');
  // const [size,setSize] = useState('');

  const fetchProductData = async ()  => {
    products.map((item)=>{
      if(item._id=== productId){
        setProductData(item)
        setImage(item.image[0])
        return null;
      }
    })
  }
  useEffect(()=>{
    fetchProductData();
  },[productId])


  return productData ? (    

    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 r'>
      <div className=' flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full '>
          {
              productData.image.map((item,index)=>(
              <img onClick={()=>setImage(item)} src={item} key={index} className=' w-[24px] sm:w-full sm:mb-3  flex-shrink-0 cursor-pointer' alt="" />
              ))
          }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt="" />
          </div>
        </div>
        {/* product info */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <Star className='w-3 5'/>
            <Star className='w-3 5'/>
            <Star className='w-3 5'/>
            <Star className='w-3 5'/>
            <Star className='w-3 5'/>
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
              <p>Select Colour</p>
              <div className='flex gap-3 mx-2'>
                {productData.colour.map((item,index)=>(
                  <button onClick={()=>setColour(item)} className={`border py-3 px-3 bg-gray-100  ${item === colour ? 'border-black' : '' }`} key={index}>{item}</button>
                ))}
              </div>
          </div>
        <button onClick={()=>addToCart(productData._id,colour)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
        <hr className='mt-8 sm:w-4/5 ' />
        </div>
        <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original product.</p>
            <p>Cash on devivery is available on this product.</p>
            <p>Easy return and echange policy within 7 days.</p>
        </div>
      </div>
      {/* decription and review */}
      <div className=' mt-20'>
          <div className='flex'>
              <b className=' border px-5 py-3 text-sm'>Description</b> 
              <p className=' border px-5 py-3 text-sm'>Reviews (122)</p> 
          </div>
          <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus ab quaerat odit at, eaque, dolores magnam quisquam praesentium blanditiis porro consequatur amet quos sint repellat asperiores modi iure, nemo ducimus!</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus ab quaerat odit at, eaque, dolores magnam quisquam praesentium blanditiis porro consequatur amet quos sint repellat asperiores modi iure, nemo ducimus!</p>
          </div>
      </div>

      {/* display related product */}
      
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
    
  ) : <div className='opacity-0'></div>
} 

export default Product












// import React, { useState, useContext } from 'react';
// import Title from '../component/Title';
// import CartTotal from '../component/CartTotal';
// import { assets } from '../assets/assets';
// import { ShopContext } from '../context/ShopContext';

// const PlaceOrder = () => {
//   const [method, setMethod] = useState('cod');
//   const { navigate, backendUrl, cartItem, setCartItem, token, getCartAmount, delivery_fee, products } = useContext(ShopContext);
  
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     street: '',
//     city: '',
//     state: '',
//     zipcode: '',
//     country: '',
//     phone: ''
//   });

//   const onChangeHandler = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;
//     setFormData(data => ({ ...data, [name]: value }));
//   };

//   const onSubmitHandler = async (event) => {
//     event.preventDefault();
//     try {
//       let orderItems = [];

//       // Loop through cartItems and construct the orderItems
//       for (const item in cartItem) {
//         for (const size in cartItem[item]) {
//           if (cartItem[item][size] > 0) {
//             const itemInfo = structuredClone(
//               products.find(product => product._id === item) // Assuming item is the product ID
//             );

//             if (itemInfo) {
//               itemInfo.size = size; // Assign the size of the product
//               itemInfo.quantity = cartItem[item][size]; // Assign the quantity
//               orderItems.push(itemInfo); // Add the item to the orderItems array
//             }
//           }
//         }
//       }

//       console.log(orderItems); // Check the order items before submission
//       // Proceed with order submission logic here, such as calling an API or updating state
//     } catch (error) {
//       console.error("Error placing order:", error);
//       // Handle error here, e.g., display a message to the user
//     }
//   };

//   return (
//     <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
//       {/* Left side */}
//       <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
//         <div className='text-xl sm:text-2xl my-3'>
//           <Title text1={'DELIVERY'} text2={'INFORMATION'} />
//         </div>
//         <div className='flex gap-3'>
//           <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='First Name' type="text" />
//           <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Last Name' type="text" />
//         </div>
//         <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Enter Your Email' type="email" />
//         <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Street' type="text" />
//         <div className='flex gap-3'>
//           <input onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='City' type="text" />
//           <input onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='State' type="text" />
//         </div>
//         <div className='flex gap-3'>
//           <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='zipcode' type="text" />
//           <input required onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Country' type="text" />
//         </div>
//         <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Phone' type="number" />
//       </div>

//       {/* Right side */}
//       <div className='mt-8'>
//         <div className='mt-8 min-w-80'>
//           <CartTotal />
//         </div>
//         <div className='mt-12'>
//           <Title text1={'PAYMENT'} text2={'METHOD'} />
//           {/* PAYMENT METHOD */}
//           <div className='flex gap-3 flex-col lg:flex-row'>
//             <div onClick={() => setMethod('stripe')} className='h-12 flex items-center gap-3 border p-2 px-3 cursor-pointer'>
//               <p className={`w-4 h-4 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
//               <img className='h-10 w-auto mx-4' src={assets.stripelogo} alt="Stripe Logo" />
//             </div>

//             <div onClick={() => setMethod('razorpay')} className='h-12 flex items-center gap-3 border p-2 px-3 cursor-pointer '>
//               <p className={`w-4 h-4 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
//               <img className='h-20 w-auto mx-4' src={assets.razorpaylogo} alt="Razorpay Logo" />
//             </div>

//             <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
//               <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
//               <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
//             </div>
            
//             <div className='w-full text-end mt-8'>
//               <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default PlaceOrder;
