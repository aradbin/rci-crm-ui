import { Link } from "react-router-dom"
import { toAbsoluteUrl } from "../../_metronic/helpers"
// import { CustomerActionCell } from "../components/cells/CustomerActionCell"
import { formatDate } from "../helpers/Utils"

export const voipColumns = [
  {
    Header: "Number",
    accessor: "remote_number",
  },
  {
    Header: "Direction",
    accessor: "log.direction",
  },
  {
    Header: "Duration",
    Cell: ({row}: any) => `${row?.original?.log?.duration}s`
  },
  {
    Header: "VoIP Number",
    accessor: "local_number"
  },
  {
    Header: "Called At",
    accessor: "log.start",
  }
]
