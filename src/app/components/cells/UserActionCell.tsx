import { useContext } from "react"
import { UserContext } from "../../providers/UserProvider"
import { KTIcon } from "../../../_metronic/helpers"

const UserActionCell = ({ user }: any) => {
  const { setIdForUpdate, setIdForEmail, setIdForDelete } = useContext(UserContext)

  return (
    <div className='d-flex justify-content-end flex-shrink-0'>
      <button className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1" onClick={() => setIdForUpdate(user?.id)}>
        <KTIcon iconName='pencil' className='fs-3' />
      </button>
      <button className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1" onClick={() => setIdForEmail(user?.email)}>
        <KTIcon iconName='messages' className='fs-3' />
      </button>
      {/* <button className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm" onClick={() => setIdForDelete(user?.id)}>
        <KTIcon iconName='trash' className='fs-3' />
      </button> */}
    </div>
  )
}

export {UserActionCell}
