"use client";

import { url } from "@/helper";
import React, { useEffect, useState } from "react";

const RemarkModal = ({ isOpen, onClose, solutionId, userId }) => {
  const [approachDetails, setApproachDetails] = useState({
    language: "",
    solutionCode: "",
    solutionId: "",
    adminRemark: "",
  });
  const [adminRemarkInput, setAdminRemarkInput] = useState(""); // New input for admin's review

  useEffect(() => {
    const fetchRemark = async () => {
      setAdminRemarkInput("");  // Clear the input field
    
      try {
        console.log("solution id", solutionId);
    
        const response = await fetch(`${url}api/admin/remark/${solutionId}`, {
          method: "GET",
          credentials: "include",  // Include cookies for authentication
        });
    
        if (!response.ok) {
          throw new Error("Failed to fetch remark");
        }
    
        const data = await response.json();
    
        if (data?.remark) {
          setAdminRemarkInput(data.remark);  // Populate input with the remark
        }
      } catch (error) {
        console.error("Error fetching remark:", error);
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
          throw new Error("Failed to fetch");
        }
        const data = await response.json();
        console.log("questiondetails", data);

        // Set solution details and previous admin remark if available
        setApproachDetails(data);
      } catch (error) {
        console.error("Failed to fetch question details:", error);
      }
    };

    if (isOpen && solutionId) {
      fetchQuestionDetails();
      fetchRemark();
    }
  }, [isOpen, solutionId]);

  const handleRemark = async () => {
    console.log("solutionid", solutionId);
    try {
      let response = await fetch(`${url}api/admin/remark`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          userId,
          remark: adminRemarkInput,
          solutionId,
        }),
      });
      if (!response.ok) {
        throw new Error("faild to submit remark");
      }
      alert("remark send successfully");
      onClose();
    } catch (error) {}
  };

  const handleSubmit = async () => {
    try {
      handleRemark();
      console.log(approachDetails);
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
        alert("Solution updated successfully!");
        onClose();
      } else {
        alert("Failed to update the solution. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting solution and review:", error);
    }
  };
  const handleUpdate = async () => {
    const response = await fetch(`${url}api/admin/remark/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ solutionId, remark: adminRemarkInput }),
      credentials: "include",
    });

    if (response.ok) {
      alert("review updated successfully!");
      onClose();
    } else {
      alert("Failed to update review. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-1/2 p-6 rounded-lg shadow-lg">
        {/* Language Selector */}
        <div className="flex justify-between mb-4">
          <div>
            <label className="block text-gray-700 font-semibold">
              Approach Name
            </label>
            <input
              className="border-2 p-2 mt-1 rounded-lg focus:outline-none"
              placeholder="enter approach name"
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
            <label className="block text-gray-700 font-semibold">
              Language
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

        {/* Solution Code Textarea */}
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

        {/* Admin's Review Input Textarea */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Admin Remark</h3>
          <textarea
            className="border border-gray-300 rounded w-full p-2 h-32"
            value={adminRemarkInput}
            onChange={(e) => {
              setAdminRemarkInput(e.target.value);
            }}
            placeholder="Write your review here..."
          ></textarea>
          <button
            onClick={handleUpdate}
            className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition duration-200"
          >
            update Remark
          </button>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={(e) => {
              onClose();
            }}
            className="px-4 py-2 rounded-lg bg-gray-400 text-white hover:bg-gray-500 transition duration-200"
          >
            Close
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition duration-200"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemarkModal;
