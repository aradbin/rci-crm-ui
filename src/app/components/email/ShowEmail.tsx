import { getRequest } from "../../helpers/Requests"
import { EMAIL_URL } from "../../helpers/ApiEndpoints"
import { Modal } from "react-bootstrap"
import { useContext, useEffect, useState } from "react"
import { LoadingComponent } from "../common/LoadingComponent"
import { AppContext } from "../../providers/AppProvider"

const ShowEmail = ({show, toggleShow}: any) => {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState<any>(null)
    const { idForUpdate, setIdForUpdate } = useContext(AppContext)

    useEffect(() => {
        if(idForUpdate > 0){
            toggleShow(true)
            setLoading(true)
            getRequest(`${EMAIL_URL}/${idForUpdate}`).then((response) => {
                setEmail(response)
            }).finally(() => {
                setLoading(false)
            })
        }
    },[idForUpdate])

    const closeModal = () => {
        toggleShow(false)
        setIdForUpdate(0)
    }

    return (
        <Modal className="fade" aria-hidden='true' show={show} centered animation size="xl">
            <div className="modal-content">
                <div className='modal-header'>
                    <h2 className='fw-bolder'>{email?.email_data?.subject}</h2>
                    <div className='btn btn-icon btn-sm btn-active-icon-primary' onClick={() => closeModal()}>
                        <i className="fa fa-times fs-2"></i>
                    </div>
                </div>
                <div className="modal-body scroll-y mx-2 mx-xl-2 my-2">
                    {email && <div style={email?.email_data?.html ? { background: "white", color: "black" } : {}} dangerouslySetInnerHTML={{ __html: email?.email_data?.html ? email?.email_data?.html : email?.email_data?.textAsHtml}} />}
                </div>
                <div className="modal-footer">
                    <button type="button" className='btn btn-sm btn-outline btn-light w-125px' aria-disabled={loading} onClick={closeModal}>
                        Close
                    </button>
                </div>
            </div>
            {loading && <LoadingComponent />}
        </Modal>
    )
}

export {ShowEmail}