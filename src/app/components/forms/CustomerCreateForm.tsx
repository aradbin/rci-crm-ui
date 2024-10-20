import { Field, FormikProvider, useFormik } from "formik"
import * as Yup from 'yup'
import { createRequest, getRequest, updateRequest } from "../../helpers/Requests"
import { CUSTOMERS_URL } from "../../helpers/ApiEndpoints"
import { InputField } from "../fields/InputField"
import { Modal } from "react-bootstrap"
import { toast } from "react-toastify"
import { useContext, useEffect, useState } from "react"
import { LoadingComponent } from "../common/LoadingComponent"
import { AppContext } from "../../providers/AppProvider"
import { useQueryClient } from "react-query"
import { customerPriorities } from "../../helpers/Variables"
import { SelectField } from "../fields/SelectField"
import { getSettingsOptions } from "../../helpers/Utils"
import { RadioField } from "../fields/RadioField"

const CustomerCreateForm = ({show, toggleShow, updateList}: any) => {
    const [loading, setLoading] = useState(false)
    const { idForUpdate, idForStatus, setIdForStatus, setIdForUpdate, settings } = useContext(AppContext)
    const queryClient = useQueryClient()

    const priorityOptions = customerPriorities

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            contact: "",
            address: "",
            priority: "1",
            optional_contact: "",
            customer_type_id: "",
            business_type_id: "",
            is_active: true
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required('Name is required'),
            email: Yup.string().required('Email is required').email('Please provide valid email address'),
            contact: Yup.string().required('Contact is required'),
            priority: Yup.number().required('Priority is required'),
        }),
        onSubmit: async (values, {setSubmitting}) => {
            setSubmitting(true)
            try {
                const formData: any = { 
                    ...values,
                    priority: parseInt(values?.priority),
                    customer_type_id: values?.customer_type_id !== '' ? parseInt(values?.customer_type_id) : null,
                    business_type_id: values?.business_type_id !== '' ? parseInt(values?.business_type_id) : null,
                }
                delete formData.optional_contact
                if(values.optional_contact !== ''){
                    formData.metadata = {
                        optional_contact: values?.optional_contact
                    }
                }
                if(idForUpdate === 0 && idForStatus === 0){
                    await createRequest(CUSTOMERS_URL,formData).then((response) => {
                        if(response?.status===201){
                            toast.success('Customer Created Successfully')
                            updateListHandler()
                            closeModal()
                        }
                    })
                }else{
                    if(idForStatus > 0){
                        formData.is_active = !formData.is_active
                    }
                    await updateRequest(`${CUSTOMERS_URL}/${idForUpdate > 0 ? idForUpdate : idForStatus}`,formData).then((response) => {
                        if(response?.status===200){
                            toast.success('Customer Updated Successfully')
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
        if(idForUpdate > 0 || idForStatus > 0){
            toggleShow(true)
            setLoading(true)
            getRequest(`${CUSTOMERS_URL}/${idForUpdate > 0 ? idForUpdate : idForStatus}`).then((response) => {
                formik.setFieldValue("name",response.name)
                formik.setFieldValue("email",response.email)
                formik.setFieldValue("contact",response.contact)
                formik.setFieldValue("address",response.address)
                formik.setFieldValue("optional_contact",response.metadata?.optional_contact)
                formik.setFieldValue("priority",response?.priority)
                formik.setFieldValue("customer_type_id",response?.customer_type_id)
                formik.setFieldValue("business_type_id",response?.business_type_id)
                formik.setFieldValue("is_active",response?.is_active)
            }).finally(() => {
                setLoading(false)
            })
        }
    },[idForUpdate, idForStatus])

    const closeModal = () => {
        formik.resetForm()
        toggleShow(false)
        setIdForUpdate(0)
        setIdForStatus(0)
    }

    const updateListHandler = () => {
        queryClient.invalidateQueries({ queryKey: ['all-customers'] })
        updateList()
    }

    return (
        <Modal className="fade" aria-hidden='true' show={show} centered animation>
            <div className="modal-content">
                <div className='modal-header'>
                    <h2 className='fw-bolder'>{(idForUpdate === 0 && idForStatus === 0) ? 'Create' : 'Update'} Customer</h2>
                    <div className='btn btn-icon btn-sm btn-active-icon-primary' onClick={() => closeModal()}>
                        <i className="fa fa-times fs-2"></i>
                    </div>
                </div>
                <FormikProvider value={formik}>
                    <form className="form" onSubmit={formik.handleSubmit} noValidate>
                        <div className="modal-body scroll-y mx-2 mx-xl-2 my-2">
                            {idForStatus > 0 ? 
                                <div className="d-flex flex-column">
                                    <h2 className="text-center">{formik.values.is_active ? 'Deactivate' : 'Activate'} Customer</h2>
                                    <p className="text-center">Are you sure?</p>
                                </div>
                            :
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
                                    <Field
                                        label="Alternative Contact"
                                        name="optional_contact"
                                        type="text"
                                        component={InputField}
                                        size="sm"
                                    />
                                    <Field
                                        label="Priority"
                                        name="priority"
                                        options={priorityOptions}
                                        required="required"
                                        component={SelectField}
                                        size="sm"
                                    />
                                    <Field
                                        label="Customer Type"
                                        name="customer_type_id"
                                        options={getSettingsOptions(settings, 'customer-type')}
                                        component={SelectField}
                                        size="sm"
                                    />
                                    <Field
                                        label="Business Type"
                                        name="business_type_id"
                                        options={getSettingsOptions(settings, 'business-type')}
                                        component={SelectField}
                                        size="sm"
                                    />
                                    <Field
                                        label="Active"
                                        name="is_active"
                                        type="checkbox"
                                        component={RadioField}
                                        size="sm"
                                    />
                                </div>
                            }
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

export {CustomerCreateForm}