import { Field, FormikProvider, useFormik } from "formik"
import * as Yup from 'yup'
import { createRequest, getRequest, updateRequest } from "../../helpers/Requests"
import { CUSTOMER_SETTINGS_URL } from "../../helpers/ApiEndpoints"
import { InputField } from "../fields/InputField"
import { Modal } from "react-bootstrap"
import { toast } from "react-toastify"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../providers/AppProvider"
import { LoadingComponent } from "../common/LoadingComponent"
import { SearchableSelectField } from "../fields/SearchableSelectField"
import { RadioField } from "../fields/RadioField"
import { priorities } from "../../helpers/Variables"
import { SelectField } from "../fields/SelectField"
import { getSettingsOptions } from "../../helpers/Utils"

const CustomerServiceCreateForm = ({customerId, updateList}: any) => {
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false)
    const { idForCustomerServiceCreate, setIdForCustomerServiceCreate, idForCustomerServiceUpdate, setIdForCustomerServiceUpdate, settings } = useContext(AppContext)

    const priorityOptions = priorities

    const toggleShow = (val: boolean) => {
        setShow(val)
    }

    const formik = useFormik({
        initialValues: {
            settings_id: "",
            start_date: "",
            end_date: "",
            due_date: "",
            estimation: "",
            fee: "",
            auto_task: true,
            priority: 2
        },
        validationSchema: Yup.object().shape({
            settings_id: Yup.number().required('Service is required'),
            start_date: Yup.string().required('Start date is required'),
            end_date: Yup.string().required('End date is required'),
            due_date: Yup.string().required('Due date is required'),
            // estimation: Yup.number().required('Estimation is required'),
            // fee: Yup.number().required('Fee is required'),
            priority: Yup.number().when('auto_task', (autoTaskValue, schema) => {
                if (autoTaskValue[0]) {
                  return schema.required('Priority is required')
                }else{
                    return schema
                }
            })
        }),
        onSubmit: async (values, {setSubmitting}) => {
            setSubmitting(true)
            try {
                if(idForCustomerServiceUpdate === 0){
                    const formData: any = {
                        customer_id: customerId,
                        settings_id: values.settings_id,
                        metadata: {
                            start_date: values.start_date,
                            end_date: values.end_date,
                            due_date: values.due_date,
                            estimation: values.estimation,
                            fee: values.fee,
                            auto_task: values.auto_task,
                            priority: values.priority
                        }
                    }
                    await createRequest(CUSTOMER_SETTINGS_URL, formData).then(async (response) => {
                        if(response?.status===201){
                            toast.success('Service Added Successfully')
                            updateListHandler()
                            closeModal()
                        }
                    })
                }else{
                    const formData: any = {
                        metadata: {
                            start_date: values.start_date,
                            end_date: values.end_date,
                            due_date: values.due_date,
                            estimation: values.estimation,
                            fee: values.fee,
                            auto_task: values.auto_task,
                            priority: values.priority
                        }
                    }
                    await updateRequest(`${CUSTOMER_SETTINGS_URL}/${idForCustomerServiceUpdate}`, formData).then((response) => {
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
            getRequest(`${CUSTOMER_SETTINGS_URL}/${idForCustomerServiceUpdate}`).then((response) => {
                formik.setFieldValue("settings_id",response?.settings_id)
                formik.setFieldValue("start_date",response?.metadata?.start_date)
                formik.setFieldValue("end_date",response?.metadata?.end_date)
                formik.setFieldValue("due_date",response?.metadata?.due_date)
                formik.setFieldValue("estimation",response?.metadata?.estimation)
                formik.setFieldValue("fee",response?.metadata?.fee)
                formik.setFieldValue("auto_task",response?.metadata?.auto_task)
                formik.setFieldValue("priority",response?.metadata?.priority)
            }).finally(() => {
                setLoading(false)
            })
        }
        if(idForCustomerServiceCreate > 0){
            toggleShow(true)
            formik.setFieldValue('settings_id', idForCustomerServiceCreate)
        }
    },[idForCustomerServiceCreate, idForCustomerServiceUpdate])

    const closeModal = () => {
        formik.resetForm()
        toggleShow(false)
        setIdForCustomerServiceCreate(0)
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
                    <div className='btn btn-icon btn-sm btn-active-icon-primary' onClick={() => {
                        closeModal()
                        updateListHandler()
                    }}>
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
                                    options={getSettingsOptions(settings, 'service')}
                                    required="required"
                                    component={SearchableSelectField}
                                    size="sm"
                                    isDisabled={idForCustomerServiceUpdate > 0}
                                />
                                <Field
                                    label="Start Date"
                                    name="start_date"
                                    type="date"
                                    required="required"
                                    component={InputField}
                                    size="sm"
                                />
                                <Field
                                    label="End Date"
                                    name="end_date"
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
                                <Field
                                    label="Estimated Hour"
                                    name="estimation"
                                    type="number"
                                    // required="required"
                                    component={InputField}
                                    size="sm"
                                />
                                <Field
                                    label="Fee"
                                    name="fee"
                                    type="number"
                                    // required="required"
                                    component={InputField}
                                    size="sm"
                                />
                                <Field
                                    label="Active Auto Task Renew"
                                    name="auto_task"
                                    type="checkbox"
                                    required="required"
                                    component={RadioField}
                                    size="sm"
                                />
                                {formik.values.auto_task &&
                                    <Field
                                        label="Priority"
                                        name="priority"
                                        required="required"
                                        options={priorityOptions}
                                        component={SelectField}
                                        size="sm"
                                    />
                                }
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
                            <button type="button" className='btn btn-sm btn-outline btn-light w-125px' aria-disabled={formik.isSubmitting} onClick={() => {
                                closeModal()
                                updateListHandler()
                            }}>
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