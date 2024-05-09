import { Field, FormikProvider, useFormik } from "formik"
import * as Yup from 'yup'
import { createRequest, getRequest, updateRequest } from "../../helpers/Requests"
import { CUSTOMER_CONTACTS_URL } from "../../helpers/ApiEndpoints"
import { Modal } from "react-bootstrap"
import { toast } from "react-toastify"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../providers/AppProvider"
import { LoadingComponent } from "../common/LoadingComponent"
import { SearchableSelectField } from "../fields/SearchableSelectField"
import { InputField } from "../fields/InputField"

const CustomerContactCreateForm = ({customer, contact, show, toggleShow, updateList}: any) => {
    const [loading, setLoading] = useState(false)
    const [customerOptions, setCustomerOptions] = useState([])
    const [contactOptions, setContactOptions] = useState([])
    const { idForCustomerContactUpdate, setIdForCustomerContactUpdate, customers, contacts } = useContext(AppContext)

    const formik = useFormik({
        initialValues: {
            customer_id: "",
            contact_id: "",
            designation: "",
            contact: "",
            email: ""
        },
        validationSchema: Yup.object().shape({
            customer_id: Yup.number().required('Customer is required'),
            contact_id: Yup.string().required('Contact is required'),
            designation: Yup.string().required('Designation is required'),
            contact: Yup.string().required('Contact is required'),
            email: Yup.string().required('Email is required').email('Please provide valid email address'),
        }),
        onSubmit: async (values, {setSubmitting}) => {
            setSubmitting(true)
            try {
                if(idForCustomerContactUpdate === 0){
                    const formData: any = {
                        customer_id: values.customer_id,
                        contact_id: values.contact_id,
                        metadata: {
                            designation: values.designation,
                            contact: values.contact,
                            email: values.email,

                        }
                    }
                    await createRequest(CUSTOMER_CONTACTS_URL, formData).then(async (response) => {
                        if(response?.status===201){
                            toast.success('Contact Added to Customer Successfully')
                            updateListHandler()
                            closeModal()
                        }
                    })
                }else{
                    const formData: any = {
                        metadata: {
                            designation: values.designation,
                            contact: values.contact,
                            email: values.email,
                        }
                    }
                    await updateRequest(`${CUSTOMER_CONTACTS_URL}/${idForCustomerContactUpdate}`, formData).then((response) => {
                        if(response?.status===200){
                            toast.success('Customer Contact Updated Successfully')
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
        if(idForCustomerContactUpdate > 0){
            toggleShow(true)
            setLoading(true)
            getRequest(`${CUSTOMER_CONTACTS_URL}/${idForCustomerContactUpdate}`).then((response) => {
                formik.setFieldValue("customer_id",response?.customer_id)
                formik.setFieldValue("contact_id",response?.contact_id)
                formik.setFieldValue("designation",response?.metadata?.designation)
                formik.setFieldValue("contact",response?.metadata?.contact)
                formik.setFieldValue("email",response?.metadata?.email)
            }).finally(() => {
                setLoading(false)
            })
        }
    },[idForCustomerContactUpdate])

    useEffect(() => {
        if(customers?.length > 0){
            const array: any = []
            customers?.map((item: any) => {
                array.push({ label: item?.name, value: item?.id })
            })
            setCustomerOptions(array)
        }
    }, [customers]);

    useEffect(() => {
        if(contacts?.length > 0){
            const array: any = []
            contacts?.map((item: any) => {
                array.push({ label: item?.name, value: item?.id })
            })
            setContactOptions(array)
        }
    }, [contacts]);

    useEffect(() => {
        if(contact?.id){
            formik.setFieldValue('contact_id', contact?.id)
            formik.setFieldValue('contact', contact?.contact)
            formik.setFieldValue('email', contact?.email)
        }
    },[contact])

    useEffect(() => {
        if(customer?.id){
            formik.setFieldValue('customer_id', customer?.id)
        }
    },[customer])

    const closeModal = () => {
        formik.resetForm()
        toggleShow(false)
        setIdForCustomerContactUpdate(0)
    }

    const updateListHandler = () => {
        updateList()
    }

    const setContactDetails = (option: any) => {
        const selected: any = contacts.find((item: any) => item.id = option.value)
        if(selected){
            formik.setFieldValue('contact', selected?.contact)
            formik.setFieldValue('email', selected?.email)
        }
    }

    return (
        <Modal className="fade" aria-hidden='true' show={show} centered animation>
            <div className="modal-content">
                <div className='modal-header'>
                    <h2 className='fw-bolder'>{idForCustomerContactUpdate === 0 ? 'Add' : 'Update'} Customer Contact</h2>
                    <div className='btn btn-icon btn-sm btn-active-icon-primary' onClick={() => closeModal()}>
                        <i className="fa fa-times fs-2"></i>
                    </div>
                </div>
                <FormikProvider value={formik}>
                    <form className="form" onSubmit={formik.handleSubmit} noValidate>
                        <div className="modal-body scroll-y mx-2 mx-xl-2 my-2">
                            <div className='d-flex flex-column'>
                                <Field
                                    label="Customer"
                                    name="customer_id"
                                    options={customerOptions}
                                    required="required"
                                    component={SearchableSelectField}
                                    size="sm"
                                    isDisabled={(customer?.id || idForCustomerContactUpdate > 0) ? true : false}
                                />
                                <Field
                                    label="Contact"
                                    name="contact_id"
                                    options={contactOptions}
                                    required="required"
                                    component={SearchableSelectField}
                                    size="sm"
                                    isDisabled={(contact?.id || idForCustomerContactUpdate > 0) ? true : false}
                                    onChangeHandler={setContactDetails}
                                />
                                <Field
                                    label="Designation"
                                    name="designation"
                                    type="text"
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
                                    label="Email"
                                    name="email"
                                    type="email"
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
            {loading && <LoadingComponent />}
        </Modal>
    )
}

export {CustomerContactCreateForm}