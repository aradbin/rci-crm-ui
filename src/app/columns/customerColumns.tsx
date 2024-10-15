import { Link } from "react-router-dom"
import { KTSVG } from "../../_metronic/helpers"
import { CustomerActionCell } from "../components/cells/CustomerActionCell"
import { formatDate, getCustomerPriorityBadge } from "../helpers/Utils"
import { AvatarComponent } from "../components/common/AvatarComponent"

export const customerColumns = [
  {
    Header: "Name",
    Cell: ({ row }: any) => { return (
      <Link to={`/customers/${row?.original?.id}`} className='d-flex align-items-center text-dark text-hover-primary'>
        <AvatarComponent avatar={row?.original?.avatar} name={row?.original?.name} size="30" classNames="me-5" />
        <div className='d-flex justify-content-start flex-row'>
          <span className='fw-bold fs-7'>{row?.original?.name}</span>
        </div>
        {row?.original?.priority > 1 && <KTSVG path='media/icons/duotune/general/gen049.svg' className={`svg-icon svg-icon-2x ms-2 ${getCustomerPriorityBadge(row?.original?.priority)}`} />}
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
