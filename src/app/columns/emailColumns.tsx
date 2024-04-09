import { EmailActionCell } from "../components/cells/EmailActionCell"
import { formatDate } from "../helpers/Utils"

export const emailColumns = [
  {
    Header: "From",
    accessor: "email_data.from.text",
  },
  {
    Header: "Subject",
    accessor: "email_data.subject",
  },
  {
    Header: "Created At",
    Cell: ({row}: any) => formatDate(row?.original?.email_data.date)
  },
  {
    Header: "Actions",
    Cell: ({ row }: any) => <EmailActionCell item={row?.original} />
  }
]
