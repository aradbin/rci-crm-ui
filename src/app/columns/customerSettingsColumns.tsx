import { CustomerSettingsActionCell } from "../components/cells/CustomerSettingsActionCell"
import { CustomerSettingsActiveActionCell } from "../components/cells/CustomerSettingsActiveActionCell"
import { firstLetterUpperCase, formatDate } from "../helpers/Utils"

export const customerSettingsColumns = [
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Cycle",
    accessor: "metadata.cycle",
  },
  {
    Header: "Start Date",
    Cell: ({row}: any) => row?.original?.customerSettingsSingle?.metadata?.start_date ? formatDate(row?.original?.customerSettingsSingle?.metadata?.start_date) : ''
  },
  {
    Header: "End Date",
    Cell: ({row}: any) => row?.original?.customerSettingsSingle?.metadata?.end_date ? formatDate(row?.original?.customerSettingsSingle?.metadata?.end_date) : ''
  },
  {
    Header: "Due Date",
    Cell: ({row}: any) => row?.original?.customerSettingsSingle?.metadata?.due_date ? formatDate(row?.original?.customerSettingsSingle?.metadata?.due_date) : ''
  },
  {
    Header: "Estimated Hour",
    Cell: ({row}: any) => <>{row?.original?.customerSettingsSingle?.metadata?.estimation ? `${row?.original?.customerSettingsSingle?.metadata?.estimation} Hour` : ''}</>
  },
  {
    Header: "Fee",
    accessor: "customerSettingsSingle.metadata.fee",
  },
  {
    Header: "Auto Task Renew",
    Cell: ({row}: any) => <>{row?.original?.customerSettingsSingle ? `${row?.original?.customerSettingsSingle?.metadata?.auto_task ? 'Yes' : 'No'}` : ''}</>
  },
  {
    Header: "Active",
    Cell: ({row}: any) =>  <CustomerSettingsActiveActionCell item={row?.original} />
  }
]
