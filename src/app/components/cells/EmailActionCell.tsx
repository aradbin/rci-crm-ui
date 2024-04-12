import { useContext } from "react"
import { AppContext } from "../../providers/AppProvider"

const EmailActionCell = ({ item }: any) => {
  const { setIdForDetails } = useContext(AppContext)

  return (
    <div className='d-flex justify-content-end flex-shrink-0'>
      <button className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1" onClick={() => setIdForDetails(item?.id)}>
        <i className="fa-solid fa-envelope fs-3"></i>
      </button>
      {/* <button className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm" onClick={() => setIdForDelete(item?.id)}>
        <KTIcon iconName='trash' className='fs-3' />
      </button> */}
    </div>
  )
}

export {EmailActionCell}
