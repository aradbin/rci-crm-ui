import { useContext, useEffect, useState } from "react"
import { ToolbarComponent } from "../../components/common/ToolbarComponent"
import { FilterComponent } from "../../components/common/FilterComponent"
import { AppContext } from "../../providers/AppProvider"
import TaskList from "../../components/task/TaskList"
import { getSettingsOptions } from "../../helpers/Utils"

const breadCrumbs = [
    { title: 'Task Management', path: '/tasks', isSeparator: false },
    { isSeparator: true },
]

const TasksPage = () => {
    const [params, setParams] = useState<any>({})
    const { setShowCreateTask, settings } = useContext(AppContext)

    const filter = {
        initialValues: {
            id: "",
            title: "",
            sort: "",
            settings_id: ""
        },
        fields: [
            { label: "ID", name: "id", type: "number" },
            { label: "Title", name: "title" },
            { label: "Service", name: "settings_id", type: "select", options: getSettingsOptions(settings, 'service') },
            { label: "Sort By", name: "sort", type: "select", options: [
                { label: "Priority (Low to High)", value: 'priorityLowToHigh' },
                { label: "Priority (High to Low)", value: 'priorityHighToLow' },
            ] },
        ]
    }

    useEffect(() => {
        filter.fields[2].options = getSettingsOptions(settings, 'service')
    },[settings])

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
        setParams(formData)
    }

    const toggleShowCreate = (show: boolean) => {
        setShowCreateTask(show)
    }

    return (
        <>
            <ToolbarComponent title="Tasks" breadCrumbs={breadCrumbs} handleButtonClick={toggleShowCreate}>
                <FilterComponent filter={filter} submit={handleFilterSubmit}/>
            </ToolbarComponent>
            <div className="card mb-5 mb-xl-8">
                <TaskList filterParams={params} />
            </div>
        </>
    )
}

export default TasksPage;