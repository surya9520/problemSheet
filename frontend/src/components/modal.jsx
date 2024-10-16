import { submitSolutions } from "@/store/slices/solutionSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

const Modal = ({ isOpen, onClose, questionName, questionid }) => {
  const [approachDetails, setApproachDetails] = useState({
    language: "JavaScript",
    solutionCode: "",
    questionId: "",
    approachName: "",
  });
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (!approachDetails.solutionCode || !approachDetails.approachName) {
      alert("Please fill in the Details");
      return;
    }
    approachDetails.questionId = questionid;
    console.log(approachDetails);
    dispatch(submitSolutions(approachDetails));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-1/2 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">{questionName}</h2>

        <div className="flex justify-between mb-4">
          <div>
            <label htmlFor="link" className="block text-gray-700 font-semibold">
              Approach Name <span className="text-red-600">*</span>
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

        <div className="mb-4">
          <label htmlFor="link" className="block text-gray-700 font-semibold">
            Solution Code <span className="text-red-600">*</span>
          </label>
          <textarea
            className="border border-gray-300 rounded w-full p-2 h-32"
            value={approachDetails.solution}
            onChange={(e) =>
              setApproachDetails({
                ...approachDetails,
                solutionCode: e.target.value,
              })
            }
            placeholder="Write your solution here..."
          ></textarea>
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
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
