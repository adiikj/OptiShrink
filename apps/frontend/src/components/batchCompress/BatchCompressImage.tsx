import React, { useState } from 'react';
import { optimizeImage } from '../../api/api'; // Assuming you have optimizeImage function
import Header from '../dashboard/Header';
import VHeader from '../dashboard/VHeader';
import { Link } from 'react-router-dom';

const BatchCompress: React.FC = () => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]); // For multiple files
    const [compressionLevel, setCompressionLevel] = useState<string | null>(null);
    const [downloadUrls, setDownloadUrls] = useState<string[]>([]); // For storing URLs of compressed files

    const handleCompressClick = async () => {
        if (selectedFiles.length === 0 || !compressionLevel) return;

        setIsProcessing(true);
        setProgress(0);
        setDownloadUrls([]);

        try {
            // Simulate batch processing
            const promises = selectedFiles.map(async (file) => {
                const response = await optimizeImage(file, compressionLevel);
                if (response.success) {
                    return response.data; // Assuming it returns the URL
                } else {
                    throw new Error('Compression failed');
                }
            });

            const urls = await Promise.all(promises);
            setDownloadUrls(urls);
            setIsProcessing(false);
            setShowPopup(true);
        } catch (error) {
            console.error('Error during batch compression:', error);
            setIsProcessing(false);
        }
    };


    const handleDownload = () => {
        downloadUrls.forEach((url, index) => {
            fetch(url)
                .then((res) => res.blob())
                .then((blob) => {
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.download = `optimized-image-${index + 1}.jpg`; // Default filename with index
                    link.click();
                })
                .catch((error) => console.error('Download failed:', error));
        });
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    return (
        <div className=" flex flex-col bg-gray-50">
            <Header />
            <div className="flex min-h-screen">
                <VHeader />
                <div className="w-full bg-gray-50 mt-3 p-10 md:p-16 max-w-7xl">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 ">
                        Batch Optimize Your Images
                    </h1>
                    <Link to="/dashboard/batchcompress">
                    <button className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl'>Go Back</button>
                    </Link>
                    </div>
                    <p className="text-gray-600 mb-8">
                        Optimize multiple images at once. Reduce image size while retaining quality.
                    </p>
                    

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        {/* File Upload Section */}
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 hover:border-blue-500 transition">
                            <input
                                type="file"
                                id="file-upload"
                                className="hidden"
                                accept="image/*,application/pdf"
                                multiple
                                onChange={(e) => {
                                    const files = e.target.files;
                                    if (files) {
                                        setSelectedFiles(Array.from(files));
                                    }
                                }}
                            />
                            <label
                                htmlFor="file-upload"
                                className="block text-gray-600 text-md md:text-lg font-medium cursor-pointer hover:text-blue-500 text-center"
                            >
                                {selectedFiles.length > 0 ? (
                                    <div>
                                        {selectedFiles.map((file, index) => (
                                            <p key={index} className="text-gray-600">{file.name}</p>
                                        ))}
                                    </div>
                                ) : (
                                    <>
                                        Drag and drop your images here or{' '}
                                        <span className="text-blue-600 font-semibold">browse</span>
                                    </>
                                )}
                            </label>
                        </div>

                        {/* Compression Level and Action Section */}
                        <div>
                            {selectedFiles.length > 0 && (
                                <>
                                    <p className="text-gray-600 text-lg md:text-xl font-medium mb-4">
                                        Choose Compression Level:
                                    </p>
                                    <div className="flex flex-col space-y-4 mb-6">
                                        {[
                                            {
                                                level: 'low',
                                                title: 'Low Compression',
                                                description:
                                                    'High quality, minimal compression. Suitable for professional use.',
                                            },
                                            {
                                                level: 'mid',
                                                title: 'Medium Compression',
                                                description:
                                                    'Balanced quality and file size. Recommended for general-purpose use.',
                                            },
                                            {
                                                level: 'high',
                                                title: 'High Compression',
                                                description:
                                                    'Lower quality, maximum compression. Best for web and social media.',
                                            },
                                        ].map((option) => (
                                            <div
                                                key={option.level}
                                                className={`p-4 rounded-lg border transition cursor-pointer ${
                                                    compressionLevel === option.level
                                                        ? 'border-blue-600 bg-blue-50'
                                                        : 'border-gray-300 hover:border-blue-500'
                                                }`}
                                                onClick={() => setCompressionLevel(option.level)}
                                            >
                                                <h3
                                                    className={`text-lg font-semibold ${
                                                        compressionLevel === option.level
                                                            ? 'text-blue-600'
                                                            : 'text-gray-800'
                                                    }`}
                                                >
                                                    {option.title}
                                                </h3>
                                                <p className="text-gray-600">{option.description}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        className={`py-3 px-6 rounded-lg font-semibold transition ${
                                            isProcessing || !compressionLevel
                                                ? 'bg-gray-400 text-gray-800 cursor-not-allowed hidden'
                                                : 'bg-blue-600 text-white hover:bg-blue-700'
                                        }`}
                                        onClick={handleCompressClick}
                                        disabled={isProcessing || !compressionLevel}
                                    >
                                        {isProcessing ? 'Optimizing...' : 'Compress All Images'}
                                    </button>

                                    {isProcessing && (
                                        <div className="mt-6">
                                            <div className="w-full bg-gray-200 rounded-full h-4">
                                                <div
                                                    className="bg-blue-600 h-full rounded-full transition-all duration-300 ease-in-out"
                                                    style={{ width: `${progress}%` }}
                                                ></div>
                                            </div>
                                            <p className="mt-2 text-gray-600">{progress}% Complete</p>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>

                    {/* Popup */}
                    {showPopup && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-lg shadow-lg p-6 w-96 text-center">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                                    Batch Compression Complete!
                                </h2>
                                <p className="text-gray-600 mb-6">Your files are ready to download.</p>
                                <button
                                    className="bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition"
                                    onClick={handleDownload}
                                >
                                    Download All
                                </button>
                                <button
                                    className="border-2 border-blue-600 text-blue-500 ml-3 py-1.5 px-4 rounded-lg font-semibold hover:bg-gray-100 transition"
                                    onClick={closePopup}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BatchCompress;
