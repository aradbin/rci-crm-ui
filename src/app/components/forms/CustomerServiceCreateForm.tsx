import { Field, FormikProvider, useFormik } from "formik"
import * as Yup from 'yup'
import { createRequest, getRequest, updateRequest } from "../../helpers/Requests"
import { CUSTOMERS_SETTINGS_URL } from "../../helpers/ApiEndpoints"
import { InputField } from "../fields/InputField"
import { Modal } from "react-bootstrap"
import { toast } from "react-toastify"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../providers/AppProvider"
import { LoadingComponent } from "../common/LoadingComponent"
import { SearchableSelectField } from "../fields/SearchableSelectField"

const CustomerServiceCreateForm = ({customerId, show, toggleShow, updateList}: any) => {
    const [loading, setLoading] = useState(false)
    const [serviceOptions, setServiceOptions] = useState([])
    const { idForCustomerServiceUpdate, setIdForCustomerServiceUpdate, settings } = useContext(AppContext)

    const formik = useFormik({
        initialValues: {
            settings_id: "",
            from: "",
            due_date: ""
        },
        validationSchema: Yup.object().shape({
            settings_id: Yup.number().required('Service is required'),
            from: Yup.string().required('From date is required'),
            due_date: Yup.string().required('Due date is required'),
        }),
        onSubmit: async (values, {setSubmitting}) => {
            setSubmitting(true)
            try {
                if(idForCustomerServiceUpdate === 0){
                    const formData: any = {
                        customer_id: customerId,
                        settings_id: values.settings_id,
                        metadata: {
                            from: values.from,
                            due_date: values.due_date
                        }
                    }
                    await createRequest(CUSTOMERS_SETTINGS_URL, formData).then(async (response) => {
                        if(response?.status===201){
                            toast.success('Service Added Successfully')
                            updateListHandler()
                            closeModal()
                        }
                    })
                }else{
                    const formData: any = {
                        metadata: {
                            from: values.from,
                            due_date: values.due_date
                        }
                    }
                    await updateRequest(`${CUSTOMERS_SETTINGS_URL}/${idForCustomerServiceUpdate}`, formData).then((response) => {
                        if(response?.status===200){
                            toast.success('Service Updated Successfully')
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
        if(idForCustomerServiceUpdate > 0){
            toggleShow(true)
            setLoading(true)
            getRequest(`${CUSTOMERS_SETTINGS_URL}/${idForCustomerServiceUpdate}`).then((response) => {
                formik.setFieldValue("settings_id",response?.settings_id)
                formik.setFieldValue("from",response?.metadata?.from)
                formik.setFieldValue("due_date",response?.metadata?.due_date)
            }).finally(() => {
                setLoading(false)
            })
        }
    },[idForCustomerServiceUpdate])

    useEffect(() => {
        if(settings?.length > 0){
            const services: any = []
            settings?.map((item: any) => {
                if(item.type === 'service'){
                    services.push({ label: item?.name, value: item?.id })
                }
            })
            setServiceOptions(services)
        }
    }, [settings]);

    const closeModal = () => {
        formik.resetForm()
        toggleShow(false)
        setIdForCustomerServiceUpdate(0)
    }

    const updateListHandler = () => {
        updateList()
    }

    return (
        <Modal className="fade" aria-hidden='true' show={show} centered animation>
            <div className="modal-content">
                <div className='modal-header'>
                    <h2 className='fw-bolder'>{idForCustomerServiceUpdate === 0 ? 'Add' : 'Update'} Service</h2>
                    <div className='btn btn-icon btn-sm btn-active-icon-primary' onClick={() => closeModal()}>
                        <i className="fa fa-times fs-2"></i>
                    </div>
                </div>
                <FormikProvider value={formik}>
                    <form className="form" onSubmit={formik.handleSubmit} noValidate>
                        <div className="modal-body scroll-y mx-2 mx-xl-2 my-2">
                            <div className='d-flex flex-column'>
                                <Field
                                    label="Service"
                                    name="settings_id"
                                    options={serviceOptions}
                                    required="required"
                                    component={SearchableSelectField}
                                    size="sm"
                                    isDisabled={idForCustomerServiceUpdate > 0}
                                />
                                <Field
                                    label="From"
                                    name="from"
                                    type="date"
                                    required="required"
                                    component={InputField}
                                    size="sm"
                                />
                                <Field
                                    label="Due Date"
                                    name="due_date"
                                    type="date"
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

export {CustomerServiceCreateForm}