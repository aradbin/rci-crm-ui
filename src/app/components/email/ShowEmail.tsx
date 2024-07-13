import { createRequest, getRequest } from "../../helpers/Requests"
import { EMAIL_URL } from "../../helpers/ApiEndpoints"
import { Modal } from "react-bootstrap"
import { useContext, useEffect, useState } from "react"
import { LoadingComponent } from "../common/LoadingComponent"
import { AppContext } from "../../providers/AppProvider"
import { formatDateTime, getSettingsFromUserSettings } from "../../helpers/Utils"
import clsx from "clsx"
import { useAuth } from "../../modules/auth"
import { toast } from "react-toastify"

const ShowEmail = () => {
    const { currentUser } = useAuth()
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loadingReply, setLoadingReply] = useState(false)
    const [email, setEmail] = useState<any>(null)
    const [reply, setReply] = useState(false)
    const [text, setText] = useState('')
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

    const sendReply = async () => {
        try {
            setLoadingReply(true)
            const formData = {
                account: getSettingsFromUserSettings(currentUser?.userSettings, 'email').username,
                toEmail: email?.from_attendee?.identifier,
                subject: `Re: ${email?.subject}`,
                text: text,
                reply_to: email?.id
            }
            await createRequest(EMAIL_URL,formData).then((response) => {
                if(response?.status===201 && response?.data?.tracking_id){
                    toast.success('Email Sent Successfully')
                    closeModal()
                }
            })
        } catch (ex) {
            console.error(ex)
        } finally {
            setLoadingReply(false)
        }
    }

    const toggleShow = (show: boolean) => {
        setShow(show)
    }

    const closeModal = () => {
        setReply(false)
        toggleShow(false)
        setIdForDetails(0)
    }

    return (
        <Modal className="fade" aria-hidden='true' show={show} centered animation size="xl">
            <div className="modal-content">
                <div className='modal-header'>
                    <h2 className='fw-bolder'>
                        {email?.subject}
                        {email && <div>
                            <div className="fs-7 pt-2">
                                <span>From: </span>
                                <span>{email?.from_attendee?.display_name} {`<${email?.from_attendee?.identifier}>`}</span>
                            </div>
                            <div className="fs-7 pt-2">
                                <span>To: </span>
                                {email?.to_attendees?.map((item: any, index: number) => (
                                    <span key={index} className={index > 0 ? 'd-block ps-8' : ''}>{`${item?.display_name} ${`<${item?.identifier}>`}`}</span>
                                ))}
                            </div>
                            <div className="fs-7 pt-2">
                                <span>Date: </span>
                                <span>{formatDateTime(email?.date)}</span>
                            </div>
                        </div>}
                    </h2>
                    <div className='btn btn-icon btn-sm btn-active-icon-primary' onClick={() => closeModal()}>
                        <i className="fa fa-times fs-2"></i>
                    </div>
                </div>
                <div className="modal-body scroll-y mx-2 mx-xl-2 my-2">
                    {email && <div style={email?.body ? { background: "white", color: "black" } : {}} dangerouslySetInnerHTML={{ __html: email?.body ? email?.body : email?.body_plain}} />}
                </div>
                {reply && <div className='modal-body mx-2 mx-xl-2 my-2'>
                    <textarea
                        placeholder="Reply"
                        className={clsx('form-control form-control-sm w-100 mb-3 mb-lg-0',
                            // {'is-invalid': touched[field.name] && errors[field.name]},
                            // {'is-valid': touched[field.name] && !errors[field.name]},
                        )}
                        autoComplete='off'
                        rows={10}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <div className="d-flex mt-2 justify-content-end gap-2">
                        <button type="button" className='btn btn-sm btn-primary w-125px' aria-disabled={loadingReply} onClick={sendReply}>
                            {loadingReply ?
                                <span>
                                    Sending {' '}
                                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                                </span>
                            :
                                'Send'
                            }
                        </button>
                        <button type="button" className='btn btn-sm btn-outline btn-light w-125px' aria-disabled={loading} onClick={() => setReply(!reply)}>
                            Cancel
                        </button>
                    </div>
                </div>}
                <div className="modal-footer">
                    <button type="button" className='btn btn-sm btn-outline btn-light w-125px' aria-disabled={loading} onClick={() => setReply(!reply)}>
                        Reply
                    </button>
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