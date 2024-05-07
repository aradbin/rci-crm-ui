import { Link } from "react-router-dom"
import { toAbsoluteUrl } from "../../_metronic/helpers"
import { ContactActionCell } from "../components/cells/ContactActionCell"
import { formatDate } from "../helpers/Utils"

export const contactColumns = [
  {
    Header: "Name",
    Cell: ({ row }: any) => { return (
      <Link to={`/contacts/${row?.original?.id}`} className='d-flex align-items-center text-dark text-hover-primary'>
        <div className='symbol symbol-30px me-5'>
          <img src={row?.original?.avatar || toAbsoluteUrl('/media/avatars/blank.png')} alt='Avatar' />
        </div>
        <div className='d-flex justify-content-start flex-column'>
          <span className='fw-bold fs-7'>{row?.original?.name}</span>
        </div>
      </Link>
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
    Cell: ({ row }: any) => <ContactActionCell item={row?.original} />
  }
]
