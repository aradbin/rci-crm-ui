import { Field, FormikProvider, useFormik } from "formik"
import * as Yup from 'yup'
import { createRequest, getRequest, updateRequest } from "../../helpers/Requests"
import { CONTACTS_URL } from "../../helpers/ApiEndpoints"
import { InputField } from "../fields/InputField"
import { Modal } from "react-bootstrap"
import { toast } from "react-toastify"
import { useContext, useEffect, useState } from "react"
import { LoadingComponent } from "../common/LoadingComponent"
import { AppContext } from "../../providers/AppProvider"
import { useQueryClient } from "react-query"

const ContactCreateForm = ({show, toggleShow, updateList}: any) => {
    const [loading, setLoading] = useState(false)
    const { idForUpdate, setIdForUpdate } = useContext(AppContext)
    const queryClient = useQueryClient()

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            contact: "",
            address: ""
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required('Name is required'),
            email: Yup.string().required('Email is required').email('Please provide valid email address'),
            contact: Yup.string().required('Contact is required'),
        }),
        onSubmit: async (values, {setSubmitting}) => {
            setSubmitting(true)
            try {
                if(idForUpdate === 0){
                    await createRequest(CONTACTS_URL,values).then((response) => {
                        if(response?.status===201){
                            toast.success('Contact Created Successfully')
                            updateListHandler()
                            closeModal()
                        }
                    })
                }else{
                    await updateRequest(`${CONTACTS_URL}/${idForUpdate}`,values).then((response) => {
                        if(response?.status===200){
                            toast.success('Contact Updated Successfully')
                            updateListHandler()
                            closeModal()
                        }
                    })
                }
            } catch (ex) {
                console.error(ex)
            } finally {
                setSubmitting(false)
            }
        },
    })

    useEffect(() => {
        if(idForUpdate > 0){
            toggleShow(true)
            setLoading(true)
            getRequest(`${CONTACTS_URL}/${idForUpdate}`).then((response) => {
                formik.setFieldValue("name",response.name)
                formik.setFieldValue("email",response.email)
                formik.setFieldValue("contact",response.contact)
                formik.setFieldValue("address",response.address)
            }).finally(() => {
                setLoading(false)
            })
        }
    },[idForUpdate])

    const closeModal = () => {
        formik.resetForm()
        toggleShow(false)
        setIdForUpdate(0)
    }

    const updateListHandler = () => {
        queryClient.invalidateQueries({ queryKey: ['all-contacts'] })
        updateList()
    }

    return (
        <Modal className="fade" aria-hidden='true' show={show} centered animation>
            <div className="modal-content">
                <div className='modal-header'>
                    <h2 className='fw-bolder'>{idForUpdate === 0 ? 'Create' : 'Update'} Contact</h2>
                    <div className='btn btn-icon btn-sm btn-active-icon-primary' onClick={() => closeModal()}>
                        <i className="fa fa-times fs-2"></i>
                    </div>
                </div>
                <FormikProvider value={formik}>
                    <form className="form" onSubmit={formik.handleSubmit} noValidate>
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
                                    label="Address"
                                    name="address"
                                    type="text"
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
            {loading && <LoadingComponent />}
        </Modal>
    )
}

export {ContactCreateForm}