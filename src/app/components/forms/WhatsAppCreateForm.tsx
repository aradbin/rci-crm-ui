import { Field, FormikProvider, useFormik } from "formik"
import * as Yup from 'yup'
import { createRequest } from "../../helpers/Requests"
import { WHATSAPP_URL } from "../../helpers/ApiEndpoints"
import { InputField } from "../fields/InputField"
import { Modal } from "react-bootstrap"
import { toast } from "react-toastify"
import { useContext, useEffect, useState } from "react"
import { TextAreaField } from "../fields/TextAreaField"
import { AppContext } from "../../providers/AppProvider"
import { useAuth } from "../../modules/auth"
import { getSettingsFromUserSettings } from "../../helpers/Utils"
import { useQueryClient } from "react-query"

const WhatsAppCreateForm = () => {
    const { currentUser } = useAuth()
    const [show, setShow] = useState(false)
    const { idForWhatsApp, setIdForWhatsApp, showCreateWhatsApp, setShowCreateWhatsApp } = useContext(AppContext)
    const queryClient = useQueryClient()

    const formik = useFormik({
        initialValues: {
            sender_number: getSettingsFromUserSettings(currentUser?.userSettings, 'whatsapp').phone_number,
            recipient_number: "",
            text: "",
            template_name: "",
            message_type: "text",
        },
        validationSchema: Yup.object().shape({
            recipient_number: Yup.string().required('Recipient Number is required'),
            text: Yup.string().required('Message is required'),
        }),
        onSubmit: async (values, {setSubmitting}) => {
            setSubmitting(true)
            await createRequest(WHATSAPP_URL, values).then((response) => {
                console.log(response)
                if(response?.data?.chat_id){
                    queryClient.invalidateQueries({ queryKey: ['all-whatsapp'] })
                    closeModal()
                }
            }).catch((error) => {
                console.log(error)
            }).finally(() => {
                setSubmitting(false)
            })
        },
    })

    const toggleShow = (val: boolean) => {
        setShow(val)
    }

    useEffect(() => {
        if(idForWhatsApp !== ""){
            toggleShow(true)
            formik.setFieldValue("to", idForWhatsApp)
        }else{
            formik.setFieldValue("to", "")
        }
    },[idForWhatsApp])

    useEffect(() => {
        toggleShow(showCreateWhatsApp)
    },[showCreateWhatsApp])
    
    const hasWhatsAppSettings = () => {
        let has = false
        if(getSettingsFromUserSettings(currentUser?.userSettings, 'whatsapp').value){
            has = true
        }

        return has
    }

    const closeModal = () => {
        formik.resetForm()
        toggleShow(false)
        setIdForWhatsApp("")
        setShowCreateWhatsApp(false)
    }

    return (
        <Modal className="fade" aria-hidden='true' show={show} centered animation>
            <div className="modal-content">
                <div className='modal-header'>
                    <h2 className='fw-bolder'>Send WhatsApp Message</h2>
                    <div className='btn btn-icon btn-sm btn-active-icon-primary' onClick={() => closeModal()}>
                        <i className="fa fa-times fs-2"></i>
                    </div>
                </div>
                {hasWhatsAppSettings() ? <FormikProvider value={formik}>
                    <form className="form" onSubmit={formik.handleSubmit} noValidate>
                        <div className="modal-body scroll-y mx-2 mx-xl-2 my-2">
                            <div className='d-flex flex-column'>
                                <Field
                                    label="To"
                                    name="recipient_number"
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
                    There's no whatsapp number assigned to you. Please assign one or contact to your admin
                </div>
                }
            </div>
        </Modal>
    )
}

export {WhatsAppCreateForm}