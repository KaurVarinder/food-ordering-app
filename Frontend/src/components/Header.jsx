import foody from "../assets/images/foody.png";
import { Link } from "react-router-dom";
import Button from "./elements/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


export const Header = ({ cartCount }) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check login status from localStorage
        const loggedIn = localStorage.getItem("isLoggedIn") === "true";
        setIsLoggedIn(loggedIn);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn"); // Clear login status
        setIsLoggedIn(false);
        navigate("/login");
        window.location.reload(); // Ensure UI updates instantly
    };

    // Scroll to About Section
    const scrollToAbout = () => {
        if (window.location.pathname !== "/") {
            navigate("/"); // Navigate to home first
            setTimeout(() => {
                document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
            }, 100); // Delay to ensure home page loads
        } else {
            document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
        }
    };


    return (
        <nav id="header" className="bg-black text-white">
            <div className="w-full container mx-auto flex flex-col md:flex-row items-center justify-between mt-0 py-2">
                <div className="logo-wrapper pl-4 flex items-center">
                    <Link to="/" className="toggleColor text-white no-underline hover:no-underline font-bold text-2xl lg:text">
                        <img src={foody} alt="logo" className="w-24 h-24 md:w-40 md:h-40 object-cover" />
                    </Link>
                </div>
                <div className="nav-menu-wrapper flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-10">
                    <Link to="/" className="text-xl">Home</Link>
                    <button onClick={scrollToAbout} className="text-xl cursor-pointer">About</button>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-4 mx-4">
                    <Link to="/cart" className="mr-4 relative">
                        Cart
                        {cartCount > 0 ? <div className="rounded-full bg-yellow-400 text-white inline-flex justify-center items-center w-full absolute -top-3 -right-6">{cartCount}</div> : null}
                    </Link>
                    {
                        isLoggedIn ?
                            (<Button onClick={handleLogout}>Log Out</Button>) :
                            (
                                <>
                                    <Link to="/login">Login</Link>
                                    <Link to="/register">Sign Up</Link>
                                </>
                            )
                    }
                </div>
            </div>
        </nav>
    )
}