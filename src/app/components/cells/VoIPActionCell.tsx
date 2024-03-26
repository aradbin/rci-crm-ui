import { useContext } from "react"
import { AppContext } from "../../providers/AppProvider"
import { KTIcon } from "../../../_metronic/helpers"

const VoIPActionCell = ({ log }: any) => {
  const { setIdForDetails, setIdForUpdate } = useContext(AppContext)

  return (
    <div className='d-flex justify-content-end flex-shrink-0'>
      <button className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1" onClick={() => setIdForUpdate(log?.id)}>
        <KTIcon iconName='pencil' className='fs-3' />
      </button>
      <button className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1" onClick={() => setIdForDetails(log?.id)}>
        <i className="fa-solid fa-folder-open fs-4"></i>
      </button>
    </div>
  )
}

export {VoIPActionCell}
