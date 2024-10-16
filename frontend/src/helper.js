export let url='http://localhost:4000/'

// Log in

// Sign up
// You said:
// "use client";
// import { fetchquestion } from "@/store/slices/questionslices";
// import { useEffect, useMemo, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   useTable,
//   useGlobalFilter,
//   useSortBy,
//   usePagination,
// } from "react-table";
// import { columnsdata } from "./columns";
// import Modal from "@/components/modal";
// import { url } from "@/helper";
// import {
//   FaSort,
//   FaSortUp,
//   FaSortDown,
//   FaChevronLeft,
//   FaChevronRight,
// } from "react-icons/fa";
// import ApproachModal from "@/components/ApproachModal";

// const DsaQuestionsTable = () => {
//   const dispatch = useDispatch();
//   const [approach, setApproach] = useState([]);
//   const questions = useSelector((state) => state.questions);
//   const [isLoading, setIsLoading] = useState(true);
//   const [filterInput, setFilterInput] = useState("");
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [questionType, setQuestionType] = useState("");
//   const [solutionid, setSolutionid] = useState(undefined);
//   useEffect(() => {
//     const fetchQuestions = () => {
//       dispatch(fetchquestion());
//       setIsLoading(false);
//     };
//     fetchQuestions();
//   }, [dispatch]);

//   useEffect(() => {
//     const fetchSolutions = async (questionId) => {
//       try {
//         const response = await fetch(${url}api/solution, {
//           method: "GET",
//           headers: {
//             questionid: questionId,
//           },
//           credentials: "include",
//         });

//         if (!response.ok) {
//           const error = await response.json();
//           console.error(error);
//           return;
//         }

//         const solution = await response.json();
//         console.log(solution);
//         setApproach((prevApproach) => [...prevApproach, solution]);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     if (questions.data && Array.isArray(questions.data)) {
//       questions.data.forEach((question) => {
//         if (!approach.some((sol) => sol.questionId === question._id)) {
//           fetchSolutions(question._id);
//         }
//       });
//     }
//   }, [questions.data]);

//   const handleOpen = (question, questionId) => {
//     setSelectedQuestion(question);
//     setQuestionId(questionId);
//     setIsOpen(true);
//   };
//   const handleSolutionClick = (question, solution_id) => {
//     setSelectedQuestion(question);
//     setSolutionid(solution_id);
//     console.log(solution_id)
//     setIsOpen(true);
//   };

//   const columns = useMemo(
//     () => columnsdata(handleOpen, approach, handleSolutionClick),
//     [approach]
//   );
//   const data = useMemo(
//     () => (questions.data ? questions.data : []),
//     [questions]
//   );

//   const filteredData = useMemo(() => {
//     return data.filter((item) => {
//       if (questionType) {
//         return item.type === questionType; // Assuming type is the property name for question type
//       }
//       return true;
//     });
//   }, [data, questionType]);

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     page,
//     prepareRow,
//     setGlobalFilter,
//     state,
//     canPreviousPage,
//     canNextPage,
//     pageOptions,
//     gotoPage,
//     nextPage,
//     previousPage,
//     setPageSize,
//   } = useTable(
//     {
//       columns,
//       data: filteredData, // Use filtered data
//       initialState: { pageSize: rowsPerPage }, // Set initial page size without default sort
//     },
//     useGlobalFilter,
//     useSortBy,
//     usePagination
//   );

//   const handleSearchChange = (e) => {
//     const value = e.target.value || undefined;
//     setGlobalFilter(value);
//     setFilterInput(value);
//   };

//   const handleQuestionTypeChange = (e) => {
//     setQuestionType(e.target.value);
//   };

//   //submit solutions
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedQuestion, setSelectedQuestion] = useState(null);
//   const [questionId, setQuestionId] = useState(null);

//   const handleClose = () => {
//     setIsOpen(false);
//   };

//   const handleOnSubmit = () => {
//     console.log("submitted");
//     setIsOpen(false);
//   };

//   return (
//     <div className="container mx-auto p-4">
//       {isLoading && <h1 className="text-center text-xl">Loading...</h1>}

//       {!isLoading && data.length === 0 && (
//         <div className="text-center">
//           <h2 className="text-xl font-semibold">No Questions Available</h2>
//           <p className="text-gray-500">
//             It seems there are no questions in the database.
//           </p>
//         </div>
//       )}
//       <div className="w-full flex justify-between">
//         <input
//           value={filterInput}
//           onChange={handleSearchChange}
//           placeholder="Search..."
//           className="border rounded p-2 mb-4"
//         />

