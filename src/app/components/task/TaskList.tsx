import { useContext, useEffect, useState } from "react"
import { statuses } from "../../helpers/Variables"
import { TableComponent } from "../common/TableComponent"
import { TASKS_URL } from "../../helpers/ApiEndpoints"
import { stringifyRequestQuery } from "../../helpers/Utils"
import { taskColumns } from "../../columns/taskColumns"
import { AppContext } from "../../providers/AppProvider"

const TaskList = ({ filterParams }: any) => {
    const [params, setParams] = useState<any>({...filterParams})
    const [status, setStatus] = useState("")

    const { refetchTask } = useContext(AppContext)

    useEffect(() => {
        const formData = { ...filterParams }
        if(status != ""){
            formData.status = status
        }
        setParams(formData)
    },[filterParams, status])

    return (<>
        <div className="card-header justify-content-end align-items-center gap-2">
            {statuses?.map((item) =>
                <button key={item?.value} className={`btn btn-sm btn-outline btn-outline-dashed ${item?.value === status ? `btn-${item?.color}` : `btn-outline-${item?.color}`}`} onClick={() => item?.value !== status ? setStatus(item?.value) : setStatus("")}>{item?.label}</button>
            )}
        </div>
        <div className='card-body py-3'>
            <TableComponent queryKey="tasks" url={TASKS_URL} params={stringifyRequestQuery(params)} columns={taskColumns} refetch={refetchTask} />
        </div>
    </>)
}

export default TaskList