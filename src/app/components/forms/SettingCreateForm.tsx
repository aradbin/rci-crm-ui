import { Field, FormikProvider, useFormik } from "formik"
import * as Yup from 'yup'
import { createRequest, getRequest, updateRequest } from "../../helpers/Requests"
import { SETTINGS_URL } from "../../helpers/ApiEndpoints"
import { InputField } from "../fields/InputField"
import { Modal } from "react-bootstrap"
import { toast } from "react-toastify"
import { useContext, useEffect, useState } from "react"
import { LoadingComponent } from "../common/LoadingComponent"
import { firstLetterUpperCase } from "../../helpers/Utils"
import { AppContext } from "../../providers/AppProvider"
import { SelectField } from "../fields/SelectField"
import { cycles } from "../../helpers/Variables"
import { useQueryClient } from "react-query"

const SettingCreateForm = ({show, toggleShow, updateList, type}: any) => {
    const [loading, setLoading] = useState(false)
    const { idForUpdate, setIdForUpdate } = useContext(AppContext)
    const queryClient = useQueryClient()

    const formik = useFormik({
        initialValues: {
            name: "",
            // for service
            cycle: "",
            // for email
            smtp: "",
            smtp_port: "",
            imap: "",
            imap_port: "",
            username: "",
            password: "",
            // for whatsapp
            access_token: "",
            phone_number: "",
            phone_number_id: "",
            whatsapp_business_account_id: "",
            // for voip && phone
            number: "",
            // for customer
            fields: []
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required('Name is required'),
            cycle: Yup.string().when({
                is: () => type === 'service',
                then: (schema) => schema.required('Service Cycle is required')
            }),
            smtp: Yup.string().when({
                is: () => type === 'email',
                then: (schema) => schema.required('SMTP host is required')
            }),
            smtp_port: Yup.string().when({
                is: () => type === 'email',
                then: (schema) => schema.required('SMTP port is required')
            }),
            imap: Yup.string().when({
                is: () => type === 'email',
                then: (schema) => schema.required('IMAP host is required')
            }),
            imap_port: Yup.string().when({
                is: () => type === 'email',
                then: (schema) => schema.required('IMAP port is required')
            }),
            username: Yup.string().when({
                is: () => type === 'email',
                then: (schema) => schema.required('Username is required')
            }),
            password: Yup.string().when({
                is: () => type === 'email',
                then: (schema) => schema.required('Password is required')
            }),
            access_token: Yup.string().when({
                is: () => type === 'whatsapp',
                then: (schema) => schema.required('Access Token is required')
            }),
            phone_number: Yup.string().when({
                is: () => type === 'whatsapp',
                then: (schema) => schema.required('Phone Number is required')
            }),
            phone_number_id: Yup.string().when({
                is: () => type === 'whatsapp',
                then: (schema) => schema.required('Phone Number ID is required')
            }),
            whatsapp_business_account_id: Yup.string().when({
                is: () => type === 'whatsapp',
                then: (schema) => schema.required('Whatsapp Business Account ID is required')
            }),
            number: Yup.string().when({
                is: () => (type === 'voip' || type === 'phone'),
                then: (schema) => schema.required('Number is required')
            }),
        }),
        onSubmit: async (values, {setSubmitting}) => {
            setSubmitting(true)
            try {
                const formData = { name: values.name, type: type, metadata: {}}
                if(type === 'service'){
                    formData.metadata = {
                        cycle: values.cycle,
                    }
                }
                if(type === 'email'){
                    formData.metadata = {
                        smtp: values.smtp,
                        smtp_port: values.smtp_port,
                        imap: values.imap,
                        imap_port: values.imap_port,
                        username: values.username,
                        password: values.password,
                    }
                }
                if(type === 'whatsapp'){
                    formData.metadata = {
                        access_token: values.access_token,
                        phone_number: values.phone_number,
                        phone_number_id: values.phone_number_id,
                        whatsapp_business_account_id: values.whatsapp_business_account_id,
                    }
                }
                if(type === 'voip' || type === 'phone'){
                    formData.metadata = {
                        number: values.number,
                    }
                }
                if(type === 'customer'){
                    formData.metadata = {
                        fields: values.fields,
                    }
                }
                if(idForUpdate === 0){
                    await createRequest(SETTINGS_URL,formData).then((response) => {
                        if(response?.status===201){
                            toast.success(`${firstLetterUpperCase(type)} Created Successfully`)
                            updateListHandler()
                            closeModal()
                        }
                    })
                }else{
                    await updateRequest(`${SETTINGS_URL}/${idForUpdate}`,formData).then((response) => {
                        if(response?.status===200){
                            toast.success(`${firstLetterUpperCase(type)} Updated Successfully`)
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
            getRequest(`${SETTINGS_URL}/${idForUpdate}`).then((response) => {
                formik.setFieldValue("name",response.name)
                if(type === 'service'){
                    formik.setFieldValue("cycle", response?.metadata?.cycle)
                }
                if(type === 'email'){
                    formik.setFieldValue("smtp", response?.metadata?.smtp)
                    formik.setFieldValue("smtp_port", response?.metadata?.smtp_port)
                    formik.setFieldValue("imap", response?.metadata?.imap)
                    formik.setFieldValue("imap_port", response?.metadata?.imap_port)
                    formik.setFieldValue("username", response?.metadata?.username)
                    formik.setFieldValue("password", response?.metadata?.password)
                }
                if(type === 'whatsapp'){
                    formik.setFieldValue("access_token", response?.metadata?.access_token)
                    formik.setFieldValue("phone_number", response?.metadata?.phone_number)
                    formik.setFieldValue("phone_number_id", response?.metadata?.phone_number_id)
                    formik.setFieldValue("whatsapp_business_account_id", response?.metadata?.whatsapp_business_account_id)
                }
                if(type === 'voip' || type === 'phone'){
                    formik.setFieldValue("number", response?.metadata?.number)
                }
                if(type === 'customer'){
                    formik.setFieldValue("customer", response?.metadata?.customer)
                }
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
        queryClient.invalidateQueries({ queryKey: ['all-settings'] })
        updateList()
    }

    return (
        <Modal className="fade" aria-hidden='true' show={show} centered animation>
            <div className="modal-content">
                <div className='modal-header'>
                    <h2 className='fw-bolder'>{idForUpdate === 0 ? 'Create' : 'Update'} {firstLetterUpperCase(type)}</h2>
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
                                {type === 'service' && <>
                                <Field
                                    label="Cycle"
                                    name="cycle"
                                    options={cycles}
                                    required="required"
                                    component={SelectField}
                                    size="sm"
                                />
                                </>}
                                {type === 'email' && <>
                                <div className="row">
                                    <div className="col-md-7">
                                        <Field
                                            label="SMTP Host"
                                            name="smtp"
                                            type="text"
                                            required="required"
                                            component={InputField}
                                            size="sm"
                                        />
                                    </div>
                                    <div className="col-md-5">
                                        <Field
                                            label="SMTP Port"
                                            name="smtp_port"
                                            type="text"
                                            required="required"
                                            component={InputField}
                                            size="sm"
                                        />
                                    </div>
                                    <div className="col-md-7">
                                        <Field
                                            label="IMAP Host"
                                            name="imap"
                                            type="text"
                                            required="required"
                                            component={InputField}
                                            size="sm"
                                        />
                                    </div>
                                    <div className="col-md-5">
                                        <Field
                                            label="IMAP Port"
                                            name="imap_port"
                                            type="text"
                                            required="required"
                                            component={InputField}
                                            size="sm"
                                        />
                                    </div>
                                </div>
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
                                </>}
                                {type === 'whatsapp' && <>
                                <Field
                                    label="Access Token"
                                    name="access_token"
                                    type="text"
                                    required="required"
                                    component={InputField}
                                    size="sm"
                                />
                                <Field
                                    label="Phone Number"
                                    name="phone_number"
                                    type="text"
                                    required="required"
                                    component={InputField}
                                    size="sm"
                                />
                                <Field
                                    label="Phone Number ID"
                                    name="phone_number_id"
                                    type="text"
                                    required="required"
                                    component={InputField}
                                    size="sm"
                                />
                                <Field
                                    label="Whatsapp Business Account ID"
                                    name="whatsapp_business_account_id"
                                    type="text"
                                    required="required"
                                    component={InputField}
                                    size="sm"
                                />
                                </>}
                                {(type === 'voip' || type === 'phone') && <>
                                <Field
                                    label="Number"
                                    name="number"
                                    type="text"
                                    required="required"
                                    component={InputField}
                                    size="sm"
                                />
                                </>}
                                {type === 'customer' && <>
                                <Field
                                    label="Field Name"
                                    name="field_name[]"
                                    type="text"
                                    required="required"
                                    component={InputField}
                                    size="sm"
                                />
                                <Field
                                    label="Field Type"
                                    name="field_type[]"
                                    type="text"
                                    required="required"
                                    component={InputField}
                                    size="sm"
                                />
                                </>}
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

export {SettingCreateForm}