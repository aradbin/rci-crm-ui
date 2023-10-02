import { useState } from "react"
import { KTCard, KTCardBody } from "../../../_metronic/helpers"
import { TableComponent } from "../../components/common/TableComponent"
import { TASKS_URL } from "../../helpers/ApiEndpoints"
import { ToolbarComponent } from "../../components/common/ToolbarComponent"
import { stringifyRequestQuery } from "../../helpers/Utils"
import { FilterComponent } from "../../components/common/FilterComponent"
import { TaskCreateForm } from "../../components/forms/TaskCreateForm"
import { taskColumns } from "../../columns/taskColumns"

const breadCrumbs = [
    { title: 'Task Management', path: '/tasks', isSeparator: false },
    { isSeparator: true },
]

const filter = {
    initialValues: {
        id: "",
        title: "",
        sort: "",
    },
    fields: [
        { label: "ID", name: "id", type: "number" },
        { label: "Title", name: "title" },
        { label: "Sort By", name: "sort", type: "select", options: [
            { id: 'priorityLowToHigh', name: "Priority (Low to High)" },
            { id: 'priorityHighToLow', name: "Priority (High to Low)" },
        ] },
    ]
}

const TasksPage = () => {
    const [params, setParams] = useState("")
    const [refetch, setRefetch] = useState(0)
    const [showCreate, setShowCreate] = useState(false)
    const [showEmail, setShowEmail] = useState(false)

    const handleFilterSubmit = (values: any) => {
        const formData = {...values}
        if(formData?.sort){
            if(formData?.sort === 'priorityLowToHigh'){
                formData.sortBy = 'priority';
                formData.orderBy = 'asc';
            }else if(formData?.sort === 'priorityHighToLow'){
                formData.sortBy = 'priority';
                formData.orderBy = 'desc';
            }
            delete formData.sort;
        }
        setParams(stringifyRequestQuery(formData))
    }

    const toggleShowCreate = (show: boolean) => {
        setShowCreate(show)
    }

    const toggleShowEmail = (show: boolean) => {
        setShowEmail(show)
    }

    const updateList = () => {
        setRefetch(refetch+1)
    }

    return (
        <>
            <ToolbarComponent title="Tasks" breadCrumbs={breadCrumbs} handleButtonClick={toggleShowCreate}>
                <FilterComponent filter={filter} submit={handleFilterSubmit}/>
            </ToolbarComponent>
            <KTCard className="mb-5 mb-xl-8">
                <KTCardBody className='py-3'>
                    <TableComponent queryKey="tasks" url={TASKS_URL} params={params} columns={taskColumns} refetch={refetch} />
                </KTCardBody>
            </KTCard>
            <TaskCreateForm show={showCreate} toggleShow={toggleShowCreate} updateList={updateList} />
        </>
    )
}

export default TasksPage;