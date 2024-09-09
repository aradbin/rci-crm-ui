import { createRequestUnipile, updateRequestUnipile } from "../../helpers/Requests"
import { EMAIL_UNIPILE_URL } from "../../helpers/ApiEndpoints"
import { Modal } from "react-bootstrap"
import { useContext, useEffect, useState } from "react"
import { LoadingComponent } from "../common/LoadingComponent"
import { AppContext } from "../../providers/AppProvider"
import { formatDateTime, getSettingsFromUserSettings } from "../../helpers/Utils"
import clsx from "clsx"
import { useAuth } from "../../modules/auth"
import { toast } from "react-toastify"
import EmailAttachment from "./EmailAttachment"
import { QueryUnipile } from "../../helpers/Queries"
import { useQueryClient } from "react-query"

const ShowEmail = () => {
    const { currentUser } = useAuth()
    const [show, setShow] = useState(false)
    const [loadingReply, setLoadingReply] = useState(false)
    const [reply, setReply] = useState(false)
    const [text, setText] = useState('')
    const [files, setFiles] = useState<any>(null)
    const { idForDetails, setIdForDetails } = useContext(AppContext)

    const { data: email, isFetching } = QueryUnipile(`email-${idForDetails}`, `${EMAIL_UNIPILE_URL}/${idForDetails}`, '', false, idForDetails === 0 ? false : true)

    const queryClient = useQueryClient()

    useEffect(() => {
        if(idForDetails && idForDetails !== 0){
            toggleShow(true)
        }
    },[idForDetails])

    useEffect(() => {
        if(email?.id && email?.folders?.find((item: string) => item === 'UNREAD')){
          const payload = {
            unread: false
          }
          updateRequestUnipile(`${EMAIL_UNIPILE_URL}/${email?.id}?account_id=${email?.account_id}`, JSON.stringify(payload), true).then((response) => {
            queryClient.invalidateQueries({ queryKey: [`all-email-${email?.account_id}`] })
          }).catch((error) => {
            console.log(error)
          })
        }
      }, [email])

    const sendReply = async () => {
        setLoadingReply(true)
        try {
            const account = getSettingsFromUserSettings(currentUser?.userSettings, 'email')?.unipile_account_id
            if(!account){
                throw new Error('No assigned email address')
            }

            const formData = new FormData()
            formData.append('account_id', account)
            formData.append('subject', `Re: ${email?.subject}`)
            formData.append('body', text)
            formData.append('to', JSON.stringify([
                {
                    identifier: email?.from_attendee?.identifier,
                },
            ]))
            formData.append('reply_to', email?.id)
            if(files && Object.keys(files).length > 0){
                Object.keys(files)?.forEach((key: any) => {
                    formData.append('attachments', files[key])
                })
            }
            await createRequestUnipile(EMAIL_UNIPILE_URL, formData).then((response) => {
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
                        {email?.id === idForDetails && email?.subject}
                        {email && email?.id === idForDetails && <div>
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
                    {email && email?.id === idForDetails && <div style={email?.body ? { background: "white", color: "black" } : {}} dangerouslySetInnerHTML={{ __html: email?.body ? email?.body : email?.body_plain}} />}
                    <div className="d-flex gap-3 mt-5">
                        {email?.attachments?.map((item: any, index: number) => 
                            <EmailAttachment key={index} email={email?.id} attachment={item} />
                        )}
                    </div>
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
                    <input type="file" className='form-control form-control-sm w-100 mt-5 mb-5 mb-lg-0' onChange={(e) => setFiles(e.target.files)} />
                    <div className="d-flex mt-3 justify-content-end gap-2">
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
                        <button type="button" className='btn btn-sm btn-outline btn-light w-125px' aria-disabled={isFetching} onClick={() => setReply(!reply)}>
                            Cancel
                        </button>
                    </div>
                </div>}
                <div className="modal-footer">
                    <button type="button" className='btn btn-sm btn-outline btn-light w-125px' aria-disabled={isFetching} onClick={() => setReply(!reply)}>
                        Reply
                    </button>
                    <button type="button" className='btn btn-sm btn-outline btn-light w-125px' aria-disabled={isFetching} onClick={closeModal}>
                        Close
                    </button>
                </div>
            </div>
            {isFetching && <LoadingComponent />}
        </Modal>
    )
}

export {ShowEmail}