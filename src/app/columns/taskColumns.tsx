import { TaskActionCell } from "../components/cells/TaskActionCell"
import { formatDate, getPriorityBadge } from "../helpers/Utils"

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
    Cell: ({row}: any) => getPriorityBadge(row?.original?.priority)
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
    Cell: ({ row }: any) => <TaskActionCell item={row?.original} />
  }
]
