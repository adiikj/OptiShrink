import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';
import Cookies from 'js-cookie';
import { LogOut } from 'lucide-react';

const Header: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    Cookies.remove('accessToken');
    dispatch(logout());
    window.location.href = '/';
    console.log('User logged out');
  };

  return (
    <div className="w-full flex justify-between items-center p-5 bg-white shadow-md md:pl-5 pl-20 px-4 md:px-8">
      {/* App Title */}
      <h1 className="text-2xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-blue-700 to-blue-500 text-transparent bg-clip-text sm:text-3xl">
        OptiShrink
      </h1>

      {/* User Profile and Logout */}
      <div className="flex items-center space-x-5">
       
        {/* Logout Icon Button */}
        <button
          onClick={handleLogout}
          className="flex items-center px-4 py-2 rounded-xl justify-center text-red-500 hover:bg-red-700 hover:text-white transition duration-200"
          aria-label="Logout"
        >
          <LogOut className="w-6 h-6" />
          <div className="text-red-500 hover:bg-red-700 hover:text-white transition duration-200 hidden sm:block">Log Out</div>
        </button>
      </div>
    </div>
  );
};

export default Header;
