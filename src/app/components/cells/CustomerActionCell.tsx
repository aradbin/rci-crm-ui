import { useContext } from "react"
import { KTIcon } from "../../../_metronic/helpers"
import { AppContext } from "../../providers/AppProvider"

const CustomerActionCell = ({ item }: any) => {
  const { setIdForUpdate, setIdForStatus } = useContext(AppContext)

  return (
    <div className='d-flex justify-content-end align-items-center'>
      <div className='form-check form-check-solid form-switch p-0 pt-1'>
        <input type="checkbox" className="form-check-input w-35px h-20px mb-3 mb-lg-0" defaultChecked={item?.status} onChange={() => setIdForStatus(item?.id)} />
        <label className='form-check-label'></label>
      </div>
      <button className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1" onClick={() => setIdForUpdate(item?.id)}>
        <KTIcon iconName='pencil' className='fs-3' />
      </button>
    </div>
  )
}

export {CustomerActionCell}
