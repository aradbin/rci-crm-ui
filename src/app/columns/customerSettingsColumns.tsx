import { CustomerSettingsActionCell } from "../components/cells/CustomerSettingsActionCell"
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
    Header: "Start Date",
    Cell: ({row}: any) => formatDate(row?.original?.metadata?.start_date)
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
    Cell: ({ row }: any) => <CustomerSettingsActionCell item={row?.original} />
  }
]
