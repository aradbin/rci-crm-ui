import { Field, FormikProvider, useFormik } from "formik"
import * as Yup from 'yup'
import { createRequest } from "../../helpers/Requests"
import { WHATSAPP_URL } from "../../helpers/ApiEndpoints"
import { InputField } from "../fields/InputField"
import { Modal } from "react-bootstrap"
import { toast } from "react-toastify"
import { useContext, useEffect } from "react"
import { TextAreaField } from "../fields/TextAreaField"
import { AppContext } from "../../providers/AppProvider"

const WhatsAppCreateForm = ({show, toggleShow, updateList}: any) => {
    const { idForEmail, setIdForEmail } = useContext(AppContext)

    const formik = useFormik({
        initialValues: {
            to: "8801748419892",
            msg_body: "",
            template_name: "",
            message_type: "text",
        },
        validationSchema: Yup.object().shape({
            to: Yup.string().required('Receiver is required'),
            msg_body: Yup.string().required('Message is required'),
        }),
        onSubmit: async (values, {setSubmitting}) => {
            setSubmitting(true)
            try {
                await createRequest(`${WHATSAPP_URL}/send-message`,values).then((response) => {
                    if(response?.status===200){
                        toast.success('Message Sent Successfully')
                        updateList()
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

    useEffect(() => {
        if(idForEmail !== ""){
            toggleShow(true)
            formik.setFieldValue("toEmail", idForEmail)
        }else{
            formik.setFieldValue("toEmail", "")
        }
    },[idForEmail])

    const closeModal = () => {
        formik.resetForm()
        toggleShow(false)
        setIdForEmail("")
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
                <FormikProvider value={formik}>
                    <form className="form" onSubmit={formik.handleSubmit} noValidate>
                        <div className="modal-body scroll-y mx-2 mx-xl-2 my-2">
                            <div className='d-flex flex-column'>
                                <Field
                                    label="To"
                                    name="to"
                                    type="number"
                                    required="required"
                                    component={InputField}
                                    size="sm"
                                />
                                <Field
                                    label="Body"
                                    name="msg_body"
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
            </div>
        </Modal>
    )
}

export {WhatsAppCreateForm}