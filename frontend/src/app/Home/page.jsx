"use client"; // Indicates this file is a client-side component

import { useEffect, useState } from "react"; // Importing React hooks
import SolutionFormModal from "@/components/SolutionFormModal"; // Importing the modal component for adding solutions
import { url } from "@/helper"; // Importing a helper for the base URL
import ApproachModal from "@/components/ApproachModal"; // Importing the modal component for viewing approaches
import Filters from "@/components/Filters"; // Importing the Filters component for searching/filtering questions
import { useRouter } from "next/navigation"; // Importing the Next.js router for navigation

const DsaQuestionsTable = () => {
  const router = useRouter(); // Initializing the router
  const [questions, setQuestions] = useState([]); // State to hold the fetched questions
  const [isLoading, setIsLoading] = useState(true); // State to manage loading status
  const [filterInput, setFilterInput] = useState(""); // State to hold filter input
  const [rowsPerPage, setRowsPerPage] = useState(5); // State for the number of rows per page
  const [currentPage, setCurrentPage] = useState(1); // State for the current page number
  const [totalPages, setTotalPages] = useState(0); // State for total number of pages
  const [questionType, setQuestionType] = useState({ // State to hold question types for filtering
    list: "",
    datastructure: "",
    Company: "",
    Difficulty: "",
    Platform: "",
  });
  
  const [isOpen, setIsOpen] = useState(false); // State to manage the modal open/close status
  const [approach, setApproach] = useState({}); // State to hold approaches fetched for each question
  const [selectedQuestion, setSelectedQuestion] = useState(null); // State to hold the currently selected question
  const [questionId, setQuestionId] = useState(undefined); // State to hold the ID of the selected question
  const [solutionId, setSolutionId] = useState(undefined); // State to hold the ID of the selected solution
  const [appopen, setAppopen] = useState(false); // State to manage the approach modal open/close status

  const [newQuestion, setNewQuestion] = useState({ // State for new question input
    questionName: "",
    platform: "",
    link: "",
    solutionVideoLink: "",
    solutionArticleLink: "",
    Difficulty: "",
    companyTags: [],
    dataStructureTags: [],
    difficultyTag: "",
    platformTags: [],
    intop: false,
    lists: [],
  });

  // Effect to fetch questions from the API
  useEffect(() => {
    const fetchQuestions = async () => {
      const filterobj = JSON.stringify(questionType); // Convert the filter object to JSON
      try {
        const response = await fetch(
          `${url}api/dsa?limit=${rowsPerPage}&filter=${filterobj}&page=${currentPage}&search=${filterInput}`, //
          {
            method: "GET", // HTTP method
            credentials: "include", // Include credentials in the request
          }
        );
        if (response.status!=200) { // If unauthorized, redirect to signup
          router.push("/signup"); 
          alert("signup first") // Alert the user to sign up first
          return;
        }
        const data = await response.json(); // Parse the response to JSON
        setQuestions(data.problems); // Update the questions state with fetched data
        setTotalPages(data.totalPages); // Set the total pages from the fetched data
      } catch (error) {
        console.error("Error fetching questions:", error); // Log any error during fetch
      } finally {
        setIsLoading(false); // Set loading to false once done
      }
    };
    fetchQuestions(); // Call the fetch function
  }, [currentPage, rowsPerPage, questionType, filterInput]); // Dependency array for the effect

  // Effect to fetch solutions for each question
  useEffect(() => {
    const fetchSolutions = async (questionId) => {
      try {
        const response = await fetch(`${url}api/solution`, { // Fetch solutions from the API
          method: "GET",
          headers: {
            questionid: questionId, // Include question ID in headers
          },
          credentials: "include", // Include credentials in the request
        });
        if (!response.ok) { // If response is not OK
          const error = await response.json(); // Parse the error
          console.error(error); // Log the error
          return;
        }

        const solution = await response.json(); // Parse the solution data
        console.log(`Solutions for question ID ${questionId}:`, solution); // Log the solution
        console.log("appppp",approach) // Log the current approach state for debugging
        console.log("solution",solution); // Log the fetched solution
        setApproach((prevApproach) => ({ // Update the approach state with new solution
          ...prevApproach,
          [questionId]: solution, // Add the new solution for the specific question ID
        }));
      } catch (error) {
        console.log(error); // Log any fetch error
      }
    };

    if (questions.length) { // If there are questions, fetch solutions for each
      questions.forEach((question) => {
        fetchSolutions(question._id); // Fetch solutions for each question ID
      });
    }
  }, [questions]); // Dependency on questions state

  const handleOpen = (question, questionId) => { // Function to handle opening the solution form modal
    setSelectedQuestion(question); // Set the selected question
    setQuestionId(questionId); // Set the question ID
    setIsOpen(true); // Open the modal
  };

  const handleClose = () => { // Function to handle closing modals
    setIsOpen(false); // Close the solution form modal
    setAppopen(false); // Close the approach modal
  };

  const handlePageChange = (page) => { // Function to handle pagination
    if (page > 0 && page <= totalPages) { // Ensure page is within valid range
      setCurrentPage(page); // Update the current page
    }
  };

  const handleSolutionClick = (sol) => { // Function to handle clicking on a solution
    setSolutionId(sol._id); // Set the solution ID
    setAppopen(true); // Open the approach modal
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1); // Create an array for pagination

  return (
    <div className="container mx-auto p-4 overflow-x-auto transition-all duration-500 ease-in-out h-screen"> 
      {isLoading && <h1 className="text-center text-xl">Loading...</h1>} {/* Show loading message */}

      {!isLoading && questions.length === 0 && ( // If loading is complete and no questions are available
        <div className="text-center">
          <h2 className="text-xl font-semibold">No Questions Available</h2> {/* Message for no questions */}
          <p className="text-gray-500">
            It seems there are no questions in the database.
          </p>
        </div>
      )}
      <Filters // Render the Filters component
        filterInput={filterInput} // Pass filter input state
        setFilterInput={setFilterInput} // Pass setter function for filter input
        questionType={questionType} // Pass question type state
        setQuestionType={setQuestionType} // Pass setter function for question type
      />

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white border border-gray-300 table-fixed"> {/* Render the questions table */}
          <thead className="bg-gray-700 text-white">
            <tr>
              {[ // Define table headers
                "S.NO",
                "Question",
                "Platform",
                "Link",
                "Solution-Video",
                "Solution-Article",
                "Complexity",
                "Companies",
                "DataStructure",
                "Solutions",
              ].map((header) => (
                <th
                  key={header}
                  className="border border-gray-300 px-4 py-2 text-center"
                >
                  {header} {/* Render each header */}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {questions.map((question, index) => { // Map through the questions to render rows
                 console.log("approach",approach) // Log the approach for debugging
              return (
                <tr
                  key={question._id} // Unique key for each row
                  className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"}` // Alternate row colors
                }>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {index + 1} {/* Display serial number */}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center w-[30rem]">
                    {question.questionName} {/* Display question name */}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {question.platformTags.map((tag) => tag.name).join(", ")} {/* Display platform tags */}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <a
                      className="text-blue-600 hover:text-blue-800 underline"
                      href={question.link} // Link to question
                    >
                      Click
                    </a>
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <a
                      className="text-green-600 hover:text-green-800 underline"
                      href={question.solutionVideoLink} // Link to solution video
                    >
                      Link
                    </a>
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <a
                      className="text-red-600 hover:text-red-800 underline"
                      href={question.solutionArticleLink} // Link to solution article
                    >
                      Link
                    </a>
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <span
                      className={`py-1 px-3 rounded-full text-xs ${ // Dynamic styling for difficulty tag
                        question.difficultyTags[0].level === "easy"
                          ? "bg-green-100 text-green-600"
                          : question.difficultyTags[0].level === "medium"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {question.difficultyTags.map((tag) => tag.level)} {/* Display difficulty level */}
                    </span>
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {question.companyTags.map((tag) => tag.name).join(", ")} {/* Display company tags */}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {question.dataStructureTags.map((tag) => tag.name).join(", ")} {/* Display data structure tags */}
                  </td>

                  <td className="border border-gray-300 px-4 py-2 text-center w-[300px]">
                    <div className="flex space-x-2 overflow-x-auto"> {/* Render action buttons */}
                      <button
                        onClick={() => handleOpen(question.questionName, question._id)} // Handle opening the solution form
                        className="bg-blue-500 text-white font-semibold py-1 px-2 rounded hover:bg-blue-600 transition whitespace-nowrap"
                      >
                        + Add {/* Button to add solution */}
                      </button>
                      {approach[question._id] && // If approaches exist for the question
                        approach[question._id].map((sol, idx) => (
                          <span
                            key={idx} // Unique key for each solution button
                            className="bg-blue-500 text-white font-semibold py-1 px-2 rounded hover:bg-blue-600 transition whitespace-nowrap"
                            onClick={() => handleSolutionClick(sol)} // Handle clicking on a solution
                          >
                            Approach {idx + 1} {/* Display approach number */}
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

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <div>
          <button
            onClick={() => handlePageChange(currentPage - 1)} // Handle previous page click
            disabled={currentPage === 1} // Disable if on first page
            className="bg-gray-300 p-2 rounded disabled:opacity-50"
          >
            Previous {/* Previous page button */}
          </button>
          {pages.map((page) => ( // Render page number buttons
            <button
              key={page}
              onClick={() => handlePageChange(page)} // Handle page change
              className={`mx-1 p-2 rounded transition ${
                currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {page} {/* Display page number */}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)} // Handle next page click
            disabled={currentPage === totalPages} // Disable if on last page
            className="bg-gray-300 p-2 rounded disabled:opacity-50"
          >
            Next {/* Next page button */}
          </button>
        </div>
        <div>
          <label htmlFor="rowsPerPage" className="mr-2">
            Rows per page: {/* Label for rows per page selector */}
          </label>
          <select
            id="rowsPerPage"
            value={rowsPerPage} // Current value of rows per page
            onChange={(e) => setRowsPerPage(Number(e.target.value))} // Update rows per page on change
            className="border rounded p-2"
          >
            {[5, 10, 20, 50].map((size) => ( // Options for rows per page
              <option key={size} value={size}>
                {size} {/* Display each option */}
              </option>
            ))}
          </select>
        </div>
      </div>

      <SolutionFormModal // Render the solution form modal
        isOpen={isOpen} // Open state
        onClose={handleClose} // Function to close modal
        questionName={selectedQuestion} // Pass selected question name
        questionid={questionId} // Pass selected question ID
        newQuestion={newQuestion} // Pass new question state
        setNewQuestion={setNewQuestion} // Pass setter for new question
      />
      <ApproachModal // Render the approach modal
        isOpen={appopen} // Open state
        onClose={handleClose} // Function to close modal
        solutionId={solutionId} // Pass selected solution ID
      />
    </div>
  );
};

export default DsaQuestionsTable; // Export the component
