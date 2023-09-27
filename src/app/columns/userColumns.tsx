import { toAbsoluteUrl } from "../../_metronic/helpers"
import { UserActionCell } from "../components/cells/UserActionCell"
import { formatDate } from "../helpers/Utils"

export const userColumns = [
  {
    Header: "Name",
    Cell: ({ row }: any) => { return (
      <div className='d-flex align-items-center'>
        <div className='symbol symbol-30px me-5'>
          <img src={row?.original?.avatar || toAbsoluteUrl('/media/avatars/blank.png')} alt='Avatar' />
        </div>
        <div className='d-flex justify-content-start flex-column'>
          <a href='#' className='text-dark fw-bold text-hover-primary fs-7'>{row?.original?.name}</a>
        </div>
      </div>
    )}
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Contact",
    accessor: "contact"
  },
  {
    Header: "Created At",
    Cell: ({row}: any) => formatDate(row?.original?.created_at)
  },  
  {
    Header: "Actions",
    Cell: ({ row }: any) => <UserActionCell user={row?.original} />
  }
]
