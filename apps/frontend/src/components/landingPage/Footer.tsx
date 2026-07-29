import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-50 py-10">
            <div className="container mx-auto px-6 lg:px-20">
                {/* Top Section */}
                <div className="flex flex-col md:flex-row justify-between items-center">
                    {/* Logo & Tagline */}
                    <div className="text-center md:text-left mb-6 md:mb-0">
                    <h1 className="text-2xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-blue-400 to-blue-700 text-transparent bg-clip-text">
                        OptiShrink
                    </h1>

                        <p className="text-gray-600 text-sm mt-2">
                            Simplify, Secure, Shrink. Your go-to solution for file optimization.
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <ul className="flex flex-wrap justify-center space-x-6 text-gray-600 text-sm">
                        <li>
                            <a href="#" className="hover:text-blue-500 transition duration-300">
                                Privacy Policy
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-blue-500 transition duration-300">
                                Terms of Service
                            </a>
                        </li>
                        <li>
                            <a href="#contact" className="hover:text-blue-500 transition duration-300">
                                Contact Us
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200 my-8"></div>

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between items-center">
                    {/* Copyright */}
                    <p className="text-gray-600 text-sm text-center md:text-left">
                        &copy; 2025 OptiShrink. All rights reserved.
                    </p>

                    {/* Social Media Links */}
                    <ul className="flex space-x-4 mt-4 md:mt-0">
                        <li>
                            <a
                                href="#"
                                className="text-gray-600 hover:text-blue-500 transition duration-300"
                                aria-label="Facebook"
                            >
                                <FaFacebookF size={20} />
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="text-gray-600 hover:text-blue-500 transition duration-300"
                                aria-label="Twitter"
                            >
                                <FaTwitter size={20} />
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="text-gray-600 hover:text-blue-500 transition duration-300"
                                aria-label="Instagram"
                            >
                                <FaInstagram size={20} />
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="text-gray-600 hover:text-blue-500 transition duration-300"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedinIn size={20} />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
