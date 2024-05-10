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
    Header: "End Date",
    Cell: ({row}: any) => formatDate(row?.original?.metadata?.end_date)
  },
  {
    Header: "Due Date",
    Cell: ({row}: any) => formatDate(row?.original?.metadata?.due_date)
  },
  {
    Header: "Estimated Hour",
    Cell: ({row}: any) => <>{row?.original?.metadata?.estimation} Hour</>
  },
  {
    Header: "Fee",
    accessor: "metadata.fee",
  },
  {
    Header: "Auto Task Renew",
    Cell: ({row}: any) => <>{row?.original?.metadata?.auto_task ? 'Yes' : 'No'}</>
  },
  {
    Header: "Actions",
    Cell: ({ row }: any) => <CustomerSettingsActionCell item={row?.original} />
  }
]
