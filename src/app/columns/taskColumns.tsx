import { Link } from "react-router-dom"
import { TaskActionCell } from "../components/cells/TaskActionCell"
import { formatDate, getTaskPriorityBadge, getTaskStatusBadge } from "../helpers/Utils"
import { toAbsoluteUrl } from "../../_metronic/helpers"
import { AvatarComponent } from "../components/common/AvatarComponent"

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
    Header: "Assignee",
    accessor: "assignee.name",
    Cell: ({ row }: any) => {
      if(row?.original?.taskUsers?.filter((item: any) => item?.type === 'assignee')?.length > 0){
        return (
          <div className="symbol-group symbol-hover">
            {row?.original?.taskUsers?.filter((item: any) => item?.type === 'assignee')?.map((item: any) => (
              <Link to={`/users/${item?.user_id}`} key={item?.id}>
                <AvatarComponent avatar={item?.user?.avatar} name={item?.user?.name} style="circle" size="30" fontSize="5" />
              </Link>
            ))}
          </div>
        )
      }

      return ""
    }
  },
  {
    Header: "Reporter",
    Cell: ({ row }: any) => {
      if(row?.original?.taskUsers?.filter((item: any) => item?.type === 'reporter')?.length > 0){
        return (
          <div className="symbol-group symbol-hover">
            {row?.original?.taskUsers?.filter((item: any) => item?.type === 'reporter')?.map((item: any) => (
              <Link to={`/users/${item?.user_id}`} key={item?.id}>
                <AvatarComponent avatar={item?.user?.avatar} name={item?.user?.name} style="circle" size="30" fontSize="5" />
              </Link>
            ))}
          </div>
        )
      }

      return ""
    }
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
    Header: "Completed At",
    Cell: ({row}: any) => formatDate(row?.original?.completed_at)
  },
  {
    Header: "Actions",
    Cell: ({ row }: any) => <TaskActionCell item={row?.original} />
  }
]