//         <div className="mb-4">
//           <label htmlFor="questionType" className="mr-2">
//             Filter by Type:
//           </label>
//           <select
//             id="questionType"
//             value={questionType}
//             onChange={handleQuestionTypeChange}
//             className="border rounded p-2"
//           >
//             <option value="">All</option>
//             <option value="stack">Stack</option>
//             <option value="linkedlist">Linked List</option>
//             <option value="tree">Tree</option>
//             <option value="queue">Queue</option>
//             <option value="graph">Graph</option>
//             <option value="dp">Dynamic Programming</option>
//             <option value="top50">Top 50</option>
//           </select>
//         </div>
//       </div>

//       <div className="overflow-x-auto shadow-lg rounded-lg">
//         <table
//           {...getTableProps()}
//           className="min-w-full bg-white border border-gray-300"
//         >
//           <thead className="bg-gray-600 text-white">
//             {headerGroups.map((headerGroup) => (
//               <tr {...headerGroup.getHeaderGroupProps()}>
//                 {headerGroup.headers.map((column) => (
//                   <th
//                     {...column.getHeaderProps(column.getSortByToggleProps())}
//                     className={px-4 py-2 border-b border-gray-300 text-center cursor-pointer ${
//                       column.className || ""
//                     }}
//                   >
//                     <div className="flex items-center justify-center">
//                       {column.render("Header")}
//                       {column.id === "complexity" && (
//                         <div className="inline-flex items-center ml-1">
//                           {column.isSorted ? (
//                             column.isSortedDesc ? (
//                               <FaSortDown className="ml-1" />
//                             ) : (
//                               <FaSortUp className="ml-1" />
//                             )
//                           ) : (
//                             <FaSort className="ml-1" />
//                           )}
//                         </div>
//                       )}
//                     </div>
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>
//           <tbody {...getTableBodyProps()}>
//             {page.length === 0 ? (
//               <tr>
//                 <td colSpan={columns.length} className="text-center py-4">
//                   No data available
//                 </td>
//               </tr>
//             ) : (
//               page.map((row, rowIndex) => {
//                 prepareRow(row);
//                 return (
//                   <tr
//                     {...row.getRowProps()}
//                     className={hover:bg-gray-100 ${
//                       rowIndex % 2 === 0 ? "bg-white" : "bg-gray-100"
//                     }}
//                   >
//                     {row.cells.map((cell) => (
//                       <td
//                         {...cell.getCellProps()}
//                         className={px-4 py-2 border-b border-gray-300 text-center ${
//                           cell.column?.className || ""
//                         }}
//                       >
//                         {cell.render("Cell")}
//                       </td>
//                     ))}
//                   </tr>
//                 );
//               })
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination Controls */}
//       <div className="flex justify-between items-center mt-4">
//         <div className="text-center">
//           Page{" "}
//           <strong>
//             {state.pageIndex + 1} of {pageOptions.length}
//           </strong>
//         </div>
//         <div>
//           <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
//             <FaChevronLeft />
//           </button>
//           <button onClick={() => previousPage()} disabled={!canPreviousPage}>
//             <FaChevronLeft />
//           </button>
//           <button onClick={() => nextPage()} disabled={!canNextPage}>
//             <FaChevronRight />
//           </button>
//           <button
//             onClick={() => gotoPage(pageOptions.length - 1)}
//             disabled={!canNextPage}
//           >
//             <FaChevronRight />
//           </button>
//         </div>
//         {/* <div>
//           <span> | Go to page: </span>
//           <input
//             type="number"
//             defaultValue={state.pageIndex + 1}
//             onChange={(e) => {
//               const pageNumber = e.target.value
//                 ? Number(e.target.value) - 1
//                 : 0;
//               gotoPage(pageNumber);
//             }}
//           />
//         </div> */}
//         <div className="mb-4">
//           <label htmlFor="rowsPerPage" className="mr-2">
//             Rows per page:
//           </label>
//           <select
//             id="rowsPerPage"
//             value={rowsPerPage}
//             onChange={(e) => {
//               setRowsPerPage(Number(e.target.value));
//               setPageSize(Number(e.target.value));
//             }}
//             className="border rounded p-2"
//           >
//             {[5, 10, 20, 50].map((size) => (
//               <option key={size} value={size}>
//                 {size}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       <Modal
//         isOpen={isOpen}
//         onClose={handleClose}
//         onSubmit={handleOnSubmit}
//         questionName={selectedQuestion}
//         questionid={questionId}
//       />
//       <ApproachModal
//         isOpen={isOpen}
//         onClose={handleClose}
//         onSubmit={handleOnSubmit}
//         questionName={selectedQuestion}
//         solutionId={solutionid}
//       />
//     </div>
//   );
// };

