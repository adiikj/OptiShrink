import React from 'react';
import herobanner from '../../assets/herobanner.jpg';
import herobanner2 from '../../assets/herobanner2.jpg';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
    return (
        <section className="relative bg-gradient-to-r from-blue-50 via-white to-blue-100 h-screen flex items-center overflow-x-hidden">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
                {/* Text Content */}
                <div className="md:w-1/2 text-center md:text-left px-2 pl-0 md:pl-20">
                    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-800 mb-6">
                        Compress PDF & Images <br />
                        <span className="text-blue-500 leading-snug">With Ease & Precision</span>
                    </h1>
                    <p className="text-lg text-gray-600 mb-8">
                        Reduce PDF sizes, optimize images, and save storage—all in a single tool built for speed and security.
                    </p>
                    <div className="flex justify-center md:justify-start space-x-4">
                        <Link
                            to="/optimizeimage"
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
                        >
                            Try for Free
                        </Link>
                        <a
                            href="#learn-more"
                            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-300"
                        >
                            Learn More
                        </a>
                    </div>
                </div>

                {/* Image Content */}
                <div className="md:w-1/2 md:flex justify-center relative hidden">
                    <div className="relative w-80 h-80 md:w-[400px] md:h-[400px]">
                        <img
                            src={herobanner}
                            alt="File Compression Illustration"
                            className="absolute -top-10 -left-12 w-full h-full object-cover rounded-lg shadow-lg"
                        />
                        <img
                            src={herobanner2}
                            alt="Image Compression Illustration"
                            className="absolute -bottom-12 -right-32 w-72 h-72 object-cover rounded-lg shadow-lg"
                        />
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -bottom-6 -left-6 bg-blue-200 w-20 h-20 rounded-full opacity-70 animate-pulse"></div>
                    <div className="absolute -top-6 -right-6 bg-blue-400 w-16 h-16 rounded-full opacity-50"></div>
                </div>
            </div>

            {/* Background Shapes */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-blue-100 w-96 h-96 rounded-full blur-3xl opacity-30"></div>
                <div className="absolute bottom-0 right-1/4 bg-blue-300 w-72 h-72 rounded-full blur-2xl opacity-20"></div>
            </div>
        </section>
    );
};

export default Hero;
