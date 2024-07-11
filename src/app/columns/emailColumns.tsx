import { EmailActionCell } from "../components/cells/EmailActionCell"
import { formatDate } from "../helpers/Utils"

export const emailColumns = [
  {
    Header: "From",
    Cell: ({ row }: any) => `${row?.original?.from_attendee?.display_name} (${row?.original?.from_attendee?.identifier})`
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