// export default DsaQuestionsTable;


// import { FaSort } from "react-icons/fa"; // Import an icon from a library

// export const columnsdata = (handleOpen, approach,handleolutionClick) => [
//   {
//     Header: "S.NO",
//     accessor: (row, index) => index + 1,
//     id: "serialNumber",
//     disableSortBy: true,
//   },
//   {
//     Header: "Question",
//     accessor: "questionName",
//     className: 'w-80',
//     disableSortBy: true,
//   },
//   {
//     Header: "Platform",
//     accessor: "platform",
//     disableSortBy: true,
//   },
//   {
//     Header: "Link",
//     accessor: "link",
//     Cell: ({ row }) => (
//       <a className="text-blue-600 hover:text-blue-800 underline" href={row.original.link}>
//         click
//       </a>
//     ),
//     disableSortBy: true,
//   },
//   {
//     Header: "Solution-Video",
//     accessor: "solutionVideoLink",
//     Cell: ({ row }) => (
//       <a className="text-green-600 hover:text-green-800 underline" href={row.original.solutionVideoLink}>
//         Link
//       </a>
//     ),
//     disableSortBy: true,
//   },
//   {
//     Header: "Solution-Article",
//     accessor: "solutionArticleLink",
//     Cell: ({ row }) => (
//       <a className="text-red-600 hover:text-red-800 underline" href={row.original.solutionArticleLink}>
//         Link
//       </a>
//     ),
//     disableSortBy: true,
//   },
//   {
//     Header: (
//       <div className="flex items-center">
//         <span>Complexity</span>
//       </div>
//     ),
//     accessor: "complexity",
//     sortType: (a, b) => {
//       const complexityOrder = { easy: 1, medium: 2, hard: 3 };
//       return complexityOrder[a.original.complexity] - complexityOrder[b.original.complexity];
//     },
//     Cell: ({ row }) => (
//       <span
//         className={py-1 px-3 rounded-full text-xs ${
//           row.original.complexity === "easy"
//             ? "bg-green-100 text-green-600"
//             : row.original.complexity === "medium"
//             ? "bg-yellow-100 text-yellow-600"
//             : "bg-red-100 text-red-600"
//         }}
//       >
//         {row.original.complexity}
//       </span>
//     ),
//     getSortByToggleProps: (column) => ({
//       onClick: (e) => {
//         e.preventDefault();
//         column.toggleSortBy(!column.isSorted || (column.isSortedDesc ? false : true));
//       },
//     }),
//   },
//   {
//     Header: "Companies",
//     accessor: "companyTags",
//     disableSortBy: true,
//   },
//   {
//     Header: "DataStructure",
//     accessor: "datastructureTags",
//     disableSortBy: true,
//   },
//   {
//     Header: "Solution",
//     accessor: "questionId",
//     Cell: ({ row }) => (
//       <div className="flex space-x-1 overflow-x-auto max-w-xs">
//         <button
//           onClick={() => handleOpen(row.original.questionName, row.original._id)}
//           className="bg-blue-500 text-white font-semibold py-1 px-1 rounded hover:bg-blue-600 text-sm whitespace-nowrap"
//         >
//           + add
//         </button>
//         {approach.map((value) =>
//           value.map((approach, index) => (
//             approach.questionId === row.original._id && (
//               <button
//                 key={approach._id}
//                 className="bg-blue-500 text-white font-semibold py-1 px-1 rounded hover:bg-blue-600 text-sm whitespace-nowrap"
//                 onClick={() =>handleSolutionClick(approach._id)}
//               >
//                 Approach {index + 1}
//               </button>
//             )
//           ))
//         )}
//       </div>
//     ),
//     disableSortBy: true,
//   },
//   // {
//   //   Header: "Review",
//   //   accessor: "review",
//   //   disableSortBy: true,
//   // },
// ];


