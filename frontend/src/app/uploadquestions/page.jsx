"use client"; // Indicates that this is a client-side component in Next.js

import { useForm } from "react-hook-form"; // Importing useForm for form handling
import { useState, useEffect } from "react"; // React hooks for state management and lifecycle events
import Select from "react-select"; // Custom select component for multi/select dropdowns
import { url } from "@/helper"; // Importing the base API URL
import Navbar from "@/components/Navbar"; // Navbar component

const DsaForm = () => {
  // Destructuring the useForm hook for form handling
  const {
    register, handleSubmit, setValue, watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      questionName: "", link: "", solutionVideoLink: "", 
      solutionArticleLink: "", companyTags: [], dataStructureTags: [], 
      lists: [], platformTags: [], description: "", difficultyTags: [],
    },
  });

  // State variables to store options and handle errors
  const [submitError, setSubmitError] = useState("");
  const [listOption, setListOption] = useState([]);
  const [companyOptions, setCompanyOptions] = useState([]);
  const [dataStructureOptions, setDataStructureOptions] = useState([]);
  const [complexityOptions, setComplexityOptions] = useState([]);
  const [platformOptions, setPlatformOptions] = useState([]);

  // useEffect to fetch select options when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch list options from API
        const fetchlist = async () => {
          const response = await fetch(`${url}api/admin/lists`, {
            method: "GET", credentials: "include",
          });
          const data = await response.json();
          setListOption(data.map(val => ({ value: val._id, label: val.listName })));
        };

        // Fetch company options from API
        const fetchCompany = async () => {
          const response = await fetch(`${url}api/admin/tags/companies`, {
            method: "GET", credentials: "include",
          });
          const data = await response.json();
          setCompanyOptions(data.map(val => ({ value: val._id, label: val.name })));
        };

        // Fetch data structure options
        const fetchDataStructure = async () => {
          const response = await fetch(`${url}api/admin/tags/datastructures`, {
            method: "GET", credentials: "include",
          });
          const data = await response.json();
          setDataStructureOptions(data.map(val => ({ value: val._id, label: val.name })));
        };

        // Fetch complexity options
        const fetchComplexity = async () => {
          const response = await fetch(`${url}api/admin/tags/complexities`, {
            method: "GET", credentials: "include",
          });
          const data = await response.json();
          setComplexityOptions(data.map(val => ({ value: val._id, label: val.level })));
        };

        // Fetch platform options
        const fetchPlatform = async () => {
          const response = await fetch(`${url}api/admin/tags/platforms`, {
            method: "GET", credentials: "include",
          });
          const data = await response.json();
          setPlatformOptions(data.map(val => ({ value: val._id, label: val.name })));
        };

        // Call all fetch functions
        await fetchlist();
        await fetchCompany();
        await fetchDataStructure();
        await fetchComplexity();
        await fetchPlatform();
      } catch (error) {
        console.error("Error fetching data:", error); // Error handling
      }
    };

    fetchData(); // Trigger the data fetch on component mount
  }, []);

  // Function to handle form submission
  const onSubmit = async (data) => {
    console.log(data); // Log form data for debugging
    try {
      const response = await fetch(`${url}api/dsa`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data), credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to submit");

      const message = await response.json();
      setSubmitError(""); // Reset error on success
      alert(message.msg); // Display success message
    } catch (error) {
      setSubmitError("Submission failed. Please try again."); // Handle submission error
    }
  };

  return (
    <>
      <Navbar /> {/* Render Navbar */}
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white rounded-lg shadow-lg p-10 max-w-3xl w-full">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            DSA Details Form
          </h1>
          {/* Form submission handling */}
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6">
            {/* Input fields for question name */}
            <div>
              <label htmlFor="questionName" className="block text-gray-700 font-semibold">
                Question Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text" id="questionName"
                {...register("questionName", { required: "Question name is required" })}
                className={`border-2 w-full p-3 mt-1 rounded-lg focus:outline-none ${errors.questionName ? "border-red-600" : "border-gray-300"}`}
                placeholder="Enter question name"
              />
              {errors.questionName && <p className="text-red-600 text-sm">{errors.questionName.message}</p>}
            </div>

            {/* Description field */}
            <div>
              <label htmlFor="description" className="block text-gray-700 font-semibold">
                Description <span className="text-red-600">*</span>
              </label>
              <textarea
                id="description"
                {...register("description", { required: "Description is required" })}
                className={`border-2 w-full p-3 mt-1 rounded-lg focus:outline-none ${errors.description ? "border-red-600" : "border-gray-300"}`}
                placeholder="Enter description of the problem" rows={4}
              />
              {errors.description && <p className="text-red-600 text-sm">{errors.description.message}</p>}
            </div>

            {/* Platform and Complexity fields */}
            <div className="grid grid-cols-2 gap-4">
              {/* Platform select */}
              <div>
                <label htmlFor="platform" className="block text-gray-700 font-semibold">
                  Platform <span className="text-red-600">*</span>
                </label>
                <Select
                  id="platform" options={platformOptions} classNamePrefix="react-select"
                  onChange={(option) => setValue("platformTags", option ? [option.value] : [])}
                  placeholder="Select platform"
                />
              </div>

              {/* Complexity select */}
              <div>
                <label htmlFor="complexity" className="block text-gray-700 font-semibold">
                  Complexity <span className="text-red-600">*</span>
                </label>
                <Select
                  id="complexity" options={complexityOptions} classNamePrefix="react-select"
                  onChange={(option) => setValue("difficultyTags", option ? [option.value] : [])}
                  placeholder="Select complexity"
                />
              </div>
            </div>

            {/* Other input fields and submit button */}
            {/* ... */}

            <div>
              <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300">
                Submit
              </button>
              {submitError && <p className="text-red-600 mt-3 text-sm">{submitError}</p>}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default DsaForm;
