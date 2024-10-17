import Link from "next/link";

// Function to generate columns configuration for the table.
// Takes a handleRoleChange function as a parameter to handle role updates.
const columnsData = (handleRoleChange) => {
  return [
    {
      // Column for Serial Number
      Header: "SNo.",
      accessor: (row, index) => index + 1, // Generates serial number based on row index.
      id: "serialNumber", // Unique ID for this column.
    },
    {
      // Column to display the user's full name.
      Header: "UserName",
      Cell: ({ row }) => (
        <span>
          {/* Concatenates first name and last name from the row data */}
          {row.original.firstname} {row.original.lastname}
        </span>
      ),
    },
    {
      // Column to update the user’s role.
      Header: "Update Role",
      accessor: "_id", // Accessor to get the user ID.
      Cell: ({ row }) => (
        <select
          // Calls handleRoleChange with user ID and the new role value.
          onChange={(e) => handleRoleChange(row.original._id, e.target.value)}
          defaultValue={row.original.role} // Sets the current role as default.
        >
          {/* Dropdown options for role selection */}
          {["admin", "student", "intern", "user"].map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      ),
    },
    {
      // Column to navigate to a remark page for the user.
      Header: "give Remark",
      Cell: ({ row }) => (
        <Link
          href={`/userupdate/${row.original._id}`} // Dynamic link to user update page.
          className="text-blue-600 underline cursor-pointer"
        >
          give Remark {/* Link text */}
        </Link>
      ),
    },
  ];
};

export { columnsData };
