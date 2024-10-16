'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [role, setRole] = useState(null); // State to store the user's role
  const [isAdminDropdownOpen, setAdminDropdownOpen] = useState(false); // Dropdown state

  // Get the user's role from localStorage on component mount
  useEffect(() => {
    const userData = localStorage.getItem('userData');
    const parsedData = userData ? JSON.parse(userData) : null;
    const userRole = parsedData ? parsedData.role : null;
    setRole(userRole);
  }, []);

  // Toggle dropdown visibility
  const toggleAdminDropdown = () => {
    setAdminDropdownOpen(!isAdminDropdownOpen);
  };

  return (
    <nav className="bg-gray-800 p-4 shadow">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">DSA</div>

        <div className="flex space-x-4 items-center">
          <Link href="/" className="text-white hover:text-gray-300 transition duration-200">
            Home
          </Link>
          <Link href="/about-us" className="text-white hover:text-gray-300 transition duration-200">
            About Us
          </Link>
          <Link href="/profile" className="text-white hover:text-gray-300 transition duration-200">
            Profile
          </Link>

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
