import React, { useState } from 'react';
import { optimizeImage } from '../../api/api'; // Assuming you have optimizeImage function
import Header from '../dashboard/Header';
import VHeader from '../dashboard/VHeader';

const Image: React.FC = () => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [compressionLevel, setCompressionLevel] = useState<string | null>(null);
    const [downloadUrl, setDownloadUrl] = useState<string>(''); // Store the image URL

    const handleCompressClick = async () => {
        if (!selectedImage || !compressionLevel) return;

        setIsProcessing(true);
        setProgress(0);

        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev < 75) return prev + 15; 
                return prev;
            });
        }, 600);

        try {
            // Call the optimizeImage API function
            const response = await optimizeImage(selectedImage, compressionLevel);

            // Check if the 'success' key is true in the response
            if (response.success) {
                setDownloadUrl(response.data); // Assuming the response contains Cloudinary URL
                setIsProcessing(false);
                setShowPopup(true);

                clearInterval(progressInterval);
                setProgress(100);
            } else {
                console.error('Error compressing image:', response.message);
                setIsProcessing(false);
            }
        } catch (error) {

            console.error('Error during image optimization:', error);
            setIsProcessing(false);
            clearInterval(progressInterval);

        }
    };

    const handleDownload = () => {
        // Fetch the image as a blob and trigger download
        if (downloadUrl) {
            fetch(downloadUrl)
                .then((res) => res.blob()) // Fetch image as blob
                .then((blob) => {
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.download = 'optimized-image.jpg'; // Default filename
                    link.click(); // Trigger download
                })
                .catch((error) => console.error('Download failed:', error));
        }
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    return (
        <div className="bg-gray-50">
            <Header />
        <div className="min-h-screen flex ">
            <VHeader />
            <div className={`w-full bg-gray-50 mt-3 p-8 ${
                selectedImage ? 'max-w-7xl' : 'max-w-2xl'
            }`}>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center">
                    Optimize Your Images
                </h1>
                <p className="text-gray-600 mb-8 text-center">
                    Reduce image size while retaining quality. Perfect for web, social media, and more.
                </p>

                <div className={`grid grid-cols-1 gap-8 ${selectedImage ? 'md:grid-cols-2' : 'md:grid-cols-1'}`}>
                    {/* Image Upload Section */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 hover:border-blue-500 transition">
                        <input
                            type="file"
                            id="image-upload"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files && e.target.files[0];
                                if (file) {
                                    setSelectedImage(file);
                                    setCompressionLevel(null);
                                }
                            }}
                        />
                        <label
                            htmlFor="image-upload"
                            className="block text-gray-600 text-md md:text-lg font-medium cursor-pointer hover:text-blue-500 text-center"
                        >
                            {selectedImage ? (
                                <img
                                    src={URL.createObjectURL(selectedImage)}
                                    alt="Selected"
                                    className="w-full h-auto mb-4 rounded-lg"
                                />
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
                        {selectedImage && (
                            <>
                                <p className="text-gray-600 text-lg md:text-xl font-medium mb-4">
                                    Choose Compression Level:
                                </p>
                                <div className="flex flex-col space-y-4 mb-6">
                                    {[
                                        {
                                            level: 'low',
                                            title: 'Low Compression',
                                            description: 'High quality, minimal compression. Suitable for professional use.',
                                        },
                                        {
                                            level: 'mid',
                                            title: 'Medium Compression',
                                            description: 'Balanced quality and file size. Recommended for general-purpose use.',
                                        },
                                        {
                                            level: 'high',
                                            title: 'High Compression',
                                            description: 'Lower quality, maximum compression. Best for web and social media.',
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
                                    className={`py-3 px-6 rounded-lg font-semibold transition mr-4 ${
                                        isProcessing || !compressionLevel
                                            ? 'bg-gray-400 text-gray-800 cursor-not-allowed hidden'
                                            : 'bg-blue-600 text-white hover:bg-blue-700'
                                    }`}
                                    onClick={handleCompressClick}
                                    disabled={isProcessing || !compressionLevel}
                                >
                                    {isProcessing ? 'Optimizing...' : 'Optimize Now'}
                                </button>
                                <button
                                    className={`py-3 px-6 rounded-lg font-semibold transition ${
                                        isProcessing 
                                            ? 'bg-gray-400 text-gray-800 cursor-not-allowed hidden'
                                            : 'bg-blue-600 text-white hover:bg-blue-700'
                                    }`}
                                    onClick={() => {
                                        setSelectedImage(null);
                                        setCompressionLevel(null);
                                        setDownloadUrl('');
                                        setProgress(0);
                                        setShowPopup(false);
                                    }}
                                >
                                    Select Another?
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
                                Optimization Complete!
                            </h2>
                            <p className="text-gray-600 mb-6">Your image is ready to download.</p>
                            <button
                                className="bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition"
                                onClick={handleDownload}
                            >
                                Download
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

export default Image;
