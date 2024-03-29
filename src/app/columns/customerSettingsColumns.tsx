import { SettingsActionCell } from "../components/cells/SettingsActionCell"
import { firstLetterUpperCase, formatDate } from "../helpers/Utils"

export const customerSettingsColumns = [
  {
    Header: "Name",
    accessor: "settings.name",
  },
  {
    Header: "Cycle",
    Cell: ({row}: any) => firstLetterUpperCase(row?.original?.settings?.metadata?.cycle)
  },
  {
    Header: "From",
    Cell: ({row}: any) => formatDate(row?.original?.metadata?.from)
  },
  {
    Header: "Due Date",
    Cell: ({row}: any) => formatDate(row?.original?.metadata?.due_date)
  },
  {
    Header: "Fee",
    accessor: "settings.metadata.fee",
  },
  {
    Header: "Actions",
    Cell: ({ row }: any) => <SettingsActionCell item={row?.original} />
  }
]
