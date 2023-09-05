import { useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../../providers/UserProvider"

const UserActionCell = ({ user }: any) => {
  const { setIdForUpdate, setIdForDelete } = useContext(UserContext)

  return (
    <>
      <button className="btn p-0 me-2" onClick={() => setIdForUpdate(user?.id)}><i className="bi bi-arrow-counterclockwise fs-3 text-warning"></i></button>
      <button className="btn p-0 me-2" onClick={() => setIdForDelete(user?.id)}><i className="bi bi-slash-circle fs-6 text-danger"></i></button>
    </>
  )
}

export {UserActionCell}
