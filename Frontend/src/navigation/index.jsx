import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "../components/Header";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Menu from "../pages/Menu";
import Cart from "../pages/Cart";
import PaymentSuccess from "../pages/PaymentSuccess";
import { useSelector } from "react-redux";
import { cartProducts } from "../stores/Cart/cartSlice";
import { Footer } from "../components/Footer";

const Navigation = () => {
    const productsInCart = useSelector(cartProducts);
    return (
        <BrowserRouter>
            <div className="flex flex-col min-h-screen">
                <Header cartCount={productsInCart ? productsInCart.length : 0} />
                <div className="flex-grow"> 
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/menu" element={<Menu />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/payment-success" element={<PaymentSuccess />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </BrowserRouter>
    )
}

export default Navigation;