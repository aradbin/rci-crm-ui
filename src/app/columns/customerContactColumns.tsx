import { Link } from "react-router-dom"
import { KTSVG, toAbsoluteUrl } from "../../_metronic/helpers"
import { CustomerContactActionCell } from "../components/cells/CustomerContactActionCell"
import { AvatarComponent } from "../components/common/AvatarComponent"

export const customerContactColumns = [
  {
    Header: "Customer",
    accessor: "customer.name",
    Cell: ({row}: any) => <Link to={`/customers/${row?.original?.customer?.id}`} className='d-flex align-items-center text-dark text-hover-primary'>
        <AvatarComponent avatar={row?.original?.customer?.avatar} name={row?.original?.customer?.name} size="30" classNames="me-5" />
        <div className='d-flex justify-content-start flex-row'>
          <span className='fw-bold fs-7'>{row?.original?.customer?.name}</span>
        </div>
        {row?.original?.customer?.is_featured && <KTSVG path='media/icons/duotune/general/gen049.svg' className='svg-icon svg-icon-2x ms-2 text-warning' />}
      </Link>
  },
  {
    Header: "Contact",
    accessor: "contact.name",
    Cell: ({row}: any) => <Link to={`/contacts/${row?.original?.contact?.id}`} className='d-flex align-items-center text-dark text-hover-primary'>
        <AvatarComponent avatar={row?.original?.contact?.avatar} name={row?.original?.contact?.name} size="30" classNames="me-5" />
        <div className='d-flex justify-content-start flex-row'>
          <span className='fw-bold fs-7'>{row?.original?.contact?.name}</span>
        </div>
      </Link>
  },
  {
    Header: "Designation",
    accessor: "metadata.designation",
  },
  {
    Header: "Contact",
    accessor: "metadata.contact",
  },
  {
    Header: "Email",
    accessor: "metadata.email",
  },
  {
    Header: "Actions",
    Cell: ({ row }: any) => <CustomerContactActionCell item={row?.original} />
  }
]
