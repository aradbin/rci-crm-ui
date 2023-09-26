import { Field, FormikProvider, useFormik } from "formik"
import * as Yup from 'yup'
import { createRequest, getRequest, updateRequest } from "../../helpers/Requests"
import { CUSTOMERS_URL, TASKS_URL, USERS_URL } from "../../helpers/ApiEndpoints"
import { InputField } from "../fields/InputField"
import { Modal } from "react-bootstrap"
import { toast } from "react-toastify"
import { useContext, useEffect, useState } from "react"
import { LoadingComponent } from "../common/LoadingComponent"
import { AppContext } from "../../providers/AppProvider"
import { TextAreaField } from "../fields/TextAreaField"
import { SearchableSelectField } from "../fields/SearchableSelectField"
import { Query } from "../../helpers/Queries"
import { formatDate } from "../../helpers/Utils"
import { priorities } from "../../helpers/Variables"
import { SelectField } from "../fields/SelectField"

const TaskCreateForm = ({show, toggleShow, updateList}: any) => {
    const [loading, setLoading] = useState(false)
    const [customerOptions, setCustomerOptions] = useState([])
    const [assigneeOptions, setAssigneeOptions] = useState([])

    const { idForUpdate, setIdForUpdate } = useContext(AppContext)

    const priorityOptions = priorities

    const customers = Query('team-types', CUSTOMERS_URL, 'pageSize=all')
    const users = Query('users', USERS_URL, 'pageSize=all')

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            due_date: "",
            priority: "",
            customer_id: "",
            assignee_id: ""
        },
        validationSchema: Yup.object().shape({
            title: Yup.string().required('Title is required'),
            due_date: Yup.string().required('Due date is required'),
            priority: Yup.number().required('Priority is required'),
        }),
        onSubmit: async (values, {setSubmitting}) => {console.log(values)
            setSubmitting(true)
            const formData = JSON.parse(JSON.stringify(values))
            Object.keys(formData).forEach((key) => {
                if(formData[key]===""){
                    delete formData[key]
                }else{
                    if(key==='priority'){
                        formData.priority = parseInt(values.priority)
                    }
                }
            })
            try {
                if(idForUpdate === 0){
                    await createRequest(TASKS_URL,formData).then((response) => {
                        if(response?.status===201){
                            toast.success('Task Created Successfully')
                            updateList()
                            closeModal()
                        }
                    })
                }else{
                    await updateRequest(`${TASKS_URL}/${idForUpdate}`,formData).then((response) => {
                        if(response?.status===200){
                            toast.success('Task Updated Successfully')
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
        if(customers?.data?.length > 0){
            const array = customers?.data?.map((item: any) => {
                return { label: item?.name, value: item?.id }
            })
            setCustomerOptions(array)
        }
    },[customers])

    useEffect(() => {
        if(users?.data?.length > 0){
            const array = users?.data?.map((item: any) => {
                return { label: item?.name, value: item?.id }
            })
            setAssigneeOptions(array)
        }
    },[users])

    useEffect(() => {
        if(idForUpdate > 0){
            toggleShow(true)
            setLoading(true)
            getRequest(`${TASKS_URL}/${idForUpdate}`).then((response) => {
                formik.setFieldValue("title",response.title)
                formik.setFieldValue("description",response.description || "")
                formik.setFieldValue("due_date",formatDate(response.due_date, 'input'))
                formik.setFieldValue("priority",response.priority)
                formik.setFieldValue("customer_id",response.customer_id)
                formik.setFieldValue("assignee_id",response.assignee_id)
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

    return (
        <Modal className="fade" aria-hidden='true' show={show} centered animation>
            <div className="modal-content">
                <div className='modal-header'>
                    <h2 className='fw-bolder'>{idForUpdate === 0 ? 'Create' : 'Update'} Task</h2>
                    <div className='btn btn-icon btn-sm btn-active-icon-primary' onClick={() => closeModal()}>
                        <i className="fa fa-times fs-2"></i>
                    </div>
                </div>
                <FormikProvider value={formik}>
                    <form className="form" onSubmit={formik.handleSubmit} noValidate>
                        <div className="modal-body mx-2 mx-xl-2 my-2">
                            <div className='d-flex flex-column'>
                                <Field
                                    label="Title"
                                    name="title"
                                    type="text"
                                    required="required"
                                    component={InputField}
                                    size="sm"
                                />
                                <Field
                                    label="Description"
                                    name="description"
                                    type="text"
                                    component={TextAreaField}
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
                                    label="Priority"
                                    name="priority"
                                    options={priorityOptions}
                                    component={SelectField}
                                    size="sm"
                                />
                                <Field
                                    label="Customer"
                                    name="customer_id"
                                    options={customerOptions}
                                    component={SearchableSelectField}
                                    size="sm"
                                />
                                <Field
                                    label="Assignee"
                                    name="assignee_id"
                                    options={assigneeOptions}
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

export {TaskCreateForm}