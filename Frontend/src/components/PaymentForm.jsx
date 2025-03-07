import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { cartProducts, clearCart } from "../stores/Cart/cartSlice";  // Import cart products selector

const PaymentForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector(cartProducts); // Get cart items from Redux store

    // Calculate total amount from cart
    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.amount, 0);

    const handlePayment = async () => {
        // Check if the user is logged in
        const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

        if (!isLoggedIn) {
            toast.error("You need to log in first to proceed with payment.");

            setTimeout(() => {
                navigate("/login", { state: { from: "/payment" } });
            }, 5000);

            return;
        }


        try {
            if (totalAmount <= 0) {
                toast.error("Cart is empty.");
                return;
            }

            // Fetch Razorpay Key
            const { data: keyData } = await axios.get("https://food-ordering-app-xg2o.onrender.com/api/getkey");
            const razorpayKey = keyData.key;

            // Create order with correct amount
            const { data: orderDetails } = await axios.post("https://food-ordering-app-xg2o.onrender.com/api/checkout", {
                amount: totalAmount
            });

            const options = {
                key: razorpayKey,
                amount: orderDetails.order.amount,
                currency: orderDetails.order.currency,
                name: "Varinder Kaur",
                description: "Test Transaction",
                image: "https://example.com/your_logo",
                order_id: orderDetails.order.id,
                callback_url: "https://food-ordering-app-xg2o.onrender.com/api/paymentverification",
                prefill: {
                    name: "Gaurav Kumar",
                    email: "gaurav.kumar@example.com",
                    contact: "9000090000"
                },
                notes: {
                    "address": "Razorpay Corporate Office"
                },
                theme: {
                    "color": "#3399cc"
                },
                handler: function (response) {
                    dispatch(clearCart());
                    navigate("/payment-success");
                },
            };

            // Ensure Razorpay script is loaded
            if (window.Razorpay) {
                const razor = new window.Razorpay(options);
                razor.open();
            } else {
                console.error("Razorpay SDK not loaded.");
                toast.error("Payment gateway not available. Please refresh.");
            }
        } catch (error) {
            console.error("Payment error:", error);
        }
    };

    return (
        <form className="md:-2/3 md:mx-auto px-2 pt-1">
            <label htmlFor="card-element" className="pt-4 text-2xl md:text-center">
                Please enter your details and pay.
            </label>
            <div className="flex justify-center p-2">
                <button type="button" onClick={handlePayment} className="bg-blue-500 text-white px-4 py-2 rounded">
                    PAY ₹{totalAmount}
                </button>
            </div>
            <ToastContainer />
        </form>
    );
};

export default PaymentForm;
