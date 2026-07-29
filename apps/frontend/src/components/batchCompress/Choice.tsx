import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileImage, FileText } from 'lucide-react';
import Header from '../dashboard/Header';
import VHeader from '../dashboard/VHeader';

const Choice: React.FC = () => {
    const navigate = useNavigate();

    const handleChoice = (type: 'image' | 'pdf') => {
        if (type === 'image') {
            navigate('/dashboard/batchcompress/image');
        } else if (type === 'pdf') {
            navigate('/dashboard/batchcompress/pdf');
        }
    };

    return (
        <div className="bg-white">
            <Header />
            <div className="min-h-screen flex">
                <VHeader />
                <div className="flex flex-col items-center justify-center w-full p-8">
                    {/* Heading */}
                    <h1 className="text-2xl md:text-4xl font-bold text-blue-600 mb-8 text-center">
                        Choose File Type for Batch Compression
                    </h1>
                    {/* Buttons */}
                    <div className="grid grid-cols-2 gap-8 max-w-4xl w-full">
                        {/* Image Compression Button */}
                        <button
                            onClick={() => handleChoice('image')}
                            className="flex flex-col items-center justify-center h-48 bg-blue-600 text-white font-medium rounded-lg shadow-lg hover:bg-blue-700 transition"
                        >
                            <FileImage className="w-12 h-12 mb-4" />
                            <span className="text-xl font-semibold">Compress Images</span>
                        </button>

                        {/* PDF Compression Button */}
                        <button
                            onClick={() => handleChoice('pdf')}
                            className="flex flex-col items-center justify-center h-48 bg-blue-600 text-white font-medium rounded-lg shadow-lg hover:bg-blue-700 transition"
                        >
                            <FileText className="w-12 h-12 mb-4" />
                            <span className="text-xl font-semibold">Compress PDFs</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Choice;
