import { useContext } from "react"
import { AppContext } from "../../providers/AppProvider"

const VoIPActionCell = ({ log }: any) => {
  const { setIdForUpdate } = useContext(AppContext)

  return (
    <div className='d-flex justify-content-end flex-shrink-0'>
      <button className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1" onClick={() => setIdForUpdate(log?.id)}>
        <i className="fa-solid fa-folder-open fs-4"></i>
      </button>
    </div>
  )
}

export {VoIPActionCell}
