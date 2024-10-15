import { Link, useParams } from "react-router-dom";
import { toAbsoluteUrl } from "../../../_metronic/helpers";
import { useContext, useEffect, useState } from "react";
import { TASKS_URL } from "../../helpers/ApiEndpoints";
import { AppContext } from "../../providers/AppProvider";
import { formatDate, getTaskPriorityBadge, getTaskStatusBadge, getTaskTime, getTaskTimeString } from "../../helpers/Utils";
import { LoadingComponent } from "../../components/common/LoadingComponent";
import TaskStatusField from "../../components/fields/TaskStatusField";
import { Query } from "../../helpers/Queries";
import { TableWithDataComponent } from "../../components/common/TableWithDataComponent";
import { taskColumns } from "../../columns/taskColumns";
import { AvatarComponent } from "../../components/common/AvatarComponent";

const SubTasks = ({ task }: any) => {
    const { setShowCreateSubTask } = useContext(AppContext)
    return (
        <div className='card mb-5'>
            <div className='card-header'>
                <div className='card-title m-0'>
                    <h3 className='fw-bolder m-0'>Sub Tasks</h3>
                </div>
                <button className='btn btn-sm btn-primary align-self-center' onClick={() => setShowCreateSubTask(task?.id)}>Create Sub Task</button>
            </div>
            <div className='card-body p-9'>
                <TableWithDataComponent data={task?.subTasks} columns={taskColumns} />
            </div>
        </div>
    )
}

const TaskOverview = ({ task }: any) => {
    const { setIdForTaskUpdate } = useContext(AppContext)
    return (
        <div className='card mb-5'>
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
        <div className='card mb-5'>
            <div className='card-header justify-content-center'>
                <div className='card-title m-0'>
                    <TaskStatusField task={task} />
                </div>
            </div>
            <div className='card-body p-5 d-flex flex-column gap-5'>
                <div className="d-flex justify-content-between align-items-center gap-4">
                    <span>Assignee</span>
                    <div className="d-flex flex-wrap gap-1">
                        {task?.taskUsers?.filter((user: any) => user?.type === 'assignee')?.map((item: any, index: number) =>
                            <Link to={`/users/${item?.user?.id}`} className='d-flex align-items-center btn btn-sm btn-outline btn-outline-dashed py-0 ps-0 pe-3' key={index}>
                                <AvatarComponent avatar={item?.user?.avatar} name={item?.user?.name} size="30" fontSize="4" classNames="me-5" />
                                <div className='d-flex justify-content-start flex-column'>
                                    <span className='fw-bold fs-7'>{item?.user?.name}</span>
                                </div>
                            </Link>
                        )}
                    </div>
                </div>
                <div className="separator separator-dashed"></div>
                <div className="d-flex justify-content-between gap-4">
                    <span>Reporter</span>
                    <div className="d-flex flex-wrap gap-1">
                        {task?.taskUsers?.filter((user: any) => user?.type === 'reporter')?.map((item: any, index: number) =>
                            <Link to={`/users/${item?.user?.id}`} className='d-flex align-items-center btn btn-sm btn-outline btn-outline-dashed py-0 ps-0 pe-3' key={index}>
                                <AvatarComponent avatar={item?.user?.avatar} name={item?.user?.name} size="30" fontSize="4" classNames="me-5" />
                                <div className='d-flex justify-content-start flex-column'>
                                    <span className='fw-bold fs-7'>{item?.user?.name}</span>
                                </div>
                            </Link>
                        )}
                    </div>
                </div>
                <div className="separator separator-dashed"></div>
                <div className="d-flex justify-content-between gap-4">
                    <span>Customer</span>
                    <div className="d-flex flex-wrap gap-1">
                        <Link to={`/customers/${task?.customer?.id}`} className='d-flex align-items-center btn btn-sm btn-outline btn-outline-dashed py-0 ps-0 pe-3'>
                            <AvatarComponent avatar={task?.customer?.avatar} name={task?.customer?.name} size="30" fontSize="4" classNames="me-5" />
                            <div className='d-flex justify-content-start flex-column'>
                                <span className='fw-bold fs-7'>{task?.customer?.name}</span>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="separator separator-dashed"></div>
                <div className="d-flex justify-content-between gap-4">
                    <span>Service</span>
                    <span>{task?.settings?.name}</span>
                </div>
                <div className="separator separator-dashed"></div>
                {task?.parent_id && <>
                    <div className="d-flex justify-content-between gap-4">
                        <span>Parent Task</span>
                        <span>
                            <Link to={`/tasks/${task?.parent_id}`} className='d-flex align-items-center text-dark text-hover-primary'>
                                <div className='d-flex justify-content-start flex-column'>
                                    <span className='fw-bold fs-7' title={task?.parentTask?.title}># {task?.parent_id}</span>
                                </div>
                            </Link>
                        </span>
                    </div>
                    <div className="separator separator-dashed"></div>
                </>}
                <div className="d-flex justify-content-between gap-4">
                    <span>Priority</span>
                    <span>{getTaskPriorityBadge(task?.priority)}</span>
                </div>
                <div className="separator separator-dashed"></div>
                <div className="d-flex justify-content-between gap-4">
                    <span>Due Date</span>
                    <span>{formatDate(task?.due_date)}</span>
                </div>
                <div className="separator separator-dashed"></div>
                <div className="d-flex justify-content-between gap-4">
                    <span>Estimated Time</span>
                    <span>{task?.estimation ? `${task?.estimation} h` : "0 h"}</span>
                </div>
                <div className="separator separator-dashed"></div>
                <div className="d-flex justify-content-between gap-4">
                    <span>Worked</span>
                    <span>{getTaskTimeString(getTaskTime(task?.time_log))}</span>
                </div>
                {task?.billable && <>
                    <div className="separator separator-dashed"></div>
                    <div className="d-flex justify-content-between gap-4">
                        <span>Bill Amount</span>
                        <span>{task?.bill_amount}</span>
                    </div>
                </>}
                <div className="separator separator-dashed"></div>
                <div className="d-flex justify-content-between gap-4">
                    <span>Created At</span>
                    <span>{formatDate(task?.created_at)}</span>
                </div>
                <div className="separator separator-dashed"></div>
                <div className="d-flex justify-content-between gap-4">
                    <span>Created By</span>
                    {task?.creator ?
                        <div className="d-flex flex-wrap gap-1">
                            <Link to={`/users/${task?.creator?.id}`} className='d-flex align-items-center btn btn-sm btn-outline btn-outline-dashed py-0 ps-0 pe-3'>
                                <AvatarComponent avatar={task?.creator?.avatar} name={task?.creator?.name} size="30" fontSize="4" classNames="me-5" />
                                <div className='d-flex justify-content-start flex-column'>
                                    <span className='fw-bold fs-7'>{task?.creator?.name}</span>
                                </div>
                            </Link>
                        </div>
                    :
                        <span>Auto Generated</span>
                    }
                </div>
                <div className="separator separator-dashed"></div>
                <div className="d-flex justify-content-between gap-4">
                    <span>Completed At</span>
                    <span>{task?.completed_at ? formatDate(task?.completed_at) : ""}</span>
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
        <div className="d-flex gap-5 flex-column">
            <div className="d-flex gap-5 flex-column flex-lg-row">
                <div className="w-100 w-lg-60">
                    <TaskOverview task={task}/>
                </div>
                <div className="w-100 w-lg-40">
                    <TaskActions task={task} />
                </div>
                {isLoading && <LoadingComponent />}
            </div>
            <div className="w-100">
                <SubTasks task={task}/>
            </div>
        </div>
    )
}

export default TasksDetailsPage;