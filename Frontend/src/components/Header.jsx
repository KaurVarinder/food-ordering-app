import foody from "../assets/images/foody.png";
import { Link } from "react-router-dom";
import Button from "./elements/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const Header = ({ cartCount }) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);


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
            <div className="w-full container mx-auto flex items-center justify-between py-4 px-4">
                {/* Logo */}
                <div className="logo-wrapper pl-4 flex items-center">
                    <Link to="/">
                        <img src={foody} alt="logo" className="w-24 h-24 md:w-40 md:h-40 object-cover" />
                    </Link>
                </div>

                {/* Home & About - Always Visible */}
                <div className="flex items-center space-x-6">
                    <Link to="/" className="text-xl">Home</Link>
                    <button onClick={scrollToAbout} className="text-xl">About</button>
                </div>

                {/* Mobile Menu Button (for Cart & Auth Links) */}
                <button className="md:hidden text-white text-3xl" onClick={() => setMenuOpen(!menuOpen)}>
                    ☰
                </button>

                {/* Desktop Menu - Always Visible */}
                <div className="hidden md:flex items-center space-x-6">
                    <Link to="/cart" className="relative text-xl">
                        Cart
                        {cartCount > 0 && (
                            <div className="absolute -top-2 -right-3 bg-yellow-400 text-white rounded-full text-sm px-2">{cartCount}</div>
                        )}
                    </Link>
                    {isLoggedIn ? (
                        <Button onClick={handleLogout}>Log Out</Button>
                    ) : (
                        <>
                            <Link to="/login" className="text-xl">Login</Link>
                            <Link to="/register" className="text-xl">Sign Up</Link>
                        </>
                    )}
                </div>

                {/* Mobile Dropdown - Cart, Login, Sign Up */}
                {menuOpen && (
                    <div className="absolute top-20 right-4 w-48 bg-black text-white flex flex-col items-center space-y-4 py-4 md:hidden">
                        <Link to="/cart" className="relative text-xl">
                            Cart
                            {cartCount > 0 && (
                                <div className="absolute -top-2 -right-3 bg-yellow-400 text-white rounded-full text-sm px-2">{cartCount}</div>
                            )}
                        </Link>
                        {isLoggedIn ? (
                            <Button onClick={handleLogout}>Log Out</Button>
                        ) : (
                            <>
                                <Link to="/login" className="text-xl">Login</Link>
                                <Link to="/register" className="text-xl">Sign Up</Link>
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>

    )
}