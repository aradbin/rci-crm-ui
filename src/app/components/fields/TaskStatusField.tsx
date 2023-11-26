import { useContext, useEffect, useState } from "react"
import { statuses } from "../../helpers/Variables"
import { updateRequest } from "../../helpers/Requests"
import { TASKS_URL } from "../../helpers/ApiEndpoints"
import { useQueryClient } from "react-query"
import { AppContext } from "../../providers/AppProvider"

const TaskStatusField = ({task}: any) => {
    const queryClient = useQueryClient()
    const [loading, setLoading] = useState(false)
    const [color, setColor] = useState("")
    const [label, setLabel] = useState("")

    const { setIdForTaskRunning } = useContext(AppContext)

    useEffect(() => {
        const status = statuses.find((item: any) => item.value === task?.status)
        if(status){
            setColor(status.color)
            setLabel(status.label)
        }
        if(task?.status === 'inprogress' && task?.running){
            setIdForTaskRunning(task?.id)
        }else{
            setIdForTaskRunning(0)
        }
    },[task])

    const updateStatus = (status: string) => {
        setLoading(true)
        updateRequest(`${TASKS_URL}/${task?.id}`, { status: status }).then((response) => {
            if(response?.status===200){
                queryClient.invalidateQueries({ queryKey: `task-${task?.id}` })
            }
        }).finally(() => {
            setLoading(false)
        })
    }

    return (<>
        <button className={`btn btn-${color} px-4 py-2 w-200px`} data-kt-menu-trigger='click' data-kt-menu-placement='bottom'>{label} {loading && <span className='spinner-border spinner-border-sm align-middle ms-2'></span>}</button>
        <div className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 w-200px mt-2 p-1' data-kt-menu='true'>
            {statuses.map((item: any) =>
                <div className="menu-item px-1" key={item.value}>
                    <a className={`menu-link fs-5 px-3 bg-light-${item.color}`} onClick={() => updateStatus(item.value)}>{item.label}</a>
                </div>
            )}
        </div>
    </>)
}

export default TaskStatusField