import { useContext } from "react"
import { KTIcon } from "../../../_metronic/helpers"
import { AppContext } from "../../providers/AppProvider"

const CustomerContactActionCell = ({ item }: any) => {
  const { setIdForCustomerContactUpdate } = useContext(AppContext)

  return (
    <div className='d-flex justify-content-end gap-2'>
      <button className="btn btn-icon btn-bg-light btn-color-primary btn-sm me-1" onClick={() => setIdForCustomerContactUpdate(item?.id)}>
        <KTIcon iconName='pencil' className='fs-3' />
      </button>
    </div>
  )
}

export {CustomerContactActionCell}
