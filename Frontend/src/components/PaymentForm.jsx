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
            alert("You need to log in first to proceed with payment.");
            navigate("/login", { state: { from: "/payment" } }); // Redirect to login and return to payment after login
            return;
        }

        try {
            if (totalAmount <= 0) {
                alert("Cart is empty or invalid amount!");
                return;
            }

            // Fetch Razorpay Key
            const { data: keyData } = await axios.get("http://localhost:8001/api/getkey");
            const razorpayKey = keyData.key;

            // Create order with correct amount
            const { data: orderDetails } = await axios.post("http://localhost:8001/api/checkout", {
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
                callback_url: "http://localhost:8001/api/paymentverification",
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
                alert("Payment gateway not available. Please refresh.");
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
        </form>
    );
};

export default PaymentForm;
