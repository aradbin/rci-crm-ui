import { Field, FormikProvider, useFormik } from "formik"
import * as Yup from 'yup'
import { createRequest, getRequest, updateRequest } from "../../helpers/Requests"
import { USERS_URL } from "../../helpers/ApiEndpoints"
import { InputField } from "../fields/InputField"
import { Modal } from "react-bootstrap"
import { toast } from "react-toastify"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../providers/AppProvider"
import { LoadingComponent } from "../common/LoadingComponent"
import { SearchableSelectField } from "../fields/SearchableSelectField"
import { getSettingsFromUserSettings, getSettingsOptions } from "../../helpers/Utils"
import { useQueryClient } from "react-query"
import { RadioField } from "../fields/RadioField"

const UserCreateForm = ({show, toggleShow, updateList}: any) => {
    const [loading, setLoading] = useState(false)
    const { idForUpdate, idForStatus, setIdForStatus, setIdForUpdate, settings } = useContext(AppContext)
    const queryClient = useQueryClient()

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            contact: "",
            password: "",
            department_id: "",
            designation_id: "",
            email_id: [],
            whatsapp_id: [],
            phone_id: [],
            voip_id: [],
            is_active: true
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required('Name is required'),
            email: Yup.string().required('Email is required').email('Please provide valid email address'),
            contact: Yup.string().required('Contact is required'),
            password: Yup.string().when({
                is: () => idForUpdate === 0 && idForStatus === 0,
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
                    is_active: values.is_active
                }
                const settings_id: number[] = []
                if(values.department_id !== ''){
                    settings_id.push(parseInt(values.department_id))
                }
                if(values.designation_id !== ''){
                    settings_id.push(parseInt(values.designation_id))
                }
                if(values.email_id.length > 0){
                    settings_id.push(...values.email_id)
                }
                if(values.whatsapp_id.length > 0){
                    settings_id.push(...values.whatsapp_id)
                }
                if(values.phone_id.length > 0){
                    settings_id.push(...values.phone_id)
                }
                if(values.voip_id.length > 0){
                    settings_id.push(...values.voip_id)
                }
                formData.settings_id = settings_id
                if(idForUpdate === 0 && idForStatus === 0){
                    await createRequest(USERS_URL, formData).then(async (response) => {
                        if(response?.status===201){
                            toast.success('User Created Successfully')
                            updateListHandler()
                            closeModal()
                        }
                    })
                }else{
                    delete formData.password
                    if(idForStatus > 0){
                        formData.is_active = !formData.is_active
                    }
                    await updateRequest(`${USERS_URL}/${idForUpdate > 0 ? idForUpdate : idForStatus}`, formData).then((response) => {
                        if(response?.status===200){
                            toast.success('User Updated Successfully')
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
            getRequest(`${USERS_URL}/${idForUpdate > 0 ? idForUpdate : idForStatus}`).then((response) => {
                formik.setFieldValue("name",response.name)
                formik.setFieldValue("email",response.email)
                formik.setFieldValue("contact",response.contact)
                const department_id = getSettingsFromUserSettings(response.userSettings, 'department')
                if(department_id.length > 0){
                    formik.setFieldValue("department_id", department_id[0]?.value)
                }
                const designation_id = getSettingsFromUserSettings(response.userSettings, 'designation')
                if(designation_id.length > 0){
                    formik.setFieldValue("designation_id", designation_id[0]?.value)
                }
                const email_id = getSettingsFromUserSettings(response.userSettings, 'email')
                if(email_id.length > 0){
                    formik.setFieldValue("email_id", email_id.map((item: any) => item.value))
                }
                const whatsapp_id = getSettingsFromUserSettings(response.userSettings, 'whatsapp')
                if(whatsapp_id.length > 0){
                    formik.setFieldValue("whatsapp_id", whatsapp_id.map((item: any) => item.value))
                }
                const phone_id = getSettingsFromUserSettings(response.userSettings, 'phone')
                if(phone_id.length > 0){
                    formik.setFieldValue("phone_id", phone_id.map((item: any) => item.value))
                }
                const voip_id = getSettingsFromUserSettings(response.userSettings, 'voip')
                if(voip_id.length > 0){
                    formik.setFieldValue("voip_id", voip_id.map((item: any) => item.value))
                }
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
        queryClient.invalidateQueries({ queryKey: ['all-users'] })
        updateList()
    }

    return (
        <Modal className="fade" aria-hidden='true' show={show} centered animation>
            <div className="modal-content">
                <div className='modal-header'>
                    <h2 className='fw-bolder'>{(idForUpdate === 0 && idForStatus === 0) ? 'Create' : 'Update'} User</h2>
                    <div className='btn btn-icon btn-sm btn-active-icon-primary' onClick={() => closeModal()}>
                        <i className="fa fa-times fs-2"></i>
                    </div>
                </div>
                <FormikProvider value={formik}>
                    <form className="form" onSubmit={formik.handleSubmit} noValidate>
                        <div className="modal-body scroll-y mx-2 mx-xl-2 my-2">
                            {idForStatus > 0 ? 
                                <div className="d-flex flex-column">
                                    <h2 className="text-center">{formik.values.is_active ? 'Deactivate' : 'Activate'} User</h2>
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
                                        options={getSettingsOptions(settings, 'department')}
                                        component={SearchableSelectField}
                                        size="sm"
                                    />
                                    <Field
                                        label="Designation"
                                        name="designation_id"
                                        options={getSettingsOptions(settings, 'designation')}
                                        component={SearchableSelectField}
                                        size="sm"
                                    />
                                    <Field
                                        label="Assign Email"
                                        name="email_id"
                                        options={getSettingsOptions(settings, 'email')}
                                        component={SearchableSelectField}
                                        size="sm"
                                        multiple
                                    />
                                    <Field
                                        label="Assign WhatsApp"
                                        name="whatsapp_id"
                                        options={getSettingsOptions(settings, 'whatsapp')}
                                        component={SearchableSelectField}
                                        size="sm"
                                        multiple
                                    />
                                    <Field
                                        label="Assign Phone"
                                        name="phone_id"
                                        options={getSettingsOptions(settings, 'phone')}
                                        component={SearchableSelectField}
                                        size="sm"
                                        multiple
                                    />
                                    <Field
                                        label="Assign VoIP"
                                        name="voip_id"
                                        options={getSettingsOptions(settings, 'voip')}
                                        component={SearchableSelectField}
                                        size="sm"
                                        multiple
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

export {UserCreateForm}