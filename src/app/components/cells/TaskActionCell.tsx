import { useContext } from "react"
import { AppContext } from "../../providers/AppProvider"
import { Link } from "react-router-dom"

const TaskActionCell = ({ item }: any) => {
  const { setIdForTaskUpdate, setIdForTaskDelete } = useContext(AppContext)

  return (
    <div className='d-flex justify-content-end flex-shrink-0'>
      <button className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1" onClick={() => setIdForTaskUpdate(item?.id)}>
        <i className="fa-solid fa-pencil fs-4"></i>
      </button>
      <Link to={`/tasks/${item?.id}`} className="btn btn-icon btn-bg-light btn-active-color-info btn-sm me-1">
        <i className="fa-solid fa-folder-open fs-4"></i>
      </Link>
      {/* <button className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm" onClick={() => setIdForTaskDelete(item?.id)}>
        <KTIcon iconName='trash' className='fs-3' />
      </button> */}
    </div>
  )
}

export {TaskActionCell}
