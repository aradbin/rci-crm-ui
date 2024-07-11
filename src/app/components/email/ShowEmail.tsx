import { getRequest } from "../../helpers/Requests"
import { EMAIL_URL } from "../../helpers/ApiEndpoints"
import { Modal } from "react-bootstrap"
import { useContext, useEffect, useState } from "react"
import { LoadingComponent } from "../common/LoadingComponent"
import { AppContext } from "../../providers/AppProvider"

const ShowEmail = () => {
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState<any>(null)
    const { idForDetails, setIdForDetails } = useContext(AppContext)

    useEffect(() => {
        if(idForDetails && idForDetails !== 0){
            setEmail(null)
            toggleShow(true)
            setLoading(true)
            getRequest(`${EMAIL_URL}/${idForDetails}`).then((response) => {
                setEmail(response)
            }).finally(() => {
                setLoading(false)
            })
        }
    },[idForDetails])

    const toggleShow = (show: boolean) => {
        setShow(show)
    }

    const closeModal = () => {
        toggleShow(false)
        setIdForDetails(0)
    }

    return (
        <Modal className="fade" aria-hidden='true' show={show} centered animation size="xl">
            <div className="modal-content">
                <div className='modal-header'>
                    <h2 className='fw-bolder'>{email?.subject}</h2>
                    <div className='btn btn-icon btn-sm btn-active-icon-primary' onClick={() => closeModal()}>
                        <i className="fa fa-times fs-2"></i>
                    </div>
                </div>
                <div className="modal-body scroll-y mx-2 mx-xl-2 my-2">
                    {email && <div style={email?.body ? { background: "white", color: "black" } : {}} dangerouslySetInnerHTML={{ __html: email?.body ? email?.body : email?.body_plain}} />}
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