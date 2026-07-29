import React from 'react';
import { FiCheckCircle, FiLock, FiTrendingUp } from 'react-icons/fi';

const WhyChoose: React.FC = () => {
    return (
        <section id="why-choose" className="bg-gray-50 min-h-screen flex items-center py-16">
            <div className="container mx-auto px-6 lg:px-20">
                {/* Title */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-gray-800 mb-4">
                        Why Choose <span className="font-extrabold bg-gradient-to-r from-blue-600 via-blue-400 to-blue-700 text-transparent bg-clip-text">OptiShrink?</span>
                    </h2>
                    <p className="text-gray-600 text-m text-xldmd: md:text-lg">
                        Beyond file compression, OptiShrink offers versatile tools to manage PDFs, optimize images, and ensure security. Here’s what sets us apart:
                    </p>
                </div>

                {/* Features Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {/* Feature 1 */}
                    <div className="flex items-start space-x-6 p-8 bg-white shadow-md rounded-lg hover:shadow-lg transition duration-300">
                        <div className="bg-blue-100 p-4 rounded-full">
                            <FiCheckCircle className="text-blue-600 text-xl md:text-3xl" />
                        </div>
                        <div>
                            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
                                Versatile Compression
                            </h3>
                            <p className="text-gray-600">
                                Compress PDFs, optimize images, and streamline your storage needs—all in one tool.
                            </p>
                        </div>
                    </div>

                    {/* Feature 2 */}
                    <div className="flex items-start space-x-6 p-8 bg-white shadow-md rounded-lg hover:shadow-lg transition duration-300">
                        <div className="bg-blue-100 p-4 rounded-full">
                            <FiTrendingUp className="text-blue-600 text-xl md:text-3xl" />
                        </div>
                        <div>
                            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
                                High Performance
                            </h3>
                            <p className="text-gray-600">
                                Enjoy faster compression speeds and higher efficiency without compromising quality.
                            </p>
                        </div>
                    </div>

                    {/* Feature 3 */}
                    <div className="flex items-start space-x-6 p-8 bg-white shadow-md rounded-lg hover:shadow-lg transition duration-300">
                        <div className="bg-blue-100 p-4 rounded-full">
                            <FiLock className="text-blue-600 text-xl md:text-3xl" />
                        </div>
                        <div>
                            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
                                Privacy First
                            </h3>
                            <p className="text-gray-600">
                                Advanced encryption ensures your files and data are secure every step of the way.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChoose;
