import { formatDate } from "../helpers/Utils"

export const emailColumns = [
  {
    Header: "From",
    accessor: "from.text",
  },
  {
    Header: "Subject",
    accessor: "subject",
  },
  {
    Header: "Created At",
    Cell: ({row}: any) => formatDate(row?.original?.date)
  },
]
