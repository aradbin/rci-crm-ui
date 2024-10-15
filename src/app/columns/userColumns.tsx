import { Link } from "react-router-dom"
import { toAbsoluteUrl } from "../../_metronic/helpers"
import { UserActionCell } from "../components/cells/UserActionCell"
import { formatDate, getSettingsFromUserSettings } from "../helpers/Utils"
import { AvatarComponent } from "../components/common/AvatarComponent"

export const userColumns = [
  {
    Header: "Name",
    Cell: ({ row }: any) => { return (
      <Link to={`/users/${row?.original?.id}`} className='d-flex align-items-center text-dark text-hover-primary'>
        <AvatarComponent avatar={row?.original?.avatar} name={row?.original?.name} size="30" classNames="me-5" />
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
    Header: "Department",
    Cell: ({row}: any) => getSettingsFromUserSettings(row?.original?.userSettings, 'department')[0]?.label
  },
  {
    Header: "Designation",
    Cell: ({row}: any) => getSettingsFromUserSettings(row?.original?.userSettings, 'designation')[0]?.label
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
