const Order = require("../models/payment")

exports.createOrder = async () => {
    try {
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET,
        });
        const options = {
            amount: req.body.amount,
            currency: 'INR',
        };
        const order = await instance.orders.create(options);
        console.log(order)
        if (!order) return res.status(500).send('Some error occured');
        res.send(order);
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.payOrder = async () => {
    try {
        const { amount, razorpayPaymentId, razorpayOrderId, razorpaySignature } =
            req.body;
        const newOrder = Order({
            isPaid: true,
            amount: amount,
            razorpay: {
                orderId: razorpayOrderId,
                paymentId: razorpayPaymentId,
                signature: razorpaySignature,
            },
        });
        await newOrder.save();
        res.send({
            msg: 'Payment was successfull',
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.listOrders = async () => {
    const orders = await Order.find();
    res.send(orders);
}


exports.payment = () => {
    res.send({ key: process.env.RAZORPAY_KEY_ID });
}