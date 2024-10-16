import Link from "next/link"

const columnsData = (handleRoleChange) =>{return [
  {
    Header: "SNo.",
    accessor: (row, index) => index + 1,
    id: "serialNumber"
  },
  {
    Header: "UserName",
    Cell:({row})=>(
        <span>
            {row.original.firstname} {row.original.lastname}
        </span>
    )
  },
  {
    Header: 'Update Role',
    accessor: '_id',
    Cell: ({row }) => (
      <select
        onChange={(e) => handleRoleChange(row.original._id, e.target.value)}
        defaultValue={row.original.role}
      >
        {['admin', 'student', 'intern', 'user'].map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>
    ),
  },
  {
    Header: 'give Remark',
    Cell: ({row }) => (
        <Link href={`/userupdate/${row.original._id}`} className='text-blue-600 underline cursor-pointer'>give Remark</Link>
      ),

  }
]
}
export {columnsData}