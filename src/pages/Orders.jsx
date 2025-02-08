import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../component/Title';
import axios from 'axios';

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }

      const response = await axios.post(
        backendUrl + '/api/order/userorders',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data); // Log the response to inspect its structure
      response.data.data.forEach((order) => {
        console.log(order.items); // Log items for each order to inspect the structure
      });

      if (response.data.success && response.data.data && response.data.data.length > 0) {
        let allOrderItem = [];
        response.data.data.forEach((order) => {
          const item = {}; // Create a new object for each order
          item['status'] = order.status;
          item['payment'] = order.payment;
          item['paymentMethod'] = order.paymentMethod;
          item['date'] = new Date(order.date).toLocaleDateString(); // Format the date
          
          // Ensure order.items exists and contains items
          if (order.items && order.items.length > 0) {
            item['name'] = order.items[0].name || 'Item Not Available'; // Fallback if no items
            item['image'] = order.items[0].image || ''; // Fallback for image
            item['price'] = order.items[0].price || order.amount; // Fallback to total amount
            item['quantity'] = order.items[0].quantity || 'N/A'; // Extract quantity
            item['colour'] = order.items[0].colour || 'Not Available'; // Extract colour
          }

          allOrderItem.push(item);
        });

        setOrderData(allOrderItem.reverse()); // Update the state with the order data
      } else {
        console.error('Orders data is missing or invalid.');
      }
    } catch (error) {
      console.error('Error fetching user orders:', error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>
      <div>
        {orderData.length > 0 ? (
          orderData.slice(0, 3).map((item, index) => (
            <div key={index} className="py-4 border-t to-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-start gap-6 text-sm">
                <img className="w-16 sm:w-20" src={item.image || 'fallback-image-url'} alt="" />
                <div>
                  <p className="sm:text-base font-medium">{item.name}</p>
                  <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                    <p className="text-lg">{currency}{item.price}</p>
                    <p className="sm:text-base font-medium">Quantity: {item.quantity}</p>
                    <p className="sm:text-base font-medium">Colour: {item.colour}</p>
                  </div>
                  <p className="mt-2">Date: <span className="text-gray-400">{item.date}</span></p>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-between">
                <div className="flex items-center gap-2">
                  <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                  <p className="text-sm md:text-base">Ready to ship</p>
                </div>
                <button className="border px-4 py-2 text-sm font-medium rounded-sm">Track Order</button>
              </div>
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
