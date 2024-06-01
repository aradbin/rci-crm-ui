import { useContext, useEffect, useState } from "react"
import { statuses } from "../../helpers/Variables"
import { TableComponent } from "../common/TableComponent"
import { TASKS_URL } from "../../helpers/ApiEndpoints"
import { stringifyRequestQuery } from "../../helpers/Utils"
import { taskColumns } from "../../columns/taskColumns"
import { AppContext } from "../../providers/AppProvider"
import { getRequest } from "../../helpers/Requests"

const TaskList = ({ filterParams }: any) => {
    const [params, setParams] = useState<any>({...filterParams})
    const [loading, setLoading] = useState(false)
    const [counts, setCounts] = useState([])
    const [status, setStatus] = useState("")

    const { refetchTask } = useContext(AppContext)

    useEffect(() => {
        const formData = { ...filterParams }
        if(status != ""){
            formData.status = status
        }
        setParams(formData)
        setLoading(true)
        getRequest(`${TASKS_URL}/count`, stringifyRequestQuery(filterParams)).then((response) => {
            setCounts(response)
        }).finally(() => {
            setLoading(false)
        })
    },[filterParams, status])

    const getCount = (value: string) => {
        const found: any = counts?.find((count: { status: string, count: string }) => count?.status === value)
        if(found){
            return found?.count
        }
        return '0'
    }

    return (<>
        <div className="card-header justify-content-end align-items-center gap-2">
            {statuses?.map((item) =>
                <button key={item?.value} className={`btn btn-sm btn-outline ${item?.value === status ? `btn-${item?.color}` : `btn-outline-${item?.color}`}`} onClick={() => item?.value !== status ? setStatus(item?.value) : setStatus("")}>
                    {item?.label}: {loading ? <span className='spinner-border align-middle' style={{ width: '1rem', height: '1rem' }}></span> : <span>{getCount(item?.value)}</span>}
                </button>
            )}
        </div>
        <div className='card-body py-3'>
            <TableComponent queryKey="tasks" url={TASKS_URL} params={stringifyRequestQuery(params)} columns={taskColumns} refetch={refetchTask} />
        </div>
    </>)
}

export default TaskList