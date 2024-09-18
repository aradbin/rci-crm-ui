import { useContext } from "react"
import { AppContext } from "../../providers/AppProvider"

const EmailActionCell = ({ item }: any) => {
  const { setIdForDetails } = useContext(AppContext)

  return (
    <div className='d-flex justify-content-end gap-2'>
      <button className="btn btn-icon btn-bg-light btn-color-primary btn-sm me-1" onClick={() => setIdForDetails(item?.id)}>
        <i className="fa-solid fa-envelope fs-3"></i>
      </button>
    </div>
  )
}

export {EmailActionCell}
