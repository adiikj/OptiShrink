import React from 'react';
import Header from '../dashboard/Header';
import VHeader from '../dashboard/VHeader';
import { Info, CheckCircle, FileText, Clock } from 'lucide-react';

const About: React.FC = () => {
    return (
        <div className="min-h-screen">
            <Header />
            <div className="flex flex-col md:flex-row">
                <VHeader />
                <div className="w-full bg-gray-50 rounded-lg shadow-lg p-8 md:p-16 mt-4 md:mt-1">
                    <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-8">About</h1>
                    <p className="text-gray-600 mb-12 text-lg md:text-xl">
                        OptiShrink is a fast and reliable tool for compressing and shortening images and PDFs. We help you optimize your files for better performance while retaining quality.
                    </p>

                    <div className="space-y-12 md:space-y-10">
                        {/* Mission Section */}
                        <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
                            <div className="flex justify-center items-center">
                                <Info className="text-blue-600 w-16 h-16" />
                            </div>
                            <div className="md:w-2/3">
                                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">Our Mission</h2>
                                <p className="text-gray-700 text-md md:text-xl">
                                    At OptiShrink, our mission is to provide the most efficient and user-friendly compression tool for both images and PDFs. We aim to help users reduce file size without compromising quality, ensuring faster loading times and improved user experience across web and mobile platforms.
                                </p>
                            </div>
                        </div>

                        {/* Why Choose Us Section */}
                        <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
                            <div className="flex justify-center items-center">
                                <CheckCircle className="text-green-500 w-16 h-16" />
                            </div>
                            <div className="md:w-2/3">
                                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">Why Choose Us?</h2>
                                <ul className="list-disc pl-6 space-y-4 text-md md:text-xl text-gray-700">
                                    <li>Fast and easy-to-use interface</li>
                                    <li>High-quality compression algorithms</li>
                                    <li>Supports both images and PDFs</li>
                                    <li>Free with no signup required</li>
                                </ul>
                            </div>
                        </div>

                        {/* Features Section */}
                        <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
                            <div className="flex justify-center items-center">
                                <FileText className="text-blue-600 w-16 h-16" />
                            </div>
                            <div className="md:w-2/3">
                                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">Key Features</h2>
                                <p className="text-gray-700 text-md md:text-xl">
                                    OptiShrink offers a variety of features to meet your compression needs:
                                    <ul className="list-disc pl-6 space-y-2 mt-4">
                                        <li>Supports multiple formats: JPEG, PNG, PDF, etc.</li>
                                        <li>Real-time compression with progress tracking</li>
                                        <li>Multiple quality options for different use cases</li>
                                    </ul>
                                </p>
                            </div>
                        </div>

                        {/* Speed and Efficiency Section */}
                        <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
                            <div className="flex justify-center items-center">
                                <Clock className="text-yellow-500 w-16 h-16" />
                            </div>
                            <div className="md:w-2/3">
                                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">Speed and Efficiency</h2>
                                <p className="text-gray-700 text-md md:text-xl">
                                    OptiShrink is designed with speed and efficiency in mind, allowing users to compress large files in a fraction of the time compared to other tools. Our optimized algorithms ensure that even the largest files can be processed quickly without sacrificing quality.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
