import { useContext } from "react"
import { KTIcon } from "../../../_metronic/helpers"
import { CustomerContext } from "../../providers/CustomerProvider"

const CustomerActionCell = ({ item }: any) => {
  const { setIdForUpdate, setIdForEmail, setIdForDelete } = useContext(CustomerContext)

  return (
    <div className='d-flex justify-content-end flex-shrink-0'>
      <button className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1" onClick={() => setIdForUpdate(item?.id)}>
        <KTIcon iconName='pencil' className='fs-3' />
      </button>
      <button className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1" onClick={() => setIdForEmail(item?.email)}>
        <KTIcon iconName='messages' className='fs-3' />
      </button>
      {/* <button className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm" onClick={() => setIdForDelete(item?.id)}>
        <KTIcon iconName='trash' className='fs-3' />
      </button> */}
    </div>
  )
}

export {CustomerActionCell}
