import { Field, FormikProvider, useFormik } from "formik"
import * as Yup from 'yup'
import { getRequest, updateRequest } from "../../helpers/Requests"
import { VOIP_URL } from "../../helpers/ApiEndpoints"
import { toast } from "react-toastify"
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Modal } from "react-bootstrap"
import { AppContext } from "../../providers/AppProvider"
import { LoadingComponent } from "../common/LoadingComponent"
import { SearchableSelectField } from "../fields/SearchableSelectField"
import { TextAreaField } from "../fields/TextAreaField"
import { getOptions } from "../../helpers/Utils"

const VoIPCreateForm = ({updateList}: any) => {
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [log, setLog] = useState<any>(null)
    const { idForVoipDetails, setIdForVoipDetails, idForVoipUpdate, setIdForVoipUpdate, users, customers } = useContext(AppContext)

    const formik = useFormik({
        initialValues: {
            customer_id: "",
            received_by: "",
            note: "",
        },
        validationSchema: Yup.object().shape({
        }),
        onSubmit: async (values, {setSubmitting}) => {
            setSubmitting(true)
            try {
                await updateRequest(`${VOIP_URL}/${idForVoipUpdate}`, values).then((response) => {
                    if(response?.status===200){
                        toast.success('Log Updated Successfully')
                        updateList()
                        closeEdit()
                    }
                })
            } catch (ex) {
                console.error(ex)
            } finally {
                setSubmitting(false)
            }
        },
    })

    const toggleShowModal = (val: boolean) => {
        setShowModal(val)
    }

    const toggleShowEdit = (val: boolean) => {
        setShowEdit(val)
    }

    useEffect(() => {
        if(idForVoipDetails > 0){
            toggleShowModal(true)
            setLoading(true)
            getRequest(`${VOIP_URL}/details/${idForVoipDetails}`).then((response) => {
                setLog(response)
            }).finally(() => {
                setLoading(false)
            })
        }
    },[idForVoipDetails])

    useEffect(() => {
        if(idForVoipUpdate > 0){
            toggleShowEdit(true)
            setLoading(true)
            getRequest(`${VOIP_URL}/details/${idForVoipUpdate}`).then((response) => {
                formik.setFieldValue('customer_id',response?.customer_id)
                formik.setFieldValue('received_by',response?.received_by)
                formik.setFieldValue('note',response?.note)
            }).finally(() => {
                setLoading(false)
            })
        }
    },[idForVoipUpdate])

    const closeModal = () => {
        toggleShowModal(false)
        setIdForVoipDetails(0)
        formik.resetForm()
        toggleShowEdit(false)
        setIdForVoipUpdate(0)
    }

    const closeEdit = () => {
        formik.resetForm()
        toggleShowEdit(false)
        setIdForVoipUpdate(0)
        toggleShowModal(false)
        setIdForVoipDetails(0)
    }

    return (<>
        {idForVoipDetails > 0 && <Modal className="fade" aria-hidden='true' show={showModal} centered animation>
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
        </Modal>}

        {idForVoipUpdate > 0 && <Modal className="fade" aria-hidden='true' show={showEdit} centered animation>
            <div className="modal-content">
                <div className='modal-header'>
                    <h2 className='fw-bolder'>Update Log</h2>
                    <div className='btn btn-icon btn-sm btn-active-icon-primary' onClick={() => closeEdit()}>
                        <i className="fa fa-times fs-2"></i>
                    </div>
                </div>
                <FormikProvider value={formik}>
                    <form className="form" onSubmit={formik.handleSubmit} noValidate>
                        <div className="modal-body mx-2 mx-xl-2 my-2">
                            <div className='d-flex flex-column'>
                                <Field
                                    label="Customer"
                                    name="customer_id"
                                    options={getOptions(customers)}
                                    component={SearchableSelectField}
                                    size="sm"
                                />
                                <Field
                                    label="Received By"
                                    name="received_by"
                                    options={getOptions(users)}
                                    component={SearchableSelectField}
                                    size="sm"
                                />
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
            </div>
            {loading && <LoadingComponent />}
        </Modal>}
    </>)
}

export {VoIPCreateForm}