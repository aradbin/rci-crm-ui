import { Field, FormikProvider, useFormik } from "formik"
import * as Yup from 'yup'
import { getRequest, updateRequest } from "../../helpers/Requests"
import { VOIP_URL } from "../../helpers/ApiEndpoints"
import { toast } from "react-toastify"
import { useContext, useEffect, useState } from "react"
import { TextAreaField } from "../fields/TextAreaField"
import { SocketContext } from "../../providers/SocketProvider"
import { useAuth } from "../../modules/auth"
import { Link, useNavigate } from "react-router-dom"
import { Modal } from "react-bootstrap"
import { AppContext } from "../../providers/AppProvider"
import { LoadingComponent } from "../common/LoadingComponent"

const VoIPCreateForm = ({updateList}: any) => {
    const { currentUser } = useAuth()
    const navigate = useNavigate()
    const [show, setShow] = useState(false)
    const [received, setReceived] = useState(false)
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [log, setLog] = useState<any>(null)
    const { voip, setVoip } = useContext(SocketContext)
    const { idForUpdate, setIdForUpdate } = useContext(AppContext)

    const formik = useFormik({
        initialValues: {
            note: "",
        },
        validationSchema: Yup.object().shape({
            note: Yup.string().required('Note is required'),
        }),
        onSubmit: async (values, {setSubmitting}) => {
            setSubmitting(true)
            try {
                await updateRequest(`${VOIP_URL}/${voip.id}`, values).then((response) => {
                    if(response?.status===200){
                        toast.success('Note Saved Successfully')
                        closeVoIP()
                    }
                })
            } catch (ex) {
                console.error(ex)
            } finally {
                setSubmitting(false)
            }
        },
    })

    const toggleShow = (val: boolean) => {
        setShow(val)
    }

    const toggleShowModal = (val: boolean) => {
        setShowModal(val)
    }

    useEffect(() => {
        if(voip){
            toggleShow(true)
        }
    },[voip])

    useEffect(() => {
        if(idForUpdate > 0){
            toggleShowModal(true)
            setLoading(true)
            getRequest(`${VOIP_URL}/details/${idForUpdate}`).then((response) => {
                setLog(response)
            }).finally(() => {
                setLoading(false)
            })
        }
    },[idForUpdate])

    const receiveCall = async (val: boolean) => {
        if(val){
            setReceived(true)
            await updateRequest(`${VOIP_URL}/${voip.id}`, { received_by: currentUser?.id })
            if(voip?.customer?.id){
                navigate(`/customers/${voip?.customer?.id}`)
            }
        }
    }

    const closeVoIP = () => {
        formik.resetForm()
        setVoip(null)
        setReceived(false)
        toggleShow(false)
    }

    const closeModal = () => {
        toggleShowModal(false)
        setIdForUpdate(0)
    }

    return (<>
        {show && <div className={`card bg-light-${received ? 'success' : 'warning'} card-xl-stretch`} style={{
            position: "fixed",
            bottom: "10px",
            right: "65px"
        }}>
            <div className='card-body'>
                <h2 className={`card-title fw-bold text-${received ? 'success' : 'warning'} fs-5 mb-3 d-block`}>VoIP Call Connected with <Link to={`/customers/${voip?.customer?.id}`} target="_blank"><b>{voip?.customer?.name || voip?.remote_number}</b></Link></h2>
                {received ? <FormikProvider value={formik}>
                    <form className="form" onSubmit={formik.handleSubmit} noValidate>
                        <div className='d-flex flex-column'>
                            <Field
                                label="Note"
                                name="note"
                                type="text"
                                required="required"
                                component={TextAreaField}
                                size="sm"
                            />
                        </div>
                        <div className="d-flex flex-end">
                            <button type="submit" className="btn btn-sm btn-primary w-125px me-3" disabled={formik.isSubmitting}>
                                {formik.isSubmitting ? (
                                    <span>
                                        Please wait {' '}
                                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                                    </span>
                                ) : (
                                    <span>Submit</span>
                                )}
                            </button>
                            <button type="button" className='btn btn-sm btn-outline btn-light w-125px' aria-disabled={formik.isSubmitting} onClick={closeVoIP}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </FormikProvider>
                :
                <>
                    <div className="fw-bold mb-3">
                        Are you on a call with <Link to={`/customers/${voip?.customer?.id}`} target="_blank"><b>{voip?.customer?.name} ({voip?.remote_number})</b></Link>
                    </div>
                    <div className="d-flex flex-end">
                        <button type="submit" className="btn btn-icon btn-sm btn-success me-3" onClick={() => receiveCall(true)}><i className="fa-solid fa-phone"></i></button>
                        <button type="button" className='btn btn-icon btn-sm btn-danger' onClick={closeVoIP}><i className="fa-solid fa-xmark"></i></button>
                    </div>
                </>
                }
            </div>
        </div>}

        <Modal className="fade" aria-hidden='true' show={showModal} centered animation>
            <div className="modal-content">
                <div className='modal-header'>
                    <h2 className='fw-bolder mb-0'>VoIP Call Log Details</h2>
                    <div className='btn btn-icon btn-sm btn-active-icon-primary' onClick={() => closeModal()}>
                        <i className="fa fa-times fs-2"></i>
                    </div>
                </div>
                <div className="modal-body scroll-y mx-2 mx-xl-2 my-2">
                    <div className='d-flex flex-column'>
                        <div className='row mb-7'>
                            <label className='col-lg-4 fw-bold text-muted'>Customer</label>
                            <div className='col-lg-8'>
                                {log?.customer && <Link to={`/customers/${log?.customer?.id}`} className='d-flex align-items-center text-dark text-hover-primary'>
                                    <span className='fw-bolder fs-6 text-dark'>{log?.customer?.name}</span>
                                </Link>}
                            </div>
                        </div>
                        <div className='row mb-7'>
                            <label className='col-lg-4 fw-bold text-muted'>Number</label>
                            <div className='col-lg-8'>
                                <a href={`tel:${log?.remote_number}`} className='d-flex align-items-center text-dark text-hover-primary'>
                                    <span className='fw-bolder fs-6 text-dark'>{log?.remote_number}</span>
                                </a>
                            </div>
                        </div>
                        <div className='row mb-7'>
                            <label className='col-lg-4 fw-bold text-muted'>Called At</label>
                            <div className='col-lg-8'>
                                <span className='fw-bolder fs-6 text-dark'>{log?.log?.start}</span>
                            </div>
                        </div>
                        <div className='row mb-7'>
                            <label className='col-lg-4 fw-bold text-muted'>Direction</label>
                            <div className='col-lg-8'>
                                {log?.log?.direction === 'Outgoing' ?
                                    <span className='fw-bolder fs-6 text-dark'><i className="bi bi-telephone-outbound-fill pe-2"></i>{log?.log?.direction}</span>
                                :
                                    <span className='fw-bolder fs-6 text-dark'><i className="bi bi-telephone-inbound-fill pe-2"></i>{log?.log?.direction}</span>
                                }
                            </div>
                        </div>
                        <div className='row mb-7'>
                            <label className='col-lg-4 fw-bold text-muted'>Duration</label>
                            <div className='col-lg-8'>
                                {log?.state === 'Missed' ?
                                    <span className="badge badge-sm badge-danger">Missed</span>
                                :
                                    <span className='fw-bolder fs-6 text-success'>{log?.log?.duration}s</span>
                                }
                            </div>
                        </div>
                        <div className='row mb-7'>
                            <label className='col-lg-4 fw-bold text-muted'>Received</label>
                            <div className='col-lg-8'>
                                {log?.received && <Link to={`/users/${log?.received?.id}`} className='d-flex align-items-center text-dark text-hover-primary'>
                                    <span className='fw-bolder fs-6 text-dark'>{log?.received?.name}</span>
                                </Link>}
                            </div>
                        </div>
                        <div className='row mb-7'>
                            <label className='col-lg-4 fw-bold text-muted'>Note</label>
                            <div className='col-lg-8'>
                                <span className='fw-bolder fs-6 text-dark'>{log?.note}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className='btn btn-sm btn-outline btn-light w-125px' onClick={closeModal}>
                        Close
                    </button>
                </div>
            </div>
            {loading && <LoadingComponent />}
        </Modal>
    </>)
}

export {VoIPCreateForm}