'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // For navigation after logout

const Navbar = () => {
  const [role, setRole] = useState(null); // User's role
  const [isAdminDropdownOpen, setAdminDropdownOpen] = useState(false); // Admin dropdown state
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false); // Profile dropdown state
  const [userData, setUserData] = useState({ name: '', email: '' }); // User data

  const router = useRouter(); // Router instance for redirecting

  // Fetch the user's role and data from localStorage on component mount
  useEffect(() => {
    const user = localStorage.getItem('userData');
    const parsedUser = user ? JSON.parse(user) : {};
    setRole(parsedUser.role);
    setUserData({ name: parsedUser.name, email: parsedUser.email });
  }, []);

  // Toggle visibility for dropdowns
  const toggleAdminDropdown = () => setAdminDropdownOpen(!isAdminDropdownOpen);
  const toggleProfileDropdown = () => setProfileDropdownOpen(!isProfileDropdownOpen);

  // Logout function: clear localStorage, cookies, and redirect to home
  const handleLogout = () => {
    localStorage.removeItem('userData');
    document.cookie = 'connect.sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    router.push('/login'); // Redirect to home
  };

  return (
    <nav className="bg-gray-800 p-4 shadow">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">DSA</div>

        <div className="flex space-x-4 items-center">
          <span onClick={(e)=>{router.push('/')}} className="text-white hover:text-gray-300 transition duration-200">
            Home
          </span>
          <span onClick={(e)=>{router.push('/aboutus')}} className="text-white hover:text-gray-300 transition duration-200">
            About Us
          </span>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={toggleProfileDropdown}
              className="text-white hover:text-gray-300 transition duration-200"
            >
              Profile ▼
            </button>

            {isProfileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                <div className="px-4 py-2 text-sm text-gray-800">
                  <strong>Name:</strong> {userData.name}
                </div>
                <div className="px-4 py-2 text-sm text-gray-800">
                  <strong>Email:</strong> {userData.email}
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Admin Panel (visible only for admins) */}
          {role === 'admin' && (
            <div className="relative">
              <button
                onClick={toggleAdminDropdown}
                className="text-white hover:text-gray-300 transition duration-200"
              >
                Admin Panel ▼
              </button>

              {isAdminDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                  <Link
                    href="/uploadquestions"
                    className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                  >
                    Upload Questions
                  </Link>
                  <Link
                    href="/userupdate"
                    className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                  >
                    Update-User/Write Review
                  </Link>
                  <Link
                    href="/upload"
                    className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                  >
                    Create List
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
