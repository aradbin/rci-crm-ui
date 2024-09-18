import { useContext } from "react"
import { AppContext } from "../../providers/AppProvider"
import { KTIcon } from "../../../_metronic/helpers"

const UserActionCell = ({ user }: any) => {
  const { setIdForUpdate, setIdForEmail, setIdForDelete } = useContext(AppContext)

  return (
    <div className='d-flex justify-content-end gap-2'>
      <button className="btn btn-icon btn-bg-light btn-color-primary btn-sm me-1" onClick={() => setIdForUpdate(user?.id)}>
        <KTIcon iconName='pencil' className='fs-3' />
      </button>
    </div>
  )
}

export {UserActionCell}
