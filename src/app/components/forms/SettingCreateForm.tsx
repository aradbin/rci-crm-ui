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
            username: "",
            // for whatsapp, voip && phone
            number: "",
            // for whatsapp & email
            unipile_account_id: "",
            // for customer
            fields: []
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required('Name is required'),
            cycle: Yup.string().when({
                is: () => type === 'service',
                then: (schema) => schema.required('Service Cycle is required')
            }),
            username: Yup.string().when({
                is: () => type === 'email',
                then: (schema) => schema.required('Username is required')
            }),
            number: Yup.string().when({
                is: () => (type === 'whatsapp' || type === 'voip' || type === 'phone'),
                then: (schema) => schema.required('Number is required')
            }),
        }),
        onSubmit: async (values, {setSubmitting}) => {
            setSubmitting(true)
            try {
                const formData = { name: values.name, type: type, metadata: {}}
                formData.metadata = {
                    cycle: values.cycle,
                    username: values.username,
                    number: values.number,
                    unipile_account_id: values.unipile_account_id,
                    fields: values.fields,
                }
                if(idForUpdate === 0){
                    await createRequest(SETTINGS_URL,formData).then((response) => {
                        if(response?.status===201){
                            toast.success(`${firstLetterUpperCase(type)} Created Successfully`)
                            const qr = type === 'whatsapp' ? true : false
                            updateListHandler(qr)
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
                formik.setFieldValue("cycle", response?.metadata?.cycle)
                formik.setFieldValue("username", response?.metadata?.username)
                formik.setFieldValue("number", response?.metadata?.number)
                formik.setFieldValue("unipile_account_id", response?.metadata?.unipile_account_id)
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

    const updateListHandler = (qr = false) => {
        queryClient.invalidateQueries({ queryKey: ['all-settings'] })
        updateList(qr)
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
                                {type === 'service' &&
                                    <Field
                                        label="Cycle"
                                        name="cycle"
                                        options={cycles}
                                        required="required"
                                        component={SelectField}
                                        size="sm"
                                    />
                                }
                                {type === 'email' &&
                                    <Field
                                        label="Email"
                                        name="username"
                                        type="email"
                                        required="required"
                                        component={InputField}
                                        size="sm"
                                    />
                                }
                                {(type === 'whatsapp' || type === 'voip' || type === 'phone') &&
                                    <Field
                                        label="Number"
                                        name="number"
                                        type="text"
                                        required="required"
                                        component={InputField}
                                        size="sm"
                                    />
                                }
                                {(type === 'email' || type === 'whatsapp') &&
                                    <Field
                                        label="Account ID"
                                        name="unipile_account_id"
                                        type="text"
                                        // required="required"
                                        component={InputField}
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