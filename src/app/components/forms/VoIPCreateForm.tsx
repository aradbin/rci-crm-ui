import { Field, FormikProvider, useFormik } from "formik"
import * as Yup from 'yup'
import { updateRequest } from "../../helpers/Requests"
import { VOIP_URL } from "../../helpers/ApiEndpoints"
import { InputField } from "../fields/InputField"
import { Modal } from "react-bootstrap"
import { toast } from "react-toastify"
import { useContext, useEffect, useState } from "react"
import { TextAreaField } from "../fields/TextAreaField"
import { SocketContext } from "../../providers/SocketProvider"
import { useAuth } from "../../modules/auth"
import { Link, useNavigate } from "react-router-dom"

const VoIPCreateForm = () => {
    const { currentUser } = useAuth()
    const navigate = useNavigate()
    const [show, setShow] = useState(false)
    const [received, setReceived] = useState(false)
    const { voip, setVoip } = useContext(SocketContext)

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
                        closeModal()
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

    useEffect(() => {
        if(voip){
            toggleShow(true)
        }
    },[voip])

    const receiveCall = async (val: boolean) => {
        if(val){
            setReceived(true)
            await updateRequest(`${VOIP_URL}/${voip.id}`, { received_by: currentUser?.id })
            if(voip?.customer?.id){
                navigate(`/customers/${voip?.customer?.id}`)
            }
        }
    }

    const closeModal = () => {
        formik.resetForm()
        setVoip(null)
        setReceived(false)
        toggleShow(false)
    }

    return (
        <Modal className="fade" aria-hidden='true' show={show} centered animation>
            <div className="modal-content">
                <div className='modal-header'>
                    <h2 className='fw-bolder mb-0'>VoIP Call Connected with <Link to={`/customers/${voip?.customer?.id}`} target="_blank"><b>{voip?.customer?.name || voip?.remote_number}</b></Link></h2>
                </div>
                {received ? <FormikProvider value={formik}>
                    <form className="form" onSubmit={formik.handleSubmit} noValidate>
                        <div className="modal-body scroll-y mx-2 mx-xl-2 my-2">
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
                        </div>
                        <div className="modal-footer">
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
                            <button type="button" className='btn btn-sm btn-outline btn-light w-125px' aria-disabled={formik.isSubmitting} onClick={closeModal}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </FormikProvider>
                :
                <>
                    <div className="modal-body scroll-y mx-2 mx-xl-2 my-2 text-center">
                        Are you on a call with <Link to={`/customers/${voip?.customer?.id}`} target="_blank"><b>{voip?.customer?.name} ({voip?.remote_number})</b></Link>
                    </div>
                    <div className="modal-footer">
                        <button type="submit" className="btn btn-sm btn-primary w-125px me-3" onClick={() => receiveCall(true)}>
                            <span>Yes</span>
                        </button>
                        <button type="button" className='btn btn-sm btn-outline btn-light w-125px' onClick={closeModal}>
                            <span>No</span>
                        </button>
                    </div>
                </>
                }
            </div>
        </Modal>
    )
}

export {VoIPCreateForm}