import { useContext } from "react"
import { KTIcon } from "../../../_metronic/helpers"
import { AppContext } from "../../providers/AppProvider"

const CustomerSettingsActionCell = ({ item }: any) => {
  const { setIdForCustomerServiceUpdate } = useContext(AppContext)

  return (
    <div className='d-flex justify-content-end flex-shrink-0'>
      {item?.customerSettingsSingle && <button className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1" onClick={() => setIdForCustomerServiceUpdate(item?.customerSettingsSingle?.id)}>
        <KTIcon iconName='pencil' className='fs-3' />
      </button>}
      {/* <button className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm" onClick={() => setIdForDelete(item?.id)}>
        <KTIcon iconName='trash' className='fs-3' />
      </button> */}
    </div>
  )
}

export {CustomerSettingsActionCell}
