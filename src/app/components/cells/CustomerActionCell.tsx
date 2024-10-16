import { useContext } from "react"
import { KTIcon } from "../../../_metronic/helpers"
import { AppContext } from "../../providers/AppProvider"

const CustomerActionCell = ({ item }: any) => {
  const { setIdForUpdate, setIdForStatus } = useContext(AppContext)

  return (
    <div className='d-flex justify-content-end gap-2'>
      <button className="btn btn-icon btn-bg-light btn-color-primary btn-sm" onClick={() => setIdForUpdate(item?.id)}>
        <KTIcon iconName='pencil' className='fs-3' />
      </button>
      <button className={`btn btn-icon btn-bg-light btn-color-${item?.is_active ? 'danger' : 'success'} btn-sm`} onClick={() => setIdForStatus(item?.id)}>
        <KTIcon iconName={item?.is_active ? 'shield-cross' : 'shield-tick'} className='fs-1' />
      </button>
    </div>
  )
}

export {CustomerActionCell}
