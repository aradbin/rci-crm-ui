import { useEffect, useState } from "react"
import { statuses } from "../../helpers/Variables"
import { updateRequest } from "../../helpers/Requests"
import { TASKS_URL } from "../../helpers/ApiEndpoints"

const TaskStatusField = ({task}: any) => {
    const [color, setColor] = useState("")
    const [label, setLabel] = useState("")

    useEffect(() => {
        const status = statuses.find((item: any) => item.value === task?.status)
        if(status){
            setColor(status.color)
            setLabel(status.label)
        }
    },[task])

    const updateStatus = (status: string) => {
        updateRequest(`${TASKS_URL}/${task?.id}`, { status: status }).then((response) => {
            if(response?.status===200){
                
            }
        })
    }

    return (<>
        <button className={`btn btn-${color} px-4 py-2 w-200px`} data-kt-menu-trigger='click' data-kt-menu-placement='bottom'>{label}</button>
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