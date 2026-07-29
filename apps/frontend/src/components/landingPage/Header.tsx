import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // Import Menu and X icons from Lucide React

const Header: React.FC = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen((prev) => !prev);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
        <header className="w-full bg-white shadow-md top-0 z-50">
            <div className="container mx-auto flex justify-between items-center py-4 px-6 md:px-20">
                {/* Logo */}
                <Link to="/">
                    <h1 className="text-2xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-blue-700 to-blue-500 text-transparent bg-clip-text">
                        OptiShrink
                    </h1>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-8 text-gray-700 text-md font-medium">
                    <Link
                        to="/optimizeimage"
                        className="hover:text-blue-500 transition duration-300"
                    >
                        Image Optimizer
                    </Link>
                    <Link
                        to="/compressfile"
                        className="hover:text-blue-500 transition duration-300"
                    >
                        PDF Compressor
                    </Link>
                    <a href="#pricing" className="hover:text-blue-500 transition duration-300">
                        Pricing
                    </a>
                    <a href="#contact" className="hover:text-blue-500 transition duration-300">
                        Contact
                    </a>
                </nav>

                {/* Desktop Call to Action */}
                <div className="hidden md:flex space-x-6">
                    <Link
                        to="/signin"
                        className="px-6 py-2 text-gray-700 border bg-gray-200 rounded-md hover:bg-gray-300 transition duration-300"
                    >
                        Login
                    </Link>
                    <Link
                        to="/signup"
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                    >
                        Sign Up
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="block md:hidden text-gray-600 focus:outline-none"
                    onClick={toggleMobileMenu}
                >
                    {/* Toggle between hamburger and close icon */}
                    {isMobileMenuOpen ? (
                        <X className="h-6 w-6" />
                    ) : (
                        <Menu className="h-6 w-6" />
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white shadow-md">
                    <nav className="flex flex-col space-y-4 px-6 py-4 text-gray-700 text-md font-medium">
                        <Link
                            to="/optimizeimage"
                            className="hover:text-blue-500 transition duration-300"
                            onClick={closeMobileMenu} // Close the menu on click
                        >
                            Image Optimizer
                        </Link>
                        <Link
                            to="/compressfile"
                            className="hover:text-blue-500 transition duration-300"
                            onClick={closeMobileMenu} // Close the menu on click
                        >
                            PDF Compressor
                        </Link>
                        <a
                            href="#pricing"
                            className="hover:text-blue-500 transition duration-300"
                            onClick={closeMobileMenu} // Close the menu on click
                        >
                            Pricing
                        </a>
                        <a
                            href="#contact"
                            className="hover:text-blue-500 transition duration-300"
                            onClick={closeMobileMenu} // Close the menu on click
                        >
                            Contact
                        </a>
                    </nav>
                    <div className="flex flex-row gap-4 px-6 py-4">
                        <Link
                            to="/signin"
                            className="px-6 py-2 text-gray-700 border bg-gray-200 rounded-md hover:bg-gray-300 transition duration-300"
                            onClick={closeMobileMenu} // Close the menu on click
                        >
                            Login
                        </Link>
                        <Link
                            to="/signup"
                            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                            onClick={closeMobileMenu} // Close the menu on click
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
