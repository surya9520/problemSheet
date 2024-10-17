"use client";

import { url } from "@/helper";
import React, { useEffect, useState } from "react";

// Modal component for submitting an approach to a solution
const ApproachModal = ({ isOpen, onClose, solutionId }) => {
  const [approachDetails, setApproachDetails] = useState({
    language: "JavaScript",
    solutionCode: "",
    solutionId: "",
    approachName: "", // Added to capture the approach name
  });
  const [adminRemark, setAdminRemark] = useState("");

  // Fetch admin remarks and question details when the modal is opened
  useEffect(() => {
    const fetchRemark = async () => {
      try {
        const response = await fetch(`${url}api/admin/remark/${solutionId}`, {
          method: "GET",
          credentials: "include", // Include cookies for authentication
        });

        if (!response.ok) {
          throw new Error("Failed to fetch remark");
        }

        const data = await response.json();
        setAdminRemark(data?.remark || "No remarks available."); // Default message if no remark
      } catch (error) {
        console.error("Error fetching remark:", error);
        alert("Error fetching remark. Please try again."); // Alert user on error
      }
    };

    const fetchQuestionDetails = async () => {
      try {
        const response = await fetch(`${url}api/solution/specific`, {
          method: "GET",
          headers: { solutionid: solutionId },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch question details");
        }

        const data = await response.json();
        setApproachDetails(data);
      } catch (error) {
        console.error("Failed to fetch question details:", error);
        alert("Error fetching question details. Please try again."); // Alert user on error
      }
    };

    // Fetch data only if the modal is open and solutionId is provided
    if (isOpen && solutionId) {
      fetchRemark();
      fetchQuestionDetails();
    }
  }, [isOpen, solutionId]);

  // Handle the submission of the solution
  const handleSubmit = async () => {
    if (!approachDetails.solutionCode) {
      alert("Please fill in the solution");
      return;
    }

    try {
      const response = await fetch(`${url}api/solution/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          solutionId
        },
        body: JSON.stringify(approachDetails),
        credentials: "include",
      });

      if (response.ok) {
        alert("Solution submitted successfully!");
        onClose(); // Close the modal on successful submission
      } else {
        alert("Failed to submit the solution. Please try again."); // Alert on failure
      }
    } catch (error) {
      console.error("Error submitting solution:", error);
      alert("An error occurred while submitting the solution. Please try again."); // Alert user on error
    }
  };

  // If modal is not open, return null to avoid rendering
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-1/2 p-6 rounded-lg shadow-lg">
        <div className="flex justify-between mb-4">
          <div>
            <label className="block text-gray-700 font-semibold">Approach Name</label>
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
          <div>
            <label className="block text-gray-700 font-semibold">Language</label>
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

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Solution</label>
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

        <div className="mb-4">
          <h3 className="text-lg font-semibold">Admin Remark</h3>
          <p className="border border-gray-300 p-2 rounded">{adminRemark}</p>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-400 text-white hover:bg-gray-500 transition duration-200"
          >
            Close
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition duration-200"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApproachModal;
