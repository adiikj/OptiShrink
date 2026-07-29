import React, { useState } from 'react';
import Header from '../dashboard/Header';
import VHeader from '../dashboard/VHeader';
import { Bell, Moon, Sun } from 'lucide-react'; // Import Lucide icons

const Settings: React.FC = () => {
    const [notifications, setNotifications] = useState<boolean>(true);
    const [darkMode, setDarkMode] = useState<boolean>(false);

    const handleNotificationsChange = () => {
        setNotifications(!notifications);
    };

    const handleDarkModeChange = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className={`${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
            <Header />
            <div className="min-h-screen flex">
                <VHeader />
                <div className={`w-full p-8 md:p-16 mt-1 rounded-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-50 text-gray-800'}`}>
                    <h1 className="text-3xl md:text-4xl font-bold mb-8 text-blue-600">Settings</h1>

                    {/* General Settings Section */}
                    <div className="space-y-8">
                        <div className="flex flex-col space-y-6">
                            <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <div className="flex items-center space-x-4">
                                    <Bell className="text-blue-600 w-6 h-6" />
                                    <span className="text-lg">Enable Notifications</span>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={notifications}
                                    onChange={handleNotificationsChange}
                                    className="toggle-checkbox"
                                />
                            </div>

                            <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <div className="flex items-center space-x-4">
                                    {darkMode ? (
                                        <Sun className="text-yellow-500 w-6 h-6" />
                                    ) : (
                                        <Moon className="text-gray-500 w-6 h-6" />
                                    )}
                                    <span className="text-lg">Enable Dark Mode</span>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={darkMode}
                                    onChange={handleDarkModeChange}
                                    className="toggle-checkbox"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Account Settings Section */}
                    <div className="mt-12 space-y-6">
                        <h2 className="text-2xl font-semibold mb-4">Account Settings</h2>

                        <div className="flex flex-col space-y-4">
                            <div className="flex items-center p-4 bg-gray-100 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <label className="w-1/3 text-lg font-medium">Change Email</label>
                                <input
                                    type="email"
                                    className="p-2 w-2/3 rounded-md bg-gray-200"
                                    placeholder="Enter your new email"
                                />
                            </div>

                            <div className="flex items-center p-4 bg-gray-100 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <label className="w-1/3 text-lg font-medium">Change Password</label>
                                <input
                                    type="password"
                                    className="p-2 w-2/3 rounded-md bg-gray-200"
                                    placeholder="Enter your new password"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
