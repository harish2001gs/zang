import axios from "axios";
import React, { useEffect, useState } from "react";

function Payment() {
  const total = localStorage.getItem("total");

  const [pay, setPay] = useState({
    name: "Zang It",
    price: total,
  });

  const initPayment = (data) => {
    const options = {
      key: "rzp_test_awSOd88V7EAs3V",
      amount: data.amount,
      currency: data.currency,
      name: pay.name,
      description: "Test Transaction",
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyUrl = "http://localhost:5000/api/payment/verify";
          const { data } = await axios.post(verifyUrl, response);
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePayment = async () => {
    try {
      const orderUrl = "http://localhost:5000/api/payment/orders";
      const { data } = await axios.post(orderUrl, { amount: pay.price });
      console.log(data);
      initPayment(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App" style={{ marginBottom: "10vw" }}>
      <div className="pay_container" style={{ marginTop: "20vw" }}>
        <p className="pay_name">{pay.name}</p>
        <p className="price">
          Price : <span>&#x20B9; {pay.price}</span>
        </p>
        <button onClick={handlePayment} className="btn">
          Pay
        </button>
      </div>
    </div>
  );
}

export default Payment;

// const [loading, setLoading] = useState(false);
// const [orderAmount, setOrderAmount] = useState(0);
// const [orders, setOrders] = useState([]);

// async function fetchOrders() {
//   const { data } = await axios.get('/list-orders');
//   setOrders(data);
// }
// useEffect(() => {
//   fetchOrders();
// }, []);

// const loadRazorpay = () => {
//   const script = document.createElement('script');
//   script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//   script.onerror = () => {
//     alert('Razorpay SDK failed to load. Are you online?');
//   };
//   script.onload = async () => {
//     try {
//       setLoading(true);
//       const result = await axios.post('create-order', {
//         amount: orderAmount + '00',
//       });
//       const { amount, id: order_id, currency } = result.data;
//       const {
//         data: { key: razorpayKey },
//       } = await axios.get('/get-razorpay-key');

//       const options = {
//         key: razorpayKey,
//         amount: amount.toString(),
//         currency: currency,
//         name: 'example name',
//         description: 'example transaction',
//         order_id: order_id,
//         handler: async function (response) {
//           const result = await axios.post('/pay-order', {
//             amount: amount,
//             razorpayPaymentId: response.razorpay_payment_id,
//             razorpayOrderId: response.razorpay_order_id,
//             razorpaySignature: response.razorpay_signature,
//           });
//           alert(result.data.msg);
//           fetchOrders();
//         },
//         prefill: {
//           name: 'example name',
//           email: 'email@example.com',
//           contact: '111111',
//         },
//         notes: {
//           address: 'example address',
//         },
//         theme: {
//           color: '#80c0f0',
//         },
//       };

//       setLoading(false);
//       const paymentObject = new window.Razorpay(options);
//       paymentObject.open();
//     } catch (err) {
//       alert(err);
//       setLoading(false);
//     }
//   };
//   document.body.appendChild(script);
// }

// return (
//   <div className="App" style={{marginTop:"15vw"}}>
//     <h1> Razorpay Example: Node & React</h1>
//     <hr />
//     <div>
//       <h2> Pay Order</h2>
//       <label>
//         Amount:{' '}
//         <input
//           placeholder="INR"
//           type="number"
//           value={orderAmount}
//           onChange={(e) => setOrderAmount(e.target.value)}
//         ></input>
//       </label>

//       <button disabled={loading} onClick={loadRazorpay}>
//         Razorpay
//       </button>
//       {loading && <div>Loading...</div>}
//     </div>
//     <div className="list-orders">
//       <h2>List Orders</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>AMOUNT</th>
//             <th>ISPAID</th>
//             <th>RAZORPAY</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.map((x) => (
//             <tr key={x._id}>
//               <td>{x._id}</td>
//               <td>{x.amount / 100}</td>
//               <td>{x.isPaid ? 'YES' : 'NO'}</td>
//               <td>{x.razorpay.paymentId}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   </div>
// );
