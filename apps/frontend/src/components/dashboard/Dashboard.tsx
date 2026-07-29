import React, { useState, useEffect } from "react";
import Header from "./Header";
import VHeader from "./VHeader";
import { Link } from "react-router-dom";
import { getUserProfile } from "../../api/api";
import { FileImage, Archive, FileText, History, Settings, HelpCircle } from "lucide-react"; // Importing lucide-react icons

const Dashboard: React.FC = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const profile = await getUserProfile();
        setUserName(profile.name); // Set the user's name
      } catch (err: any) {
        setError(err.message || 'Failed to fetch user profile.'); // Handle errors
      }
    };

    fetchUserName();
  }, []);

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex flex-row flex-grow">
        <VHeader />
        <div className="flex-grow overflow-y-auto p-6 lg:p-12">
          {/* Dashboard Header */}
          <div className="mb-8 flex flex-col lg:flex-row justify-between items-start lg:items-center">
            <div>
              {userName && (
                <p className="text-3xl lg:text-4xl font-bold text-black mt-1">
                  Welcome back, <span className="font-semibold text-blue-600">{userName}</span>!
                </p>
              )}
              <h1 className="text-3xl lg:text-4xl font-bold text-blue-600 mt-3 md:mt-5">Dashboard</h1>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-500 bg-red-100 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* Quick Access Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            <Link
              to="/dashboard/optimizeimage"
              className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl hover:bg-gray-100 transition"
            >
              <FileImage className="text-blue-600 text-3xl mb-2" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Optimize Images</h3>
              <p className="text-gray-500">Easily optimize your images for better performance.</p>
            </Link>
            <Link
              to="/dashboard/batchcompress"
              className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl hover:bg-gray-100 transition"
            >
              <Archive className="text-blue-600 text-3xl mb-2" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Batch Compress</h3>
              <p className="text-gray-500">Compress multiple files in one go.</p>
            </Link>
            <Link
              to="/dashboard/compresspdf"
              className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl hover:bg-gray-100 transition"
            >
              <FileText className="text-blue-600 text-3xl mb-2" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Compress PDFs</h3>
              <p className="text-gray-500">Easily compress your PDFs for better performance.</p>
            </Link>
            <Link
              to="/dashboard/history"
              className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl hover:bg-gray-100 transition"
            >
              <History className="text-blue-600 text-3xl mb-2" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">History</h3>
              <p className="text-gray-500">Check your activity log and file history.</p>
            </Link>
            <Link
              to="/dashboard/settings"
              className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl hover:bg-gray-100 transition"
            >
              <Settings className="text-blue-600 text-3xl mb-2" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Settings</h3>
              <p className="text-gray-500">Manage your preferences and account settings.</p>
            </Link>
            <Link
              to="/dashboard/help"
              className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl hover:bg-gray-100 transition"
            >
              <HelpCircle className="text-blue-600 text-3xl mb-2" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Help & Support</h3>
              <p className="text-gray-500">Get assistance and find answers to your queries.</p>
            </Link>
          </div>

          {/* Recent Activities Section */}
          <div className="mt-10 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Activities</h2>
            <ul className="space-y-3">
              <li className="py-2 border-b border-gray-200">
                <span className="font-semibold">john_doe</span> compressed an image.
              </li>
              <li className="py-2 border-b border-gray-200">
                Report <span className="font-semibold">User Stats</span> generated.
              </li>
              <li className="py-2 border-b border-gray-200">
                New session started by <span className="font-semibold">admin</span>.
              </li>
              <li className="py-2">
                <span className="font-semibold">jane_smith</span> uploaded a PDF.
              </li>
            </ul>
          </div>

          {/* Suggestions Section */}
          <div className="mt-10 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Suggestions & Feedback</h2>
            <p className="text-gray-600 mb-4">
              Have ideas to improve our compression tool? Share your feedback with us!
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md">
              Submit Feedback
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
