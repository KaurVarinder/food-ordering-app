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
        const loggedIn = localStorage.getItem("isLoggedIn") === "true";
        setIsLoggedIn(loggedIn);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        setIsLoggedIn(false);
        navigate("/login");
        window.location.reload();
    };

    const scrollToAbout = () => {
        if (window.location.pathname !== "/") {
            navigate("/");
            setTimeout(() => {
                document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
            }, 100);
        } else {
            document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <nav id="header" className="bg-black text-white">
            <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
                <div className="logo-wrapper pl-4 flex items-center">
                    <Link to="/">
                        <img src={foody} alt="logo" className="w-40 h-40 object-cover" />
                    </Link>
                </div>
                
                {/* Home & About (Always Visible) */}
                <div className="nav-menu-wrapper flex items-center justify-between space-x-10">
                    <Link to="/" className="text-xl">Home</Link>
                    <button onClick={scrollToAbout} className="text-xl cursor-pointer">About</button>
                </div>
                
                {/* Cart, Login, Signup */}
                <div className="relative">
                    <button className="md:hidden text-white text-3xl" onClick={() => setMenuOpen(!menuOpen)}>
                        ☰
                    </button>

                    {/* Dropdown Menu */}
                    <div className={`absolute top-full right-0 bg-black text-white flex flex-col space-y-2 p-4 rounded-lg shadow-lg ${menuOpen ? "block" : "hidden"} md:flex md:relative md:top-0 md:bg-transparent md:p-0 md:space-y-0 md:flex-row md:items-center`}>
                        <Link to="/cart" className="relative text-xl">
                            Cart
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-3 bg-yellow-400 text-white rounded-full text-sm px-2">{cartCount}</span>
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
                </div>
            </div>
        </nav>
    );
};
