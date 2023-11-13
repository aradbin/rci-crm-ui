import { Link } from "react-router-dom"
import { TaskActionCell } from "../components/cells/TaskActionCell"
import { formatDate, getTaskPriorityBadge, getTaskStatusBadge } from "../helpers/Utils"

export const taskColumns = [
  {
    Header: "#",
    accessor: "id",
  },
  {
    Header: "Title",
    Cell: ({ row }: any) => { return (
      <Link to={`/tasks/${row?.original?.id}`} className='text-dark text-hover-primary'>
        {row?.original?.title}
      </Link>
    )}
  },
  {
    Header: "Customer",
    Cell: ({ row }: any) => {
      if(row?.original?.customer_id){
        return (
          <Link to={`/customers/${row?.original?.customer_id}`} className='text-dark text-hover-primary'>
            {row?.original?.customer?.name}
          </Link>
        )
      }
      return ""
    }
  },
  {
    Header: "Assignee",
    accessor: "assignee.name",
    Cell: ({ row }: any) => {
      if(row?.original?.assignee_id){
        return (
          <Link to={`/users/${row?.original?.assignee_id}`} className='text-dark text-hover-primary'>
            {row?.original?.assignee?.name}
          </Link>
        )
      }
      return ""
    }
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
