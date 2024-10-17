import { url } from "@/helper"; // Base URL import
import { useEffect, useState } from "react"; // React hooks for state management and lifecycle
import Select from "react-select"; // React-Select component for multi-select dropdowns

const Filters = ({
  filterInput, 
  setFilterInput, 
  questionType, 
  setQuestionType
}) => {
  // State for list data and tag options
  const [lists, setLists] = useState([]);
  const [dataStructure, setDataStructure] = useState([]);
  const [company, setCompany] = useState([]);
  const [difficulty, setDifficulty] = useState(""); // Difficulty state for single-select
  const [platform, setPlatform] = useState([]);

  // Options for select components
  const [doptions, setDoptions] = useState([]); // Data structure options
  const [coptions, setCoptions] = useState([]); // Company options
  const [pltoptions, setPltoptions] = useState([]); // Platform options
  const [diffoptions, setDiffoptions] = useState([{ value: "", label: "none" }]); // Difficulty options

  // Handler for data structure multi-select changes
  const handleChange = (options) => {
    setDataStructure(options); // Update selected data structures
    const dslist = options.map((val) => `${val.value}`); // Extract IDs from selected options
    setQuestionType((prev) => ({
      ...prev,
      datastructure: dslist, // Update question type with selected data structures
    }));
  };

  // Handler for platform multi-select changes
  const handleChangePlatform = (options) => {
    setPlatform(options); // Update selected platforms
    const pltlist = options.map((val) => `${val.value}`); // Extract IDs
    setQuestionType((prev) => ({
      ...prev,
      Platform: pltlist, // Update question type with platforms
    }));
  };

  // Handler for company multi-select changes
  const handleChangeCompany = (options) => {
    setCompany(options); // Update selected companies
    const complist = options.map((val) => `${val.value}`); // Extract IDs
    setQuestionType((prev) => ({
      ...prev,
      Company: complist, // Update question type with selected companies
    }));
  };

  // Handler for difficulty change (single-select)
  const handleChangediff = (options) => {
    setDifficulty(options); // Update selected difficulty
    setQuestionType((prev) => ({
      ...prev,
      Difficulty: options.value, // Update question type with difficulty
    }));
  };

  // Fetch lists from backend
  const fetchlist = async () => {
    const response = await fetch(`${url}api/admin/lists`, {
      method: "GET",
      credentials: "include", // Include cookies for authentication
    });
    if (!response.ok) {
      const error = await response.json();
      console.error("Error fetching lists:", error.msg || "Something went wrong");
      return;
    }
    const data = await response.json();
    setLists(data); // Update lists state
  };

  // Fetch data structure tags from backend
  const fetchds = async () => {
    const response = await fetch(`${url}api/admin/tags/datastructures`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error);
    }
    const data = await response.json();
    const formatedOptions = data.map((val) => ({
      value: val._id,
      label: val.name,
    }));
    setDoptions(formatedOptions); // Set data structure options
  };

  // Fetch company tags from backend
  const fetchComp = async () => {
    const response = await fetch(`${url}api/admin/tags/companies`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error);
    }
    const data = await response.json();
    const formatedOptions = data.map((val) => ({
      value: val._id,
      label: val.name,
    }));
    setCoptions(formatedOptions); // Set company options
  };

  // Fetch difficulty levels from backend
  const fetchDiff = async () => {
    const response = await fetch(`${url}api/admin/tags/complexities`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error);
    }
    const data = await response.json();
    const formatedOptions = data.map((val) => ({
      value: val._id,
      label: val.level,
    }));
    setDiffoptions((prev) => [...prev, ...formatedOptions]); // Set difficulty options
  };

  // Fetch platform tags from backend
  const fetchPlt = async () => {
    const response = await fetch(`${url}api/admin/tags/platforms`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error);
    }
    const data = await response.json();
    const formatedOptions = data.map((val) => ({
      value: val._id,
      label: val.name,
    }));
    setPltoptions(formatedOptions); // Set platform options
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchlist();
    fetchComp();
    fetchds();
    fetchDiff();
    fetchPlt();
  }, []);

  return (
    <div className="flex justify-between mb-4">
      {/* Input for searching */}
      <input
        value={filterInput}
        onChange={(e) => setFilterInput(e.target.value)}
        placeholder="Search..."
        className="border rounded p-2 w-1/3"
      />

      {/* Dropdowns and Select components */}
      <div className="flex items-center space-x-2 content-around">
        <select
          id="questionType"
          value={questionType.list}
          onChange={(e) =>
            setQuestionType((prev) => ({
              ...prev,
              list: e.target.value,
            }))
          }
          className="border rounded p-2"
        >
          <option value="">Lists</option>
          {lists.map((value) => (
            <option key={value._id} value={value._id}>
              {value.listName}
            </option>
          ))}
        </select>

        <Select
          isMulti
          value={dataStructure}
          onChange={handleChange}
          options={doptions}
          placeholder="Data Structure"
        />

        <Select
          isMulti
          value={platform}
          onChange={handleChangePlatform}
          options={pltoptions}
          placeholder="Platform"
        />

        <Select
          isMulti
          value={company}
          onChange={handleChangeCompany}
          options={coptions}
          placeholder="Company"
        />

        <Select
          value={difficulty}
          onChange={handleChangediff}
          options={diffoptions}
          placeholder="Complexity"
        />
      </div>
    </div>
  );
};

export default Filters;
