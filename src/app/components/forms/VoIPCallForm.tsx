import { Field, FormikProvider, useFormik } from "formik"
import * as Yup from 'yup'
import { updateRequest } from "../../helpers/Requests"
import { VOIP_URL } from "../../helpers/ApiEndpoints"
import { toast } from "react-toastify"
import { useContext, useEffect, useState } from "react"
import { TextAreaField } from "../fields/TextAreaField"
import { SocketContext } from "../../providers/SocketProvider"
import { useAuth } from "../../modules/auth"
import { Link, useNavigate } from "react-router-dom"

const VoIPCallForm = () => {
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

    const closeVoIP = () => {
        formik.resetForm()
        setVoip(null)
        setReceived(false)
        toggleShow(false)
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
    </>)
}

export {VoIPCallForm}