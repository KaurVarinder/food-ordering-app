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
        <nav className="bg-black text-white">
            <div className="w-full container mx-auto flex items-center justify-between py-2 px-4">
                <Link to="/" className="flex items-center">
                    <img src={foody} alt="logo" className="w-24 h-24 md:w-40 md:h-40 object-cover" />
                </Link>

                <button className="md:hidden text-white text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
                    ☰
                </button>

                <div className={`md:flex items-center space-x-6 ${menuOpen ? "block" : "hidden"} absolute md:static top-16 left-0 w-full md:w-auto bg-black md:bg-transparent p-4 md:p-0`}>
                    <Link to="/" className="text-xl block md:inline">Home</Link>
                    <button onClick={scrollToAbout} className="text-xl block md:inline">About</button>
                    <Link to="/cart" className="relative block md:inline">
                        Cart
                        {cartCount > 0 && (
                            <div className="absolute -top-2 -right-3 bg-yellow-400 text-white rounded-full text-sm px-2">{cartCount}</div>
                        )}
                    </Link>
                    {isLoggedIn ? (
                        <Button onClick={handleLogout}>Log Out</Button>
                    ) : (
                        <>
                            <Link to="/login" className="block md:inline">Login</Link>
                            <Link to="/register" className="block md:inline">Sign Up</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>

    )
}