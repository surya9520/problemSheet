'use client'; // Enables the component to run on the client side (Next.js-specific directive)
import Navbar from '@/components/Navbar'; // Importing Navbar component for page navigation
import { url } from '@/helper'; // Helper URL used as the base for API calls
import { useState } from 'react'; // Importing useState hook for managing local component state

const Upload = () => {
  // State to hold form data values for different input fields
  const [formData, setFormData] = useState({
    complexity: '', 
    dataStructure: '', 
    company: '', 
    platform: '', 
    listName: '', // Stores the name of the list being created
  });

  // Function to handle changes in input fields
  const handleChange = (e) => {
    const { name, value } = e.target; // Destructuring input name and value from the event
    setFormData({ ...formData, [name]: value }); // Updating the corresponding field in the state
  };

  // Handles form submission and sends data to the appropriate API endpoint
  const handleSubmit = async (e, type) => {
    e.preventDefault(); // Prevents page reload on form submission
    let urls = ''; // Variable to store the API endpoint based on the form type

    // Switch case to determine the appropriate API endpoint for each form type
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
        console.error('Invalid form type'); // Log error for invalid form types
        return; // Exit function if type is not recognized
    }

    try {
      // Prepare the request body dynamically based on the form type
      const bodyData = type === 'list' 
        ? { name: formData.listName } // Use 'listName' field for lists
        : { name: formData[type] }; // Use the appropriate field for other types

      // Send the API request using fetch
      const res = await fetch(`${url + urls}`, {
        method: 'POST', // Set method to POST
        headers: {
          'Content-Type': 'application/json', // Set content type as JSON
        },
        body: JSON.stringify(bodyData), // Convert request body to JSON string
        credentials: 'include', // Include cookies for authentication
      });

      const data = await res.json(); // Parse the JSON response

      // Check if the request was successful
      if (res.ok) {
        alert(`Success! ${type} created successfully.`); // Alert on success
      } else {
        // Handle specific error messages from the API response
        if (data.msg?.includes('already exists')) {
          alert('Error: ' + data.msg); // Alert if item already exists
        } else {
          alert('Error occurred, please try again.'); // Generic error message
        }
      }
    } catch (error) {
      console.error('Error submitting the form:', error); // Log any errors that occur during the request
      alert('Error occurred, please try again.'); // Alert the user of the error
    }
  };

  return (
    <>
      <Navbar /> {/* Render the Navbar component */}
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create Tags</h2>

          {/* Form to create a new data structure */}
          <form onSubmit={(e) => handleSubmit(e, 'dataStructure')} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Data Structure Name:
            </label>
            <input
              type="text"
              name="dataStructure" // Input name corresponds to the state key
              value={formData.dataStructure} // Bind input value to state
              onChange={handleChange} // Update state on input change
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required // Make the input required
            />
            <button className="mt-3 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition">
              Create Data Structure
            </button>
          </form>

          {/* Form to create a new company */}
          <form onSubmit={(e) => handleSubmit(e, 'company')} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Company Name:</label>
            <input
              type="text"
              name="company" // Input name corresponds to the state key
              value={formData.company} // Bind input value to state
              onChange={handleChange} // Update state on input change
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required // Make the input required
            />
            <button className="mt-3 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition">
              Create Company
            </button>
          </form>

          {/* Form to create a new platform */}
          <form onSubmit={(e) => handleSubmit(e, 'platform')} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Platform Name:</label>
            <input
              type="text"
              name="platform" // Input name corresponds to the state key
              value={formData.platform} // Bind input value to state
              onChange={handleChange} // Update state on input change
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required // Make the input required
            />
            <button className="mt-3 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition">
              Create Platform
            </button>
          </form>

          {/* Form to create a new list */}
          <form onSubmit={(e) => handleSubmit(e, 'list')} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">List Name:</label>
            <input
              type="text"
              name="listName" // Input name corresponds to the state key
              value={formData.listName} // Bind input value to state
              onChange={handleChange} // Update state on input change
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required // Make the input required
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

export default Upload; // Export the component as default
