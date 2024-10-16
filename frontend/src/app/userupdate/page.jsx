"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useTable } from "react-table";
import { columnsData } from "./column";
import Link from "next/link";
import { url } from "@/helper";
import Navbar from "@/components/Navbar";
import { get } from "http";

const RoleTable = () => {
  const [users, setUsers] = useState([]);
  const [updatedRoles, setUpdatedRoles] = useState({}); // State to track updated roles

  useEffect(() => {
    // Fetch data from the backend
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}api/admin/users`,{
            method:'GET',
            credentials:"include"
        });
        const result = await response.json();
        console.log(result);
        setUsers(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Handle role change and update local state
  const handleRoleChange = (id, newRole) => {
    setUpdatedRoles((prev) => ({ ...prev, [id]: newRole })); // Store updated role
  };

  const columns = useMemo(() => columnsData(handleRoleChange), []);
  const data = useMemo(() => users, [users]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const handleSubmitChanges = async () => {
    try {
      await Promise.all(users.map(async (user) => {
        const roleToSubmit = updatedRoles[user._id] || user.role; // Use updated role if exists
        const response = await fetch(`${url}api/admin/users/${user._id}/role`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ role: roleToSubmit }),  // Send role in the request body
          credentials: 'include',  // Include credentials for cookies, etc.
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData);
        }
      }));

      alert("Roles updated successfully!");
    } catch (error) {
      console.error("Error submitting changes:", error);
      alert("Failed to submit changes.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table
            {...getTableProps()}
            className="min-w-full bg-white border border-gray-300"
          >
            <thead className="bg-gray-600 text-white">
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, index) => (
                    <th
                      {...column.getHeaderProps()}
                      className={`px-4 py-2 border-b border-gray-300 text-center ${
                        index > 0 ? "border-l border-gray-300" : ""
                      }`}
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row, rowIndex) => {
                prepareRow(row);
                return (
                  <tr
                    {...row.getRowProps()}
                    className={`hover:bg-gray-100 ${
                      rowIndex % 2 === 0 ? "bg-white" : "bg-gray-100"
                    }`}
                  >
                    {row.cells.map((cell, index) => (
                      <td
                        {...cell.getCellProps()}
                        className={`px-4 py-2 border-b border-gray-300 text-center ${
                          index > 0 ? "border-l border-gray-300" : ""
                        }`}
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-center">
          <button
            onClick={handleSubmitChanges}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Submit Changes
          </button>
        </div>
      </div>
    </>
  );
};

export default RoleTable;
