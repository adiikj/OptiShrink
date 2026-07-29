import React, { useState, useEffect } from 'react';
import Header from '../dashboard/Header';
import VHeader from '../dashboard/VHeader';
import { FileIcon, DownloadIcon, ImageIcon, FileTextIcon } from 'lucide-react'; // Importing Lucide icons

const Analytics: React.FC = () => {
    const [analyticsData, setAnalyticsData] = useState<any>(null);

    useEffect(() => {
        // Simulating fetching analytics data
        setAnalyticsData({
            totalShortenedFiles: 3500,
            totalDownloads: 7800,
            totalImages: 2500,
            totalPDFs: 1000,
        });
    }, []);

    return (
        <div className="">
            <Header />
            <div className="min-h-screen flex flex-col md:flex-row">
                <VHeader />
                <div className="bg-gray-50 rounded-lg shadow-lg p-8 md:p-16 mt-4 md:mt-1 w-full">
                    <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">Analytics</h1>
                    <p className="text-gray-600 mb-8 text-lg md:text-xl">
                        Track the key metrics of your image and PDF shortening service.
                    </p>

                    {/* Analytics Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                            <div className="flex items-center mb-4">
                                <FileIcon className="text-blue-600 w-8 h-8 mr-4" />
                                <h3 className="text-xl font-semibold text-gray-800">Total Files</h3>
                            </div>
                            <p className="text-3xl font-bold text-blue-600">{analyticsData?.totalShortenedFiles}</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                            <div className="flex items-center mb-4">
                                <DownloadIcon className="text-blue-600 w-8 h-8 mr-4" />
                                <h3 className="text-xl font-semibold text-gray-800">Total Downloads</h3>
                            </div>
                            <p className="text-3xl font-bold text-blue-600">{analyticsData?.totalDownloads}</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                            <div className="flex items-center mb-4">
                                <ImageIcon className="text-blue-600 w-8 h-8 mr-4" />
                                <h3 className="text-xl font-semibold text-gray-800">Total Images</h3>
                            </div>
                            <p className="text-3xl font-bold text-blue-600">{analyticsData?.totalImages}</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                            <div className="flex items-center mb-4">
                                <FileTextIcon className="text-blue-600 w-8 h-8 mr-4" />
                                <h3 className="text-xl font-semibold text-gray-800">Total PDFs</h3>
                            </div>
                            <p className="text-3xl font-bold text-blue-600">{analyticsData?.totalPDFs}</p>
                        </div>
                    </div>

                    {/* Recent Activities Section */}
                    <div className="mt-10 bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Activities</h2>
                        <ul className="space-y-3">
                            <li className="py-2 border-b border-gray-200">
                                <span className="font-semibold">user123</span> shortened an image file.
                            </li>
                            <li className="py-2 border-b border-gray-200">
                                <span className="font-semibold">admin</span> generated a download report.
                            </li>
                            <li className="py-2 border-b border-gray-200">
                                <span className="font-semibold">jane_doe</span> downloaded a PDF.
                            </li>
                            <li className="py-2">
                                <span className="font-semibold">john_smith</span> shortened a PDF file.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
