import { Field, FormikProvider, useFormik } from "formik"
import * as Yup from 'yup'
import { createRequest } from "../../helpers/Requests"
import { EMAIL_URL } from "../../helpers/ApiEndpoints"
import { InputField } from "../fields/InputField"
import { Modal } from "react-bootstrap"
import { toast } from "react-toastify"
import { useContext, useEffect, useState } from "react"
import { TextAreaField } from "../fields/TextAreaField"
import { AppContext } from "../../providers/AppProvider"
import { useAuth } from "../../modules/auth"

const EmailCreateForm = () => {
    const { currentUser } = useAuth()
    const [show, setShow] = useState(false)
    const { idForEmail, setIdForEmail, showCreateEmail, setShowCreateEmail, setShowCreateEmailSettings } = useContext(AppContext)

    const formik = useFormik({
        initialValues: {
            toEmail: "",
            subject: "",
            text: "",
            html: "",
        },
        validationSchema: Yup.object().shape({
            toEmail: Yup.string().required('To email address is required'),
            subject: Yup.string().required('Subject is required'),
            text: Yup.string().required('Body is required'),
        }),
        onSubmit: async (values, {setSubmitting}) => {
            setSubmitting(true)
            try {
                await createRequest(EMAIL_URL,values).then((response) => {
                    if(response?.status===201){
                        toast.success('Email Sent Successfully')
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
        if(idForEmail !== ""){
            if(!currentUser?.emailSettings){
                closeModal()
                setShowCreateEmailSettings(true)
            }else{
                toggleShow(true)
                formik.setFieldValue("toEmail", idForEmail)
            }
        }else{
            formik.setFieldValue("toEmail", "")
        }
    },[idForEmail])

    useEffect(() => {
        if(showCreateEmail){
            if(!currentUser?.emailSettings){
                closeModal()
                setShowCreateEmailSettings(true)
            }else{
                toggleShow(showCreateEmail)
            }
        }else{
            toggleShow(showCreateEmail)
        }
    },[showCreateEmail])

    const closeModal = () => {
        formik.resetForm()
        toggleShow(false)
        setIdForEmail("")
        setShowCreateEmail(false)
    }

    return (
        <Modal className="fade" aria-hidden='true' show={show} centered animation>
            <div className="modal-content">
                <div className='modal-header'>
                    <h2 className='fw-bolder'>Send Email</h2>
                    <div className='btn btn-icon btn-sm btn-active-icon-primary' onClick={() => closeModal()}>
                        <i className="fa fa-times fs-2"></i>
                    </div>
                </div>
                <FormikProvider value={formik}>
                    <form className="form" onSubmit={formik.handleSubmit} noValidate>
                        <div className="modal-body scroll-y mx-2 mx-xl-2 my-2">
                            <div className='d-flex flex-column'>
                                <Field
                                    label="To"
                                    name="toEmail"
                                    type="email"
                                    required="required"
                                    component={InputField}
                                    size="sm"
                                />
                                <Field
                                    label="Subject"
                                    name="subject"
                                    type="text"
                                    required="required"
                                    component={InputField}
                                    size="sm"
                                />
                                <Field
                                    label="Body"
                                    name="text"
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
        </Modal>
    )
}

export {EmailCreateForm}