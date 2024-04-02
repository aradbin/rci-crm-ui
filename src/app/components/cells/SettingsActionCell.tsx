import { useContext } from "react"
import { KTIcon } from "../../../_metronic/helpers"
import { AppContext } from "../../providers/AppProvider"

const SettingsActionCell = ({ item }: any) => {
  const { setIdForUpdate } = useContext(AppContext)

  return (
    <div className='d-flex justify-content-end flex-shrink-0'>
      <button className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1" onClick={() => setIdForUpdate(item?.id)}>
        <KTIcon iconName='pencil' className='fs-3' />
      </button>
      {/* <button className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm" onClick={() => setIdForDelete(item?.id)}>
        <KTIcon iconName='trash' className='fs-3' />
      </button> */}
    </div>
  )
}

export {SettingsActionCell}
