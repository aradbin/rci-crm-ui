import { TaskActionCell } from "../components/cells/TaskActionCell"
import { formatDate, getTaskPriorityBadge, getTaskStatusBadge } from "../helpers/Utils"

export const taskColumns = [
  {
    Header: "#",
    accessor: "id",
  },
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
    Cell: ({row}: any) => getTaskPriorityBadge(row?.original?.priority)
  },
  {
    Header: "Status",
    Cell: ({row}: any) => getTaskStatusBadge(row?.original?.status)
  },
  {
    Header: "Due Date",
    Cell: ({row}: any) => formatDate(row?.original?.due_date)
  },
  {
    Header: "Created At",
    Cell: ({row}: any) => formatDate(row?.original?.created_at)
  },
  {
    Header: "Actions",
    Cell: ({ row }: any) => <TaskActionCell item={row?.original} />
  }
]
