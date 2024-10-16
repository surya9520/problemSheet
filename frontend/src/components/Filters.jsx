import { url } from "@/helper";
import { useEffect, useState } from "react";
import Select from "react-select";

const Filters = ({
  filterInput,
  setFilterInput,
  questionType,
  setQuestionType,
}) => {
  const [lists, setLists] = useState([]);
  const [dataStructure, setDataStructure] = useState([]);
  const [company, setCompany] = useState([]);
  const [difficulty, setDifficulty] = useState("");
  const [platform,setPlatform]=useState([]);
  const [doptions, setDoptions] = useState([]);
  const [coptions, setCoptions] = useState([]);
  const [pltoptions, setPltoptions] = useState([]);
  const [diffoptions, setDiffoptions] = useState([
    { value: "", label: "none" },
  ]);

  const handleChange = (options) => {
    setDataStructure(options);
    console.log(dataStructure);
    const dslist = options.map((val) => `${val.value}`);
    console.log(dslist);
    setQuestionType((prev) => ({
      ...prev,
      datastructure: dslist,
    }));
  };

  const handleChangePlatform = (options) => {
    setPlatform(options);
    const pltlist = options.map((val) => `${val.value}`);
    setQuestionType((prev) => ({
      ...prev,
      Platform: pltlist,
    }));
  };

  const handleChangeCompany = (options) => {
    setCompany(options);
    const complist = options.map((val) => `${val.value}`);
    setQuestionType((prev) => ({
      ...prev,
      Company: complist,
    }));
  };
  const handleChangediff = (options) => {
    setDifficulty(options);
    setQuestionType((prev) => ({
      ...prev,
      Difficulty: options.value,
    }));
  };
  //fetch list
  const fetchlist = async () => {
    const response = await fetch(`${url}api/admin/lists`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      const error = await response.json();
      console.error("Error fetching lists:", error.msg || "Something went wrong");
      return
    }
    const data = await response.json();
    setLists(data);
    console.log(data);
  };

  //fetch datastructure
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
    const formatedOptions = data.map((val) => {
      return { value: val._id, label: val.name };
    });
    setDoptions(formatedOptions);
    console.log(data);
  };

  //fetch company
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
    const formatedOptions = data.map((val) => {
      return { value: val._id, label: val.name };
    });
    setCoptions(formatedOptions);
    console.log(data);
  };

  //fetch complexity
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
    const formatedOptions = data.map((val) => {
      return { value: val._id, label: val.level };
    });
    setDiffoptions((prev) => [...prev, ...formatedOptions]);
    console.log(data);
  };

  //fetch platform
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
    const formatedOptions = data.map((val) => {
      return { value: val._id, label: val.name };
    });
    setPltoptions(formatedOptions);
    console.log(data);
  };

  useEffect(() => {
    fetchlist();
    fetchComp();
    fetchds();
    fetchDiff();
    fetchPlt()
  }, []);

  return (
    <div className="flex justify-between mb-4">
      <input
        value={filterInput}
        onChange={(e) => setFilterInput(e.target.value)}
        placeholder="Search..."
        className="border rounded p-2 w-1/3"
      />
      <div className="flex items-center space-x-2 content-around">
        <select
          id="questionType"
          value={questionType.list}
          placeholder="List"
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
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          controlShouldRenderValue={false}
          value={dataStructure}
          onChange={handleChange}
          options={doptions}
          placeholder="DataStructure"
        />

        <Select
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          controlShouldRenderValue={false}
          value={platform}
          onChange={handleChangePlatform}
          options={pltoptions}
          placeholder="platform"
        />
        <Select
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          controlShouldRenderValue={false}
          value={company}
          onChange={handleChangeCompany}
          options={coptions}
          placeholder="company"
        />
        <Select
          //   hideSelectedOptions={false}
          //   controlShouldRenderValue={false}
          value={difficulty}
          onChange={handleChangediff}
          options={diffoptions}
          placeholder="complexity"
        />
      </div>
    </div>
  );
};

export default Filters;
