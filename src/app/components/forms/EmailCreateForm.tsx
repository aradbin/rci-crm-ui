import { Field, FormikProvider, useFormik } from "formik"
import * as Yup from 'yup'
import { createRequest } from "../../helpers/Requests"
import { EMAIL_URL, UNIPILE_API_KEY, UNIPILE_BASE_URL } from "../../helpers/ApiEndpoints"
import { InputField } from "../fields/InputField"
import { Modal } from "react-bootstrap"
import { toast } from "react-toastify"
import { useContext, useEffect, useState } from "react"
import { TextAreaField } from "../fields/TextAreaField"
import { AppContext } from "../../providers/AppProvider"
import { useAuth } from "../../modules/auth"
import { getSettingsFromUserSettings } from "../../helpers/Utils"
import { FileField } from "../fields/FileField"
import { QueryUnipile } from "../../helpers/Queries"

const EmailCreateForm = () => {
    const { currentUser } = useAuth()
    const [show, setShow] = useState(false)
    const [files, setFiles] = useState(null)
    const { idForEmail, setIdForEmail, showCreateEmail, setShowCreateEmail } = useContext(AppContext)

    const { data: unipileAccounts } = QueryUnipile('unipile-accounts', `/accounts`)

    const formik = useFormik({
        initialValues: {
            toEmail: "",
            subject: "",
            text: "",
            html: ""
        },
        validationSchema: Yup.object().shape({
            toEmail: Yup.string().required('To email address is required'),
            subject: Yup.string().required('Subject is required'),
            text: Yup.string().required('Body is required'),
        }),
        onSubmit: async (values, {setSubmitting}) => {
            setSubmitting(true)
            try {
                const account = getSettingsFromUserSettings(currentUser?.userSettings, 'email').username
                if(!account){
                    throw new Error('No assigned email address')
                }
                const emailAccount = unipileAccounts?.items?.find((item: any) => item?.name === account);
                if (!emailAccount) {
                    throw new Error('Email address is not connected')
                }

                const formData = new FormData()
                formData.append('account_id', emailAccount?.id)
                formData.append('subject', values.subject)
                formData.append('body', values.text)
                formData.append('to', JSON.stringify([
                    {
                        identifier: values.toEmail,
                    },
                ]))
                if(files && Object.keys(files).length > 0){
                    Object.keys(files)?.forEach((key: any) => {
                        formData.append('attachments', files[key])
                    })
                }
                const options = {
                    method: 'POST',
                    headers: {
                      accept: 'application/json',
                      'content-type': 'multipart/form-data',
                      'X-API-KEY': `${UNIPILE_API_KEY}`
                    }
                }
                await createRequest(`${UNIPILE_BASE_URL}/emails`, formData, options).then((response) => {
                    if(response?.status===201 && response?.data?.tracking_id){
                        toast.success('Email Sent Successfully')
                        closeModal()
                    }
                })
            } catch (ex) {
                console.error(ex)
            } finally {
                setSubmitting(false)
            }
        },
    })

    const toggleShow = (val: boolean) => {
        setShow(val)
    }

    useEffect(() => {
        if(idForEmail !== ""){
            toggleShow(true)
            formik.setFieldValue("toEmail", idForEmail)
        }else{
            formik.setFieldValue("toEmail", "")
            closeModal()
        }
    },[idForEmail])

    useEffect(() => {
        toggleShow(showCreateEmail)
    },[showCreateEmail])

    const hasEmailSettings = () => {
        let has = false
        if(getSettingsFromUserSettings(currentUser?.userSettings, 'email').value){
            has = true
        }

        return has
    }

    const closeModal = () => {
        formik.resetForm()
        toggleShow(false)
        setIdForEmail("")
        setShowCreateEmail(false)
    }

    return (
        <Modal className="fade" aria-hidden='true' show={show} centered animation>
            <div className="modal-content">
                <div className='modal-header'>
                    <h2 className='fw-bolder'>Send Email</h2>
                    <div className='btn btn-icon btn-sm btn-active-icon-primary' onClick={() => closeModal()}>
                        <i className="fa fa-times fs-2"></i>
                    </div>
                </div>
                {hasEmailSettings() ? <FormikProvider value={formik}>
                    <form className="form" onSubmit={formik.handleSubmit} noValidate>
                        <div className="modal-body scroll-y mx-2 mx-xl-2 my-2">
                            <div className='d-flex flex-column'>
                                <Field
                                    label="To"
                                    name="toEmail"
                                    type="email"
                                    required="required"
                                    component={InputField}
                                    size="sm"
                                />
                                <Field
                                    label="Subject"
                                    name="subject"
                                    type="text"
                                    required="required"
                                    component={InputField}
                                    size="sm"
                                />
                                <Field
                                    label="Body"
                                    name="text"
                                    type="text"
                                    required="required"
                                    component={TextAreaField}
                                    size="sm"
                                />
                                <Field
                                    label="Attachments"
                                    name="attachments"
                                    type="file"
                                    component={FileField}
                                    size="sm"
                                    onChangeHandler={(files: any) => setFiles(files)}
                                    multiple
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
                :
                <div className="modal-body scroll-y mx-2 mx-xl-2 my-2 text-center">
                    There's no email address assigned to you. Please assign one or contact to your admin
                </div>
                }
            </div>
        </Modal>
    )
}

export {EmailCreateForm}