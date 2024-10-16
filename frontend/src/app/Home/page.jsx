"use client";

import { useEffect, useState } from "react";
import Modal from "@/components/modal";
import { url } from "@/helper";
import ApproachModal from "@/components/ApproachModal";
import Filters from "@/components/Filters";
import { useRouter } from "next/navigation";

const DsaQuestionsTable = () => {
  const router = useRouter();
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

  const [newQuestion, setNewQuestion] = useState({
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

  useEffect(() => {
    const fetchQuestions = async () => {
      const filterobj = JSON.stringify(questionType);
      try {
        const response = await fetch(
          `${url}api/dsa?limit=${rowsPerPage}&filter=${filterobj}&page=${currentPage}&search=${filterInput}`, //
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (response.status === 401) {
          router.push("/signup"); 
          alert("signup first")
          return;
        }
        const data = await response.json();
        setQuestions(data.problems);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuestions();
  }, [currentPage, rowsPerPage, questionType, filterInput]);
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
        console.log("appppp",approach)
        console.log("solution",solution);
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

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const handleSolutionClick = (sol) => {
    setSolutionId(sol._id);
    setAppopen(true);
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="container mx-auto p-4 overflow-x-auto transition-all duration-500 ease-in-out h-screen">
      {isLoading && <h1 className="text-center text-xl">Loading...</h1>}

      {!isLoading && questions.length === 0 && (
        <div className="text-center">
          <h2 className="text-xl font-semibold">No Questions Available</h2>
          <p className="text-gray-500">
            It seems there are no questions in the database.
          </p>
        </div>
      )}
      <Filters
        filterInput={filterInput}
        setFilterInput={setFilterInput}
        questionType={questionType}
        setQuestionType={setQuestionType}
      />

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white border border-gray-300 table-fixed">
          <thead className="bg-gray-700 text-white">
            <tr>
              {[
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
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {questions.map((question, index) => {
                 console.log("approach",approach)
              return (
                <tr
                  key={question._id}
                  className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                >
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center w-[30rem]">
                    {question.questionName}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                  {question.platformTags.map((tag) => tag.name).join(", ")}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <a
                      className="text-blue-600 hover:text-blue-800 underline"
                      href={question.link}
                    >
                      Click
                    </a>
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <a
                      className="text-green-600 hover:text-green-800 underline"
                      href={question.solutionVideoLink}
                    >
                      Link
                    </a>
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <a
                      className="text-red-600 hover:text-red-800 underline"
                      href={question.solutionArticleLink}
                    >
                      Link
                    </a>
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <span
                      className={`py-1 px-3 rounded-full text-xs ${
                        question.difficultyTags[0].level === "easy"
                          ? "bg-green-100 text-green-600"
                          :  question.difficultyTags[0].level === "medium"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {question.difficultyTags
                      .map((tag) => tag.level)}
                    </span>
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {question.companyTags.map((tag) => tag.name).join(", ")}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {question.dataStructureTags
                      .map((tag) => tag.name)
                      .join(", ")}
                  </td>

                  <td className="border border-gray-300 px-4 py-2 text-center w-[300px]">
                    <div className="flex space-x-2 overflow-x-auto">
                      <button
                        onClick={() =>
                          handleOpen(question.questionName, question._id)
                        }
                        className="bg-blue-500 text-white font-semibold py-1 px-2 rounded hover:bg-blue-600 transition whitespace-nowrap"
                      >
                        + Add
                      </button>
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

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <div>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-gray-300 p-2 rounded disabled:opacity-50"
          >
            Previous
          </button>
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`mx-1 p-2 rounded transition ${
                currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-gray-300 p-2 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
        <div>
          <label htmlFor="rowsPerPage" className="mr-2">
            Rows per page:
          </label>
          <select
            id="rowsPerPage"
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
            className="border rounded p-2"
          >
            {[5, 10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        questionName={selectedQuestion}
        questionid={questionId}
        newQuestion={newQuestion}
        setNewQuestion={setNewQuestion}
      />
      <ApproachModal
        isOpen={appopen}
        onClose={handleClose}
        solutionId={solutionId}
      />
    </div>
  );
};

export default DsaQuestionsTable;
