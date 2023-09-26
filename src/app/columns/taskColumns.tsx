import { CustomerActionCell } from "../components/cells/CustomerActionCell"
import { formatDate } from "../helpers/Utils"

export const taskColumns = [
  {
    Header: "Title",
    accessor: "title",
  },
  {
    Header: "Customer",
    accessor: "customer.name",
  },
  {
    Header: "Assignee",
    accessor: "assignee.name",
  },
  {
    Header: "Priority",
    accessor: "priority",
  },
  {
    Header: "Due Date",
    Cell: ({row}: any) => formatDate(row?.original?.due_date)
  },
  {
    Header: "Created On",
    Cell: ({row}: any) => formatDate(row?.original?.created_at)
  },  
  {
    Header: "Actions",
    Cell: ({ row }: any) => <CustomerActionCell item={row?.original} />
  }
]