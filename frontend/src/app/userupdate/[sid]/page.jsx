"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import ApproachModal from "@/components/ApproachModal";
import Navbar from "@/components/Navbar";
import RemarkModal from "@/components/RemarkModal";
import { url } from "@/helper";

const RoleTable = ({ params }) => {
  // State to hold the list of questions fetched from the API.
  const [questions, setQuestions] = useState([]);

  // State to manage loading status while fetching data.
  const [isLoading, setIsLoading] = useState(true);

  // Object to store different filters for questions.
  const [questionType, setQuestionType] = useState({
    list: "",
    datastructure: "",
    Company: "",
    Difficulty: "",
    Platform: "",
  });

  // State to manage modal visibility for the approach.
  const [isOpen, setIsOpen] = useState(false);

  // State to store solutions (approaches) for each question.
  const [approach, setApproach] = useState({});

  // State to track the currently selected question.
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  // State to store question and solution IDs.
  const [questionId, setQuestionId] = useState(undefined);
  const [solutionId, setSolutionId] = useState(undefined);

  // State to control the visibility of the Remark modal.
  const [appopen, setAppopen] = useState(false);

  // Fetch questions associated with the user when the component mounts.
  useEffect(() => {
    const fetchQuestions = async () => {
      const filterobj = JSON.stringify(questionType); // Serialize filter object.
      try {
        const response = await fetch(
          `${url}api/dsa/solved/?userId=${params.sid}`,
          {
            method: "GET",
            credentials: "include", // Include cookies in the request.
          }
        );
        const data = await response.json();
        console.log(data);
        setQuestions(data); // Store fetched questions in state.
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setIsLoading(false); // Stop the loading spinner.
      }
    };
    fetchQuestions(); // Trigger the fetch operation.
  }, []); // Empty dependency array ensures the effect runs only once.

  // Fetch solutions for each question once questions are available.
  useEffect(() => {
    const fetchSolutions = async (questionId) => {
      try {
        const response = await fetch(`${url}api/solution`, {
          method: "GET",
          headers: {
            questionid: questionId, // Pass question ID as a header.
          },
          credentials: "include",
        });

        if (!response.ok) {
          const error = await response.json();
          console.error(error);
          return;
        }

        const solution = await response.json();
        console.log(`Solutions for question ID ${questionId}:`, solution);

        // Store solutions for each question in state using question ID.
        setApproach((prevApproach) => ({
          ...prevApproach,
          [questionId]: solution,
        }));
      } catch (error) {
        console.log(error);
      }
    };

    // Trigger solution fetching for all questions.
    if (questions.length) {
      questions.forEach((question) => {
        fetchSolutions(question._id);
      });
    }
  }, [questions]); // Runs whenever the questions state changes.

  // Open the approach modal for a selected question.
  const handleOpen = (question, questionId) => {
    setSelectedQuestion(question);
    setQuestionId(questionId);
    setIsOpen(true);
  };

  // Close both approach and remark modals.
  const handleClose = () => {
    setIsOpen(false);
    setAppopen(false);
  };

  // Open the remark modal for a selected solution.
  const handleSolutionClick = (sol) => {
    setSolutionId(sol._id);
    setAppopen(true);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        {questions.length === 0 ? (
          // Display a message if no questions are available.
          <div className="text-center text-red-500 text-lg font-semibold">
            There are no questions done by the user.
          </div>
        ) : (
          // Render a table of questions if available.
          <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-700 text-white">
                <tr>
                  {/* Header row for the table */}
                  {["S.NO", "Question", "Solutions"].map((header) => (
                    <th
                      key={header}
                      className="border border-gray-300 px-4 py-2 text-center"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Render a row for each question */}
                {questions.map((question, index) => {
                  console.log(
                    question.questionName,
                    ":",
                    question.difficultyTags
                  );
                  return (
                    <tr
                      key={question._id}
                      className={`${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      }`}
                    >
                      <td className="border border-gray-300 px-4 py-2 w-40 text-center">
                        {index + 1} {/* Display serial number */}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center w-[20rem]">
                        {question.questionName} {/* Question name */}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center w-[300px]">
                        <div className="flex space-x-2 overflow-x-auto">
                          {/* Render solutions (approaches) for each question */}
                          {approach[question._id] &&
                            approach[question._id].map((sol, idx) => (
                              <span
                                key={idx}
                                className="bg-blue-500 text-white font-semibold py-1 px-2 rounded hover:bg-blue-600 transition whitespace-nowrap"
                                onClick={() => handleSolutionClick(sol)}
                              >
                                Approach {idx + 1} {/* Solution label */}
                              </span>
                            ))}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Remark modal for selected solution */}
        <RemarkModal
          isOpen={appopen}
          onClose={handleClose}
          solutionId={solutionId}
          userId={params.sid}
        />
      </div>
    </>
  );
};

export default RoleTable;
