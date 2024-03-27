import { Field, FormikProvider, useFormik } from "formik"
import * as Yup from 'yup'
import { createRequest, getRequest, updateRequest } from "../../helpers/Requests"
import { TASKS_URL } from "../../helpers/ApiEndpoints"
import { InputField } from "../fields/InputField"
import { Modal } from "react-bootstrap"
import { toast } from "react-toastify"
import { useContext, useEffect, useMemo, useState } from "react"
import { LoadingComponent } from "../common/LoadingComponent"
import { AppContext } from "../../providers/AppProvider"
import { TextAreaField } from "../fields/TextAreaField"
import { SearchableSelectField } from "../fields/SearchableSelectField"
import { formatDate } from "../../helpers/Utils"
import { priorities } from "../../helpers/Variables"
import { SelectField } from "../fields/SelectField"
import { useQueryClient } from "react-query"

type assigneeOptionType = { label: string, value: number }
type customerOptionType = { label: string, value: number }
type typeOptionType = { label: string, value: number }

const TaskCreateForm = () => {
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const [customerOptions, setCustomerOptions] = useState<customerOptionType[]>([])
    const [assigneeOptions, setAssigneeOptions] = useState<assigneeOptionType[]>([])
    const [typeOptions, setTypeOptions] = useState<typeOptionType[]>([])

    const queryClient = useQueryClient()
    const { idForTaskUpdate, setIdForTaskUpdate, showCreateTask, setShowCreateTask, showCreateSubTask, setShowCreateSubTask, refetchTask, setRefetchTask, users, customers, settings } = useContext(AppContext)

    const priorityOptions = priorities

    const formik = useFormik({
        initialValues: {
            title: "",
            type_id: "",
            description: "",
            due_date: "",
            estimation: "",
            priority: "",
            parent_id: "",
            customer_id: "",
            assignee_id: "",
            reporter_id: "",
        },
        validationSchema: Yup.object().shape({
            title: Yup.string().required('Title is required'),
            due_date: Yup.string().required('Due date is required'),
            priority: Yup.number().required('Priority is required'),
        }),
        onSubmit: async (values, {setSubmitting}) => {
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
                if(idForTaskUpdate === 0){
                    if(showCreateSubTask > 0){
                        formData.parent_id = showCreateSubTask
                    }
                    await createRequest(TASKS_URL,formData).then((response) => {
                        if(response?.status===201){
                            const refetch = refetchTask + 1
                            setRefetchTask(refetch)
                            if(showCreateSubTask > 0){
                                queryClient.invalidateQueries({ queryKey: `task-${showCreateSubTask}` })
                            }
                            toast.success('Task Created Successfully')
                            closeModal()
                        }
                    })
                }else{
                    await updateRequest(`${TASKS_URL}/${idForTaskUpdate}`,formData).then((response) => {
                        if(response?.status===200){
                            const refetch = refetchTask + 1
                            setRefetchTask(refetch)
                            queryClient.invalidateQueries({ queryKey: `task-${idForTaskUpdate}` })
                            if(formData.parent_id){
                                queryClient.invalidateQueries({ queryKey: `task-${formData.parent_id}` })
                            }
                            toast.success('Task Updated Successfully')
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

    const toggleShow = (val: boolean) => {
        setShow(val)
    }

    useEffect(() => {
        let array: typeOptionType[] = [];
        if(settings?.length > 0){
            settings?.map((item: any) => {
                if(item.type === 'task'){
                    array.push({ label: item?.name, value: item?.id })
                }
            })
        }
        setTypeOptions(array)
    }, [settings]);

    useEffect(() => {
        let array: customerOptionType[] = [];
        if(customers?.length > 0){
            array = customers?.map((item: any) => {
                return { label: item?.name, value: item?.id }
            })
        }
        setCustomerOptions(array)
    }, [customers]);

    useEffect(() => {
        let array: assigneeOptionType[] = [];
        if(users?.length > 0){
            array = users.map((item: any) => {
                return { label: item?.name, value: item?.id }
            })
        }
        setAssigneeOptions(array)
    }, [users]);

    useEffect(() => {
        if(idForTaskUpdate > 0){
            toggleShow(true)
            setLoading(true)
            getRequest(`${TASKS_URL}/${idForTaskUpdate}`).then((response) => {
                formik.setFieldValue("title",response.title)
                formik.setFieldValue("type_id",response.type_id)
                formik.setFieldValue("description",response.description || "")
                formik.setFieldValue("due_date",formatDate(response.due_date, 'input'))
                formik.setFieldValue("estimation",response.estimation)
                formik.setFieldValue("priority",response.priority)
                formik.setFieldValue("parent_id",response.parent_id)
                formik.setFieldValue("customer_id",response.customer_id)
                formik.setFieldValue("assignee_id",response.assignee_id)
                formik.setFieldValue("reporter_id",response.reporter_id)
            }).finally(() => {
                setLoading(false)
            })
        }
    },[idForTaskUpdate])

    useEffect(() => {
        toggleShow(showCreateTask)
    },[showCreateTask])

    useEffect(() => {
        if(showCreateSubTask > 0){
            toggleShow(true)
        }
    },[showCreateSubTask])

    const closeModal = () => {
        formik.resetForm()
        toggleShow(false)
        setIdForTaskUpdate(0)
        setShowCreateTask(false)
        setShowCreateSubTask(0)
    }

    return (
        <Modal className="fade" aria-hidden='true' show={show} centered animation>
            <div className="modal-content">
                <div className='modal-header'>
                    <h2 className='fw-bolder'>{idForTaskUpdate === 0 ? 'Create' : 'Update'} {showCreateSubTask > 0 ? 'Sub' : ''} Task</h2>
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
                                    label="Type"
                                    name="type_id"
                                    options={typeOptions}
                                    component={SearchableSelectField}
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
                                    label="Estimated Hour"
                                    name="estimation"
                                    type="text"
                                    component={InputField}
                                    size="sm"
                                />
                                <Field
                                    label="Priority"
                                    name="priority"
                                    required="required"
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
                                <Field
                                    label="Reporter"
                                    name="reporter_id"
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