import { useContext, useEffect, useState } from "react"
import { OverlayTrigger, Tooltip } from "react-bootstrap"
import { AppContext } from "../../providers/AppProvider"
import { getTaskTime, getTaskTimeString } from "../../helpers/Utils"
import { Link } from "react-router-dom"
import { updateRequest } from "../../helpers/Requests"
import { TASKS_URL } from "../../helpers/ApiEndpoints"
import { useQueryClient } from "react-query"

const ShortcutComponent = () => {
    const queryClient = useQueryClient()
    const { setShowCreateTask, setShowCreateEmail, setShowCreateWhatsApp, idForTaskRunning } = useContext(AppContext)
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const [runningTask, setRunningTask] = useState<any>(null)

    const update = (value: boolean, id: number) => {
        setLoading(true)
        updateRequest(`${TASKS_URL}/${id}`, { running: value }).then((response) => {
            if(response?.status===200){
                queryClient.invalidateQueries({ queryKey: `task-${runningTask?.id}` })
            }
        }).finally(() => {
            setLoading(false)
        })
    }
    console.log('idForTaskRunning',idForTaskRunning)
    return (
        <div className="d-flex flex-row-reverse align-items-end gap-2 bg-transparent" style={{
            position: 'fixed',
            bottom: '10px',
            right: '10px',
        }}>
            <button className="btn btn-info btn-icon" style={{ borderRadius: '50px' }} data-kt-menu-trigger='click' data-kt-menu-placement='top-end'><i className={`fa-solid fa-${show ? 'times' : 'plus'} p-0 fs-1`}></i></button>

            <div className='menu menu-sub menu-sub-dropdown gap-1 bg-transparent w-auto pb-1 shadow-none' data-kt-menu='true'>
                <OverlayTrigger placement="left" trigger={['hover', 'focus']} overlay={<Tooltip placement="left">Create Task</Tooltip>}>
                    <button className="btn btn-primary btn-icon" style={{
                        borderRadius: '50px',
                        animation: 'animationFadeIn 0.6s ease-in-out'
                    }} onClick={() => setShowCreateTask(true)}>
                        <i className="fa-solid fa-check p-0 fs-1"></i>
                    </button>
                </OverlayTrigger>
                <OverlayTrigger placement="left" trigger={['hover', 'focus']} overlay={<Tooltip placement="left">Send Email</Tooltip>}>
                    <button className="btn btn-warning btn-icon" style={{
                        borderRadius: '50px',
                        animation: 'animationFadeIn 0.4s ease-in-out'
                    }} onClick={() => setShowCreateEmail(true)}>
                        <i className="fa-solid fa-envelope p-0 fs-1"></i>
                    </button>
                </OverlayTrigger>
                <OverlayTrigger placement="left" trigger={['hover', 'focus']} overlay={<Tooltip placement="left">Send WhatsApp</Tooltip>}>
                    <button className="btn btn-success btn-icon" style={{
                        borderRadius: '50px',
                        animation: 'animationFadeIn 0.2s ease-in-out'
                    }} onClick={() => setShowCreateWhatsApp(true)}>
                        <i className="fa-brands fa-whatsapp p-0 fs-1"></i>
                    </button>
                </OverlayTrigger>
            </div>

            {idForTaskRunning?.length > 0 &&
                <div>
                    <button className="btn btn-info btn-sm" style={{ borderRadius: '50px', width: '140px' }} data-kt-menu-trigger='click' data-kt-menu-placement='top-end'>{idForTaskRunning.length} tasks running</button>
                    <div className='menu menu-sub menu-sub-dropdown gap-1 bg-transparent w-auto pb-1 shadow-none' data-kt-menu='true'>
                    {idForTaskRunning.map((task: any) => (
                        <div className="bg-info d-flex justify-content-between" style={{ borderRadius: '50px', width: '140px', animation: 'animationFadeIn 0.6s ease-in-out' }} key={task?.id}>
                            <Link to={`/tasks/${task?.id}`} className="btn btn-sm btn-color-white fs-3 pe-0" style={{ borderRadius: '50px'}} title={task?.title}>{getTaskTimeString(getTaskTime(task?.time_log))}</Link>
                            <button className="btn btn-icon btn-color-white pe-2" style={{ borderRadius: '50px'}} onClick={() => update(!task?.running, task.id)}>
                                {loading ?
                                    <span className='spinner-border spinner-border align-middle ms-2'></span>
                                :
                                    <i className={`fa-solid fa-${task?.running ? 'pause' : 'play'} p-0 fs-1`} />
                                }
                            </button>
                        </div>
                    ))}
                    </div>
                </div>
            }
        </div>
    )
}

export { ShortcutComponent }