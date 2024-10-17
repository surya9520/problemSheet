import { submitSolutions } from "@/store/slices/solutionSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const Modal = ({ isOpen, onClose, questionName, questionid }) => {
  const [isLoading, setIsLoading] = useState(false); // State to track loading status
  const [approachDetails, setApproachDetails] = useState({
    language: "JavaScript", // Default language
    solutionCode: "", // User's solution code
    questionId: "", // Question ID to be submitted
    approachName: "", // User's approach name
  });

  const dispatch = useDispatch(); // Redux hook to dispatch actions

  // Reset the form fields to their initial state
  const resetForm = () => {
    setApproachDetails({
      language: "JavaScript",
      solutionCode: "",
      questionId: "",
      approachName: "",
    });
  };

  // Close the modal and reset the form
  const handleClose = () => {
    resetForm(); // Reset form fields
    onClose(); // Trigger onClose to hide the modal
  };

  // Handle submission of the solution
  const handleSubmit = async () => {
    // Basic validation to ensure all fields are filled
    if (!approachDetails.solutionCode || !approachDetails.approachName) {
      alert("Please fill in the Details");
      return;
    }

    setIsLoading(true); // Start loading indicator

    // Assign the current question ID to the approach details
    approachDetails.questionId = questionid;

    console.log(approachDetails); // Debug log

    // Dispatch the submit action with the provided details
    await dispatch(submitSolutions(approachDetails));

    setIsLoading(false); // Stop loading indicator
    handleClose(); // Close the modal after submission
  };

  // Render nothing if the modal is not open
  if (!isOpen) return null;

  // Check if all required fields are filled
  const isFormComplete =
    approachDetails.solutionCode && approachDetails.approachName;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-1/2 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">{questionName}</h2>

        {/* Input section for approach name and language selection */}
        <div className="flex justify-between mb-4">
          {/* Input field for approach name */}
          <div>
            <label htmlFor="link" className="block text-gray-700 font-semibold">
              Approach Name <span className="text-red-600">*</span>
            </label>
            <input
              className="border-2 p-2 mt-1 rounded-lg focus:outline-none"
              placeholder="Enter approach name"
              value={approachDetails.approachName}
              onChange={(e) =>
                setApproachDetails({
                  ...approachDetails,
                  approachName: e.target.value,
                })
              }
            />
          </div>

          {/* Dropdown for selecting the programming language */}
          <div>
            <label htmlFor="link" className="block text-gray-700 font-semibold">
              Select Language <span className="text-red-600">*</span>
            </label>
            <select
              className="border p-2 mt-1 border-gray-300 rounded"
              value={approachDetails.language}
              onChange={(e) =>
                setApproachDetails({
                  ...approachDetails,
                  language: e.target.value,
                })
              }
            >
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
              <option value="Java">Java</option>
              <option value="C++">C++</option>
            </select>
          </div>
        </div>

        {/* Textarea for solution code */}
        <div className="mb-4">
          <label htmlFor="link" className="block text-gray-700 font-semibold">
            Solution Code <span className="text-red-600">*</span>
          </label>
          <textarea
            className="border border-gray-300 rounded w-full p-2 h-32"
            value={approachDetails.solutionCode}
            onChange={(e) =>
              setApproachDetails({
                ...approachDetails,
                solutionCode: e.target.value,
              })
            }
            placeholder="Write your solution here..."
          ></textarea>
        </div>

        {/* Buttons for submitting or closing the modal */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleClose}
            className="px-4 py-2 rounded-lg bg-gray-400 text-white hover:bg-gray-500 transition duration-200"
            disabled={isLoading} // Disable button if loading
          >
            Close
          </button>
          <button
            onClick={handleSubmit}
            className={`px-4 py-2 rounded-lg ${
              isFormComplete
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-300 cursor-not-allowed"
            } text-white transition duration-200`}
            disabled={!isFormComplete || isLoading} // Disable if form incomplete or loading
          >
            {isLoading ? "Submitting..." : "Submit"} {/* Display loading state */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
