import { Link, useNavigate, useParams } from "react-router-dom";
import { toAbsoluteUrl } from "../../../_metronic/helpers";
import { useContext, useEffect, useState } from "react";
import { getRequest, updateRequest } from "../../helpers/Requests";
import { TASKS_URL } from "../../helpers/ApiEndpoints";
import { AppContext } from "../../providers/AppProvider";
import { formatDate, getTaskPriorityBadge, getTaskStatusBadge } from "../../helpers/Utils";
import { LoadingComponent } from "../../components/common/LoadingComponent";
import TaskStatusField from "../../components/fields/TaskStatusField";
import { Query } from "../../helpers/Queries";

const TaskOverview = ({ task }: any) => {
    const { setIdForTaskUpdate } = useContext(AppContext)
    return (
        <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
            <div className='card-header'>
                <div className='card-title m-0'>
                    <h3 className='fw-bolder m-0'>{task?.title}</h3>
                </div>
                <button className='btn btn-sm btn-primary align-self-center' onClick={() => setIdForTaskUpdate(task?.id)}>Edit Task</button>
            </div>
            <div className='card-body p-9'>
                <div>{task?.description}</div>
            </div>
        </div>
    )
}

const TaskActions = ({ task }: any) => {
    return (
        <div className='card mb-5 mb-xl-10'>
            <div className='card-header justify-content-center'>
                <div className='card-title m-0'>
                    <TaskStatusField task={task} />
                </div>
            </div>
            <div className='card-body p-5 d-flex flex-column gap-5'>
                <div className="d-flex justify-content-between gap-4">
                    <span>Assignee</span>
                    <span>
                        <Link to={`/users/${task?.assignee?.id}`} className='d-flex align-items-center text-dark text-hover-primary'>
                            {/* <div className='symbol symbol-30px me-5'>
                                <img src={task?.assignee?.avatar || toAbsoluteUrl('/media/avatars/blank.png')} alt='Avatar' />
                            </div> */}
                            <div className='d-flex justify-content-start flex-column'>
                                <span className='fw-bold fs-7'>{task?.assignee?.name}</span>
                            </div>
                        </Link>
                    </span>
                </div>
                <div className="separator separator-dashed"></div>
                <div className="d-flex justify-content-between gap-4">
                    <span>Reporter</span>
                    <span>
                        <Link to={`/users/${task?.reporter?.id}`} className='d-flex align-items-center text-dark text-hover-primary'>
                            {/* <div className='symbol symbol-30px me-5'>
                                <img src={task?.reporter?.avatar || toAbsoluteUrl('/media/avatars/blank.png')} alt='Avatar' />
                            </div> */}
                            <div className='d-flex justify-content-start flex-column'>
                                <span className='fw-bold fs-7'>{task?.reporter?.name}</span>
                            </div>
                        </Link>
                    </span>
                </div>
                <div className="separator separator-dashed"></div>
                <div className="d-flex justify-content-between gap-4">
                    <span>Customer</span>
                    <span>
                        <Link to={`/customers/${task?.customer?.id}`} className='d-flex align-items-center text-dark text-hover-primary'>
                            {/* <div className='symbol symbol-30px me-5'>
                                <img src={task?.customer?.avatar || toAbsoluteUrl('/media/avatars/blank.png')} alt='Avatar' />
                            </div> */}
                            <div className='d-flex justify-content-start flex-column'>
                                <span className='fw-bold fs-7'>{task?.customer?.name}</span>
                            </div>
                        </Link>
                    </span>
                </div>
                <div className="separator separator-dashed"></div>
                <div className="d-flex justify-content-between gap-4">
                    <span>Priority</span>
                    <span>{getTaskPriorityBadge(task?.priority)}</span>
                </div>
                <div className="separator separator-dashed"></div>
                <div className="d-flex justify-content-between gap-4">
                    <span>Deadline</span>
                    <span>{formatDate(task?.due_date)}</span>
                </div>
                <div className="separator separator-dashed"></div>
                <div className="d-flex justify-content-between gap-4">
                    <span>Created</span>
                    <span>{formatDate(task?.created_at)}</span>
                </div>
            </div>
        </div>
    )
}

const TasksDetailsPage = () => {
    const { id } = useParams()
    const [task, setTask] = useState({})

    const {isLoading, data} = Query(`task-${id}`, `${TASKS_URL}/${id}`)

    useEffect(() => {
        if(JSON.stringify(data) !== JSON.stringify(task)){
            setTask(data)
        }
    }, [data]);
    
    return (
        <div className="d-flex gap-5 flex-column flex-lg-row">
            <div className="w-100 w-lg-60">
                <TaskOverview task={task}/>
            </div>
            <div className="w-100 w-lg-40">
                <TaskActions task={task} />
            </div>
            {isLoading && <LoadingComponent />}
        </div>
    )
}

export default TasksDetailsPage;