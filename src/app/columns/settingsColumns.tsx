import { SettingsActionCell } from "../components/cells/SettingsActionCell"
import { formatDate } from "../helpers/Utils"

export const settingsColumns = [
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Created At",
    Cell: ({row}: any) => formatDate(row?.original?.created_at)
  },  
  {
    Header: "Actions",
    Cell: ({ row }: any) => <SettingsActionCell item={row?.original} />
  }
]
