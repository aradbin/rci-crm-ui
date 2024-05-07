import { Link } from "react-router-dom"
import { KTIcon, toAbsoluteUrl } from "../../_metronic/helpers"
import { CustomerActionCell } from "../components/cells/CustomerActionCell"
import { formatDate } from "../helpers/Utils"

export const customerColumns = [
  {
    Header: "Name",
    Cell: ({ row }: any) => { return (
      <Link to={`/customers/${row?.original?.id}`} className='d-flex align-items-center text-dark text-hover-primary'>
        <div className='symbol symbol-30px me-5'>
          <img src={row?.original?.avatar || toAbsoluteUrl('/media/avatars/blank.png')} alt='Avatar' />
        </div>
        <div className='d-flex justify-content-start flex-column'>
          <span className='fw-bold fs-7'>{row?.original?.name}</span>
          {row?.original?.is_featured && <KTIcon iconName='star' className='fs-3' />}
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
    Cell: ({ row }: any) => <CustomerActionCell item={row?.original} />
  }
]
