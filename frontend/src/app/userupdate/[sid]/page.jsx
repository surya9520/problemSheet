"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import ApproachModal from "@/components/ApproachModal";
import Navbar from "@/components/Navbar";
import RemarkModal from "@/components/RemarkModal";
import { url } from "@/helper";

const RoleTable = ({params}) => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterInput, setFilterInput] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [questionType, setQuestionType] = useState({
    list: "",
    datastructure: "",
    Company: "",
    Difficulty: "",
    Platform: "",
  });
  
  const [isOpen, setIsOpen] = useState(false);
  const [approach, setApproach] = useState({});
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [questionId, setQuestionId] = useState(undefined);
  const [solutionId, setSolutionId] = useState(undefined);
  const [appopen, setAppopen] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      const filterobj = JSON.stringify(questionType);
      try {
        const response = await fetch(
          `${url}api/dsa/solved/?userId=${params.sid}`, 
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
        console.log(data)
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuestions();
  }, []);
  useEffect(() => {
    const fetchSolutions = async (questionId) => {
      try {
        const response = await fetch(`${url}api/solution`, {
          method: "GET",
          headers: {
            questionid: questionId,
          },
          credentials: "include",
        });

        if (!response.ok) {
          const error = await response.json();
          console.error(error);
          return;
        }

        const solution = await response.json();
        console.log(`Solutions for question ID ${questionId}:`, solution); // Log the solution

        setApproach((prevApproach) => ({
          ...prevApproach,
          [questionId]: solution,
        }));
      } catch (error) {
        console.log(error);
      }
    };

    if (questions.length) {
      questions.forEach((question) => {
        fetchSolutions(question._id);
      });
    }
  }, [questions]);
  const handleOpen = (question, questionId) => {
    setSelectedQuestion(question);
    setQuestionId(questionId);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setAppopen(false);
  };
  const handleSolutionClick = (sol) => {
    setSolutionId(sol._id);
    setAppopen(true);
  };
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        {questions.length === 0 ? (
          <div className="text-center text-red-500 text-lg font-semibold">
            There are no questions done by the user.
          </div>
        ) : (
          <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-700 text-white">
                <tr>
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
                        {index + 1}
                      </td>
                      <td className="border border-gray-300 px-4 py-2  text-center w-[20rem]">
                        {question.questionName}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center w-[300px]">
                    <div className="flex space-x-2 overflow-x-auto">
                      {approach[question._id] &&
                        approach[question._id].map((sol, idx) => (
                          <span
                            key={idx}
                            className="bg-blue-500 text-white font-semibold py-1 px-2 rounded hover:bg-blue-600 transition whitespace-nowrap"
                            onClick={() => handleSolutionClick(sol)}
                          >
                            Approach {idx + 1}
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
