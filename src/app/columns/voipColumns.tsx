import { Link } from "react-router-dom"
import { VoIPActionCell } from "../components/cells/VoIPActionCell"
import { AvatarComponent } from "../components/common/AvatarComponent"

export const voipColumns = [
  {
    Header: "Customer",
    Cell: ({row}: any) => { return (row?.original?.customer && 
      <Link to={`/customers/${row?.original?.customer?.id}`} className='d-flex align-items-center text-dark text-hover-primary'>
        <AvatarComponent avatar={row?.original?.customer?.avatar} name={row?.original?.customer?.name} size="30" classNames="me-5" />
        <div className='d-flex justify-content-start flex-column'>
          <span className='fw-bold fs-7'>{row?.original?.customer?.name}</span>
        </div>
      </Link>
    )}
  },
  {
    Header: "Number",
    Cell: ({row}: any) => { return (
      <a href={`tel:${row?.original?.remote_number}`} className='d-flex align-items-center text-dark text-hover-primary'>
        <span className='fw-bold fs-7'>{row?.original?.remote_number}</span>
      </a>
    )}
  },
  {
    Header: "Called At",
    accessor: "log.start",
  },
  {
    Header: "Direction",
    Cell: ({row}: any) => { return (row?.original?.log?.direction === 'Outgoing' ?
      <span><i className="bi bi-telephone-outbound-fill pe-2"></i>{row?.original?.log?.direction}</span>
    :
      <span><i className="bi bi-telephone-inbound-fill pe-2"></i>{row?.original?.log?.direction}</span>
    )}
  },
  {
    Header: "Duration",
    Cell: ({row}: any) => { return (row?.original?.state === 'Missed' ?
      <span className="badge badge-sm badge-danger">Missed</span>
    :
      <span className="text-success">{row?.original?.log?.duration}s</span>
    )}
  },
  {
    Header: "Actions",
    Cell: ({ row }: any) => <VoIPActionCell log={row?.original} />
  }
]
