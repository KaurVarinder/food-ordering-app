import { Link } from "react-router-dom";

export const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center sm:text-left">
                <div>
                    <h2 className="mb-6 text-sm font-semibold text-gray-400 uppercase">Company</h2>
                    <ul>
                        <li className="mb-4">
                            <Link to="/about" className="hover:underline">About Us</Link>
                        </li>
                        <li className="mb-4">
                            <Link to="/menu" className="hover:underline">Menu</Link>
                        </li>
                        <li className="mb-4">
                            <Link to="/careers" className="hover:underline">Careers</Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h2 className="mb-6 text-sm font-semibold text-gray-400 uppercase">Customer Service</h2>
                    <ul>
                        <li className="mb-4">
                            <Link to="/help" className="hover:underline">Help & FAQs</Link>
                        </li>
                        <li className="mb-4">
                            <Link to="/order-tracking" className="hover:underline">Order Tracking</Link>
                        </li>
                        <li className="mb-4">
                            <Link to="/contact-support" className="hover:underline">Contact Support</Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h2 className="mb-6 text-sm font-semibold text-gray-400 uppercase">Legal</h2>
                    <ul>
                        <li className="mb-4">
                            <Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link>
                        </li>
                        <li className="mb-4">
                            <Link to="/terms" className="hover:underline">Terms & Conditions</Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h2 className="mb-6 text-sm font-semibold text-gray-400 uppercase">Contact Us</h2>
                    <ul>
                        <li className="mb-4">
                            <span>New Janta Nagar Daba Road, Ludhiana, Punjab</span>
                        </li>
                        <li className="mb-4">
                            <a href="tel:+918360335531" className="hover:underline">+91 8360335531</a>
                        </li>
                        <li className="mb-4">
                            <a href="mailto:support@fooddelivery.com" className="hover:underline">support@fooddelivery.com</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-gray-700 py-6 px-4 bg-gray-700 flex flex-col md:flex-row md:justify-between md:items-center text-center md:text-left">
                <span className="text-sm text-gray-300 text-center md:text-left">
                    &copy; 2025 Food Delivery. All Rights Reserved.
                </span>
                <div className="flex justify-center mt-4 md:mt-0 space-x-6">
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">Twitter</a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">Facebook</a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">Instagram</a>
                </div>
            </div>
        </footer>
    );
};
