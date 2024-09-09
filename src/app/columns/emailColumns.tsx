import { EmailActionCell } from "../components/cells/EmailActionCell"
import { formatDate } from "../helpers/Utils"

export const emailColumns = [
  {
    Header: "Email",
    Cell: ({ row }: any) => (
      <>
        {row?.original?.folders?.find((item: string) => item === 'UNREAD') ?
          <span className="fw-bolder">
            {`${row?.original?.role !== 'sent' ? row?.original?.from_attendee?.display_name : row?.original?.to_attendees[0]?.display_name} (${row?.original?.role !== 'sent' ? row?.original?.from_attendee?.identifier : row?.original?.to_attendees[0]?.identifier})`}
            <span className="badge badge-light-success ms-3">New</span>
          </span>
        :
          <span>
            {`${row?.original?.role !== 'sent' ? row?.original?.from_attendee?.display_name : row?.original?.to_attendees[0]?.display_name} (${row?.original?.role !== 'sent' ? row?.original?.from_attendee?.identifier : row?.original?.to_attendees[0]?.identifier})`}
          </span>
        }
      </>
    )
  },
  {
    Header: "Subject",
    accessor: "subject",
  },
  {
    Header: "Created At",
    Cell: ({row}: any) => formatDate(row?.original?.date)
  },
  {
    Header: "Actions",
    Cell: ({ row }: any) => <EmailActionCell item={row?.original} />
  }
]
