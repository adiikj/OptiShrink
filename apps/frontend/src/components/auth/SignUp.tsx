import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { registerUser } from '../../api/api';

const SignUp: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const { name, username, email, password } = formData;

    // Simple validation
    if (!name || !username || !email || !password) {
      return setError('All fields are required.');
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return setError('Username should only contain letters, numbers, and underscores.');
    }

    const payload = { name, username, email, password };

    try {
      setIsLoading(true);
      const response = await registerUser(payload);
      console.log('Registration Response:', response);

      // Redirect after successful registration
      alert('Registration successful! Please signin to continue.');
      navigate('/signin'); // Assuming you want to navigate to an OTP page
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err?.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Left Section */}
      <div className="w-full md:w-1/2 bg-blue-900 text-white flex flex-col justify-center items-center py-8 md:py-16 px-6 md:px-10">
        <div className="max-w-lg bg-blue-800 bg-opacity-30 p-8 rounded-3xl shadow-xl">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-6 leading-tight text-center">
            Why Join <span className="text-blue-300">OptiShrink?</span>
          </h1>
          <ul className="space-y-6">
            <li className="flex items-start space-x-4">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-300 text-blue-900 font-bold rounded-full">1</div>
              <div>
                <h3 className="text-lg font-semibold">Advanced File Compression</h3>
                <p className="text-sm md:text-md leading-relaxed">Compress files without compromising quality, saving time and storage.</p>
              </div>
            </li>
            <li className="flex items-start space-x-4">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-300 text-blue-900 font-bold rounded-full">2</div>
              <div>
                <h3 className="text-lg font-semibold">Secure and Private</h3>
                <p className="text-sm md:text-md leading-relaxed">Industry-grade encryption ensures your files remain safe and private.</p>
              </div>
            </li>
            <li className="flex items-start space-x-4">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-300 text-blue-900 font-bold rounded-full">3</div>
              <div>
                <h3 className="text-lg font-semibold">Effortless File Sharing</h3>
                <p className="text-sm md:text-md leading-relaxed">Share compressed files quickly and easily with anyone, anywhere.</p>
              </div>
            </li>
            <li className="flex items-start space-x-4">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-300 text-blue-900 font-bold rounded-full">4</div>
              <div>
                <h3 className="text-lg font-semibold">User-Friendly Design</h3>
                <p className="text-sm md:text-md leading-relaxed">Our platform is intuitive and easy to navigate, designed for all users.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Right Section (Form) */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white py-8 md:py-16 px-6 md:px-8">
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit}>
            {/* Header */}
            <h2 className="text-3xl font-extrabold text-blue-800 mb-6 text-center">
              Create Your Account
            </h2>

            {/* Name Field */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 p-3 w-full border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your name"
              />
            </div>

            {/* Username Field */}
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="mt-1 p-3 w-full border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your username"
              />
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 p-3 w-full border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your email"
              />
            </div>

            {/* Password Field */}
            <div className="mb-6 relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 p-3 w-full border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Create a password"
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-700 text-white py-3 px-4 text-lg font-bold rounded-md hover:bg-blue-800 transition duration-300"
            >
              {isLoading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 font-medium">
              Already have an account?{' '}
              <Link to="/signin" className="text-blue-600 hover:underline font-bold">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
