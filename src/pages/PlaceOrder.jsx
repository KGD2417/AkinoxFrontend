import React, { useContext } from 'react'
import Title from '../component/Title'
import CartTotal from '../component/CartTotal'
import { assets } from '../assets/assets';
import { useState } from 'react';
import { ShopContext } from '../context/ShopContext';


const PlaceOrder = () => {
  const [method, setMethod] = useState('cod')
  const {navigate} = useContext(ShopContext);

  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>

      {/* left side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex gap-3'>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='First Name' type="text" />
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Last Name' type="text" />
        </div>
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Enter Your Email' type="email" />
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Street' type="text" />
        <div className='flex gap-3'>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='City' type="text" />
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='State' type="text" />
        </div>
        <div className='flex gap-3'>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Pincode' type="text" />
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Country' type="text" />
        </div>
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Phone' type="number" />

      </div>

      {/* right side */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>
        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />

          {/* PAYMENT METHOD */}
          <div className='flex gap-3 flex-col lg:flex-row'>
              {/* Stripe */}
              <div  onClick={()=>setMethod('stripe')} className='h-12  flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                <p className={`w-4 h-4 border rounded-full  ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
                <img className='h-10 w-auto mx-4' src={assets.stripelogo} alt="Stripe Logo" />
              </div>

              {/* Razorpay  */}
              <div onClick={()=>setMethod('razorpay')}  className='h-12  flex items-center gap-3 border p-2 px-3 cursor-pointer '>
                <p className={`w-4 h-4 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
                <img className='h-20 w-auto mx-4' src={assets.razorpaylogo} alt="Razorpay Logo" />
              </div>

            <div  onClick={()=>setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              {/* <FontAwesomeIcon className='h-5 mx-4' icon={faStripe} /> */}
              <p className='text-gray-500 text-sm font-medium mx-4 '>CASH ON DELIVERY</p>
            </div>
            
            <div className='w-full text-end mt-8'>
                <button onClick={()=>navigate("/orders")} className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder