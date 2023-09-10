import { Field, FormikProvider, useFormik } from "formik"
import * as Yup from 'yup'
import { createRequest } from "../../helpers/Requests"
import { USERS_URL } from "../../helpers/ApiEndpoints"
import { InputField } from "../fields/InputField"
import { Modal } from "react-bootstrap"
import { useEffect } from "react"
import { toast } from "react-toastify"
import { KTIcon } from "../../../_metronic/helpers"

const UserCreateForm = ({show, toggleShow, updateList}: any) => {    
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            contact: "",
            password: "",
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required('Name is required'),
            email: Yup.string().required('Email is required'),
            contact: Yup.string().required('Contact is required'),
            password: Yup.string().required('Password is required'),
        }),
        onSubmit: async (values, {setSubmitting, resetForm}) => {
            setSubmitting(true)
            try {
                await createRequest(USERS_URL,values).then(async (response) => {
                    if(response?.status===201 && response?.data?.id){
                        toast.success('User Created Successfully')
                        resetForm()
                        updateList()
                        toggleShow(false)
                    }
                })
            } catch (ex) {
                console.error(ex)
            } finally {
                setSubmitting(false)
            }
        },
    })

    const closeModal = () => {
        toggleShow(false)
        formik.resetForm()
    }

    return (
        <Modal className="fade" aria-hidden='true' show={show}>
            <div className="modal-content">
                <div className='modal-header'>
                    <h2 className='fw-bolder'>Create User</h2>
                    <div className='btn btn-icon btn-sm btn-active-icon-primary' onClick={() => closeModal()}>
                        <KTIcon iconName='cross' className='fs-1' />
                    </div>
                </div>
                <FormikProvider value={formik}>
                    <form className='form' onSubmit={formik.handleSubmit} noValidate>
                        <div className="modal-body scroll-y mx-2 mx-xl-2 my-2">
                            <div className='d-flex flex-column'>
                                <Field
                                    label="Name"
                                    name="name"
                                    type="text"
                                    required="required"
                                    component={InputField}
                                    size="sm"
                                />
                                <Field
                                    label="Email"
                                    name="email"
                                    type="email"
                                    required="required"
                                    component={InputField}
                                    size="sm"
                                />
                                <Field
                                    label="Contact"
                                    name="contact"
                                    type="text"
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
                                <div>
                                    <button type="submit" className="btn btn-sm btn-primary w-150px me-3" disabled={formik.isSubmitting}>
                                        {formik.isSubmitting ? (
                                            <span>
                                                Please wait...{' '}
                                                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                                            </span>
                                        ) : (
                                            <span>Submit</span>
                                        )}
                                    </button>
                                    <button type="button" className='btn btn-sm btn-outline btn-light w-150px' aria-disabled={formik.isSubmitting} onClick={closeModal}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </FormikProvider>
            </div>
        </Modal>
    )
}

export {UserCreateForm}