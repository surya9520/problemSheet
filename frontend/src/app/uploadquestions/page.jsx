"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Select from "react-select";
import { url } from "@/helper";
import Navbar from "@/components/Navbar";

const DsaForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      questionName: "",
      link: "",
      solutionVideoLink: "",
      solutionArticleLink: "",
      companyTags: [],
      dataStructureTags: [],
      lists: [],
      platformTags: [],
      description: "",
      difficultyTags: [],
    },
  });

  const [submitError, setSubmitError] = useState("");
  const [listOption, setListOption] = useState([]);
  const [companyOptions, setCompanyOptions] = useState([]);
  const [dataStructureOptions, setDataStructureOptions] = useState([]);
  const [complexityOptions, setComplexityOptions] = useState([]);
  const [platformOptions, setPlatformOptions] = useState([]);

  // Fetch data for the select options
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchlist = async () => {
          const response = await fetch(`${url}api/admin/lists`, {
            method: "GET",
            credentials: "include",
          });
          const data = await response.json();
          const formattedLists = data.map((val) => ({
            value: val._id,
            label: val.listName,
          }));
          setListOption(formattedLists);
        };

        const fetchCompany = async () => {
          const response = await fetch(`${url}api/admin/tags/companies`, {
            method: "GET",
            credentials: "include",
          });
          const data = await response.json();
          const formattedCompanyOptions = data.map((val) => ({
            value: val._id,
            label: val.name,
          }));
          setCompanyOptions(formattedCompanyOptions);
        };

        const fetchDataStructure = async () => {
          const response = await fetch(`${url}api/admin/tags/datastructures`, {
            method: "GET",
            credentials: "include",
          });
          const data = await response.json();
          const formattedDSOptions = data.map((val) => ({
            value: val._id,
            label: val.name,
          }));
          setDataStructureOptions(formattedDSOptions);
        };

        const fetchComplexity = async () => {
          const response = await fetch(`${url}api/admin/tags/complexities`, {
            method: "GET",
            credentials: "include",
          });
          const data = await response.json();
          const formattedComplexityOptions = data.map((val) => ({
            value: val._id,
            label: val.level,
          }));
          setComplexityOptions(formattedComplexityOptions);
        };

        const fetchPlatform = async () => {
          const response = await fetch(`${url}api/admin/tags/platforms`, {
            method: "GET",
            credentials: "include",
          });
          const data = await response.json();
          const formattedPlatformOptions = data.map((val) => ({
            value: val._id,
            label: val.name,
          }));
          setPlatformOptions(formattedPlatformOptions);
        };

        await fetchlist();
        await fetchCompany();
        await fetchDataStructure();
        await fetchComplexity();
        await fetchPlatform();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await fetch(`${url}api/dsa`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      const message = await response.json();
      setSubmitError("");
      alert(message.msg);
    } catch (error) {
      setSubmitError("Submission failed. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white rounded-lg shadow-lg p-10 max-w-3xl w-full">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            DSA Details Form
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-6"
          >
            {/* Question Name */}
            <div>
              <label
                htmlFor="questionName"
                className="block text-gray-700 font-semibold"
              >
                Question Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="questionName"
                {...register("questionName", {
                  required: "Question name is required",
                })}
                className={`border-2 w-full p-3 mt-1 rounded-lg focus:outline-none ${
                  errors.questionName ? "border-red-600" : "border-gray-300"
                }`}
                placeholder="Enter question name"
              />
              {errors.questionName && (
                <p className="text-red-600 text-sm">
                  {errors.questionName.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-gray-700 font-semibold"
              >
                Description <span className="text-red-600">*</span>
              </label>
              <textarea
                id="description"
                {...register("description", {
                  required: "Description is required",
                })}
                className={`border-2 w-full p-3 mt-1 rounded-lg focus:outline-none ${
                  errors.description ? "border-red-600" : "border-gray-300"
                }`}
                placeholder="Enter description of the problem"
                rows={4}
              />
              {errors.description && (
                <p className="text-red-600 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Platform and Complexity in one line */}
            <div className="grid grid-cols-2 gap-4">
              {/* Platform (Single select) */}
              <div>
                <label
                  htmlFor="platform"
                  className="block text-gray-700 font-semibold"
                >
                  Platform <span className="text-red-600">*</span>
                </label>
                <Select
                  id="platform"
                  options={platformOptions}
                  classNamePrefix="react-select"
                  className={`mt-1 ${
                    errors.platform ? "border-red-600" : "border-gray-300"
                  }`}
                  onChange={(selectedOption) => {
                    setValue(
                      "platformTags",
                      selectedOption ? [selectedOption.value] : []
                    );
                  }}
                  placeholder="Select platform"
                />
                {errors.platform && (
                  <p className="text-red-600 text-sm">
                    {errors.platform.message}
                  </p>
                )}
              </div>

              {/* Complexity */}
              <div>
                <label
                  htmlFor="complexity"
                  className="block text-gray-700 font-semibold"
                >
                  Complexity <span className="text-red-600">*</span>
                </label>
                <Select
                  id="complexity"
                  options={complexityOptions}
                  classNamePrefix="react-select"
                  className={`mt-1 ${
                    errors.complexity ? "border-red-600" : "border-gray-300"
                  }`}
                  onChange={(selectedOption) => {
                    setValue(
                      "difficultyTags",
                      selectedOption ? [selectedOption.value] : []
                    );
                  }}
                  placeholder="Select complexity"
                />
                {errors.complexity && (
                  <p className="text-red-600 text-sm">
                    {errors.complexity.message}
                  </p>
                )}
              </div>
            </div>

            {/* Problem Link */}
            <div>
              <label
                htmlFor="link"
                className="block text-gray-700 font-semibold"
              >
                Problem Link <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="link"
                {...register("link", { required: "Problem link is required" })}
                className={`border-2 w-full p-3 mt-1 rounded-lg focus:outline-none ${
                  errors.link ? "border-red-600" : "border-gray-300"
                }`}
                placeholder="Enter problem link"
              />
              {errors.link && (
                <p className="text-red-600 text-sm">{errors.link.message}</p>
              )}
            </div>

            {/* Solution Video Link */}
            <div>
              <label
                htmlFor="solutionVideoLink"
                className="block text-gray-700 font-semibold"
              >
                Solution Video Link
              </label>
              <input
                type="text"
                id="solutionVideoLink"
                {...register("solutionVideoLink")}
                className="border-2 w-full p-3 mt-1 rounded-lg focus:outline-none border-gray-300"
                placeholder="Enter solution video link (if available)"
              />
            </div>

            {/* Solution Article Link */}
            <div>
              <label
                htmlFor="solutionArticleLink"
                className="block text-gray-700 font-semibold"
              >
                Solution Article Link
              </label>
              <input
                type="text"
                id="solutionArticleLink"
                {...register("solutionArticleLink")}
                className="border-2 w-full p-3 mt-1 rounded-lg focus:outline-none border-gray-300"
                placeholder="Enter solution article link (if available)"
              />
            </div>

            {/* Select Lists */}
            <div>
              <label
                htmlFor="lists"
                className="block text-gray-700 font-semibold"
              >
                Select Lists
              </label>
              <Select
                id="lists"
                isMulti
                options={listOption}
                classNamePrefix="react-select"
                className={`mt-1 ${
                  errors.lists ? "border-red-600" : "border-gray-300"
                }`}
                onChange={(selectedOptions) => {
                  setValue(
                    "lists",
                    selectedOptions
                      ? selectedOptions.map((option) => option.value)
                      : []
                  );
                }}
                placeholder="Select lists"
              />
            </div>

            {/* Company Tags */}
            <div>
              <label
                htmlFor="companyTags"
                className="block text-gray-700 font-semibold"
              >
                Company Tags
              </label>
              <Select
                id="companyTags"
                isMulti
                options={companyOptions}
                classNamePrefix="react-select"
                className={`mt-1 ${
                  errors.companyTags ? "border-red-600" : "border-gray-300"
                }`}
                onChange={(selectedOptions) => {
                  setValue(
                    "companyTags",
                    selectedOptions
                      ? selectedOptions.map((option) => option.value)
                      : []
                  );
                }}
                placeholder="Select company tags"
              />
            </div>

            {/* Data Structure Tags */}
            <div>
              <label
                htmlFor="dataStructureTags"
                className="block text-gray-700 font-semibold"
              >
                Data Structure Tags
              </label>
              <Select
                id="dataStructureTags"
                isMulti
                options={dataStructureOptions}
                classNamePrefix="react-select"
                className={`mt-1 ${
                  errors.dataStructureTags
                    ? "border-red-600"
                    : "border-gray-300"
                }`}
                onChange={(selectedOptions) => {
                  setValue(
                    "dataStructureTags",
                    selectedOptions
                      ? selectedOptions.map((option) => option.value)
                      : []
                  );
                }}
                placeholder="Select data structure tags"
              />
            </div>
            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
              >
                Submit
              </button>
              {submitError && (
                <p className="text-red-600 mt-3 text-sm">{submitError}</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default DsaForm;
