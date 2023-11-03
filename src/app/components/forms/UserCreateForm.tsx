import { Field, FormikProvider, useFormik } from "formik"
import * as Yup from 'yup'
import { createRequest, getRequest, updateRequest } from "../../helpers/Requests"
import { SETTINGS_URL, USERS_URL } from "../../helpers/ApiEndpoints"
import { InputField } from "../fields/InputField"
import { Modal } from "react-bootstrap"
import { toast } from "react-toastify"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../providers/AppProvider"
import { LoadingComponent } from "../common/LoadingComponent"
import { Query } from "../../helpers/Queries"
import { SearchableSelectField } from "../fields/SearchableSelectField"
import { getSettingsFromUserSettings } from "../../helpers/Utils"

const UserCreateForm = ({show, toggleShow, updateList}: any) => {
    const [loading, setLoading] = useState(false)
    const [settings, setSettings] = useState([])
    const [emailOptions, setEmailOptions] = useState([])
    const [whatsAppOptions, setWhatsAppOptions] = useState([])
    const [departmentOptions, setDepartmentOptions] = useState([])
    const [deisgnationOptions, setDeisgnationOptions] = useState([])
    const { idForUpdate, setIdForUpdate } = useContext(AppContext)

    const settingsQuery = Query('all-settings', SETTINGS_URL, 'pageSize=all')

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            contact: "",
            password: "",
            department_id: "",
            designation_id: "",
            email_id: "",
            whatsapp_id: "",
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required('Name is required'),
            email: Yup.string().required('Email is required').email('Please provide valid email address'),
            contact: Yup.string().required('Contact is required'),
            password: Yup.string().when({
                is: () => idForUpdate === 0,
                then: (schema) => schema.required('Password is required')
            }),
        }),
        onSubmit: async (values, {setSubmitting}) => {
            setSubmitting(true)
            try {
                const formData: any = {
                    name: values.name,
                    email: values.email,
                    contact: values.contact,
                    password: values.password,
                }
                const settings_id: number[] = []
                if(values.department_id !== ''){
                    settings_id.push(parseInt(values.department_id))
                }
                if(values.designation_id !== ''){
                    settings_id.push(parseInt(values.designation_id))
                }
                if(values.email_id !== ''){
                    settings_id.push(parseInt(values.email_id))
                }
                if(values.whatsapp_id !== ''){
                    settings_id.push(parseInt(values.whatsapp_id))
                }
                formData.settings_id = settings_id
                if(idForUpdate === 0){
                    await createRequest(USERS_URL, formData).then(async (response) => {
                        if(response?.status===201){
                            toast.success('User Created Successfully')
                            updateList()
                            closeModal()
                        }
                    })
                }else{
                    delete formData.password
                    await updateRequest(`${USERS_URL}/${idForUpdate}`, formData).then((response) => {
                        if(response?.status===200){
                            toast.success('User Updated Successfully')
                            updateList()
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
            getRequest(`${USERS_URL}/${idForUpdate}`).then((response) => {
                formik.setFieldValue("name",response.name)
                formik.setFieldValue("email",response.email)
                formik.setFieldValue("contact",response.contact)
                const department_id = getSettingsFromUserSettings(response.userSettings, 'department')
                if(department_id.value){
                    formik.setFieldValue("department_id", department_id.value)
                }
                const designation_id = getSettingsFromUserSettings(response.userSettings, 'designation')
                if(designation_id.value){
                    formik.setFieldValue("designation_id", designation_id.value)
                }
                const email_id = getSettingsFromUserSettings(response.userSettings, 'email')
                if(email_id.value){
                    formik.setFieldValue("email_id", email_id.value)
                }
                const whatsapp_id = getSettingsFromUserSettings(response.userSettings, 'whatsapp')
                if(whatsapp_id.value){
                    formik.setFieldValue("whatsapp_id", whatsapp_id.value)
                }
            }).finally(() => {
                setLoading(false)
            })
        }
    },[idForUpdate])

    useEffect(() => {
        if(JSON.stringify(settingsQuery?.data) !== JSON.stringify(settings)){
            setSettings(settingsQuery?.data)
            if(settingsQuery?.data?.length > 0){
                const emails: any = []
                const whatsapps: any = []
                const departments: any = []
                const designations: any = []
                settingsQuery?.data?.map((item: any) => {
                    if(item.type === 'email'){
                        emails.push({ label: `${item?.name} (${item.metadata.username})`, value: item?.id })
                    }
                    if(item.type === 'whatsapp'){
                        whatsapps.push({ label: `${item?.name} (${item.metadata.phone_number})`, value: item?.id })
                    }
                    if(item.type === 'department'){
                        departments.push({ label: item?.name, value: item?.id })
                    }
                    if(item.type === 'designation'){
                        designations.push({ label: item?.name, value: item?.id })
                    }
                })
                setEmailOptions(emails)
                setWhatsAppOptions(whatsapps)
                setDepartmentOptions(departments)
                setDeisgnationOptions(designations)
            }
        }
    }, [settingsQuery]);

    const closeModal = () => {
        formik.resetForm()
        toggleShow(false)
        setIdForUpdate(0)
    }

    return (
        <Modal className="fade" aria-hidden='true' show={show} centered animation>
            <div className="modal-content">
                <div className='modal-header'>
                    <h2 className='fw-bolder'>{idForUpdate === 0 ? 'Create' : 'Update'} User</h2>
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
                                {idForUpdate === 0 && <Field
                                    label="Password"
                                    name="password"
                                    type="password"
                                    required="required"
                                    component={InputField}
                                    size="sm"
                                />}
                                <Field
                                    label="Department"
                                    name="department_id"
                                    options={departmentOptions}
                                    component={SearchableSelectField}
                                    size="sm"
                                />
                                <Field
                                    label="Designation"
                                    name="designation_id"
                                    options={deisgnationOptions}
                                    component={SearchableSelectField}
                                    size="sm"
                                />
                                <Field
                                    label="Assign Email"
                                    name="email_id"
                                    options={emailOptions}
                                    component={SearchableSelectField}
                                    size="sm"
                                />
                                <Field
                                    label="Assign WhatsApp"
                                    name="whatsapp_id"
                                    options={whatsAppOptions}
                                    component={SearchableSelectField}
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

export {UserCreateForm}