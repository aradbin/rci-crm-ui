import { Field, FormikProvider, useFormik } from "formik"
import * as Yup from 'yup'
import { createRequest } from "../../helpers/Requests"
import { EMAIL_SETTINGS_URL } from "../../helpers/ApiEndpoints"
import { InputField } from "../fields/InputField"
import { Modal } from "react-bootstrap"
import { toast } from "react-toastify"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../providers/AppProvider"
import { useAuth } from "../../modules/auth"

const EmailSettingsCreateForm = () => {
    const { currentUser, setCurrentUser } = useAuth()
    const [show, setShow] = useState(false)
    const { showCreateEmailSettings, setShowCreateEmailSettings } = useContext(AppContext)

    const formik = useFormik({
        initialValues: {
            host: "",
            username: "",
            password: "",
        },
        validationSchema: Yup.object().shape({
            host: Yup.string().required('Host address is required'),
            username: Yup.string().email('Please provide valid email address').required('Email address is required'),
            password: Yup.string().required('Password is required'),
        }),
        onSubmit: async (values, {setSubmitting}) => {
            setSubmitting(true)
            try {
                await createRequest(EMAIL_SETTINGS_URL,{...values, user_id: currentUser?.id}).then((response) => {
                    if(response?.status===201){
                        const user = JSON.parse(JSON.stringify(currentUser))
                        user.emailSettings = response?.data
                        setCurrentUser(user)
                        toast.success('Email Configured Successfully')
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
        toggleShow(showCreateEmailSettings)
    },[showCreateEmailSettings])

    const closeModal = () => {
        formik.resetForm()
        toggleShow(false)
        setShowCreateEmailSettings(false)
    }

    return (
        <Modal className="fade" aria-hidden='true' show={show} centered animation>
            <div className="modal-content">
                <div className='modal-header'>
                    <h2 className='fw-bolder'>Configure Your Email</h2>
                    <div className='btn btn-icon btn-sm btn-active-icon-primary' onClick={() => closeModal()}>
                        <i className="fa fa-times fs-2"></i>
                    </div>
                </div>
                <FormikProvider value={formik}>
                    <form className="form" onSubmit={formik.handleSubmit} noValidate>
                        <div className="modal-body scroll-y mx-2 mx-xl-2 my-2">
                            <div className='d-flex flex-column'>
                                <Field
                                    label="Host"
                                    name="host"
                                    type="text"
                                    required="required"
                                    component={InputField}
                                    size="sm"
                                />
                                <Field
                                    label="Email"
                                    name="username"
                                    type="email"
                                    required="required"
                                    component={InputField}
                                    size="sm"
                                />
                                <Field
                                    label="Password"
                                    name="password"
                                    type="password"
                                    required="required"
                                    component={InputField}
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

export {EmailSettingsCreateForm}