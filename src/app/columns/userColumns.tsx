import { UserActionCell } from "../components/cells/UserActionCell"
import { formatDate } from "../helpers/Utils"

export const userColumns = [
  {
    Header: "Employee ID",
    accessor: "employee_id"
  },
  {
    Header: "Name",
    accessor: "name"
  },
  {
    Header: "Team Lead",
    Cell: ({ row }: any) => row?.original?.team_user[0]?.team?.team_users[0]?.user?.name
  },
  {
    Header: "Designation",
    accessor: "designation.name",
  },
  {
    Header: "City",
    accessor: "city.name"
  },
  {
    Header: "Team Type",
    accessor: "team_type.name"
  },
  {
    Header: "Created On",
    Cell: ({row}: any) => formatDate(row?.original?.created_at)
  },  
  {
    Header: "Actions",
    Cell: ({ row }: any) => <UserActionCell user={row?.original} />
  }
]
