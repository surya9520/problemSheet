'use client';
import Navbar from '@/components/Navbar';
import { url } from '@/helper';
import { useState } from 'react';

const Upload = () => {
  const [formData, setFormData] = useState({
    complexity: '',
    dataStructure: '',
    company: '',
    platform: '',
    listName: '', // Added for creating lists
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission with fetch
  const handleSubmit = async (e, type) => {
    e.preventDefault();
    let urls = '';
  
    switch (type) {
      case 'dataStructure':
        urls = 'api/admin/tags/datastructures';
        break;
      case 'company':
        urls = 'api/admin/tags/companies';
        break;
      case 'platform':
        urls = 'api/admin/tags/platforms';
        break;
      case 'list':
        urls = 'api/admin/lists';
        break;
      default:
        console.error('Invalid form type');
        return;
    }
  
    try {
      const bodyData = type === 'list' 
        ? { name: formData.listName }  // Use listName for the list type
        : { name: formData[type] };     // Use the appropriate field for others
  
      const res = await fetch(`${url + urls}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),  // Use the constructed body data
        credentials: 'include',
      });
  
      const data = await res.json();
  
      if (res.ok) {
        alert('Success! ' + type + ' created successfully.');
      } else {
        if (data.msg?.includes('already exists')) {
          alert('Error: ' + data.msg);
        } else {
          alert('Error occurred, please try again.');
        }
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
      alert('Error occurred, please try again.');
    }
  };
  

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create Tags</h2>

          {/* Data Structure Form */}
          <form onSubmit={(e) => handleSubmit(e, 'dataStructure')} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Data Structure Name:
            </label>
            <input
              type="text"
              name="dataStructure"
              value={formData.dataStructure}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <button className="mt-3 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition">
              Create Data Structure
            </button>
          </form>

          {/* Company Form */}
          <form onSubmit={(e) => handleSubmit(e, 'company')} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Company Name:</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <button className="mt-3 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition">
              Create Company
            </button>
          </form>

          {/* Platform Form */}
          <form onSubmit={(e) => handleSubmit(e, 'platform')} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Platform Name:</label>
            <input
              type="text"
              name="platform"
              value={formData.platform}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <button className="mt-3 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition">
              Create Platform
            </button>
          </form>

          {/* List Form */}
          <form onSubmit={(e) => handleSubmit(e, 'list')} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">List Name:</label>
            <input
              type="text"
              name="listName"
              value={formData.listName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <button className="mt-3 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition">
              Create List
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Upload;
