import { useNavigate, useParams } from "react-router-dom";
import { toAbsoluteUrl } from "../../../_metronic/helpers";
import { useContext, useEffect, useState } from "react";
import { getRequest } from "../../helpers/Requests";
import { TASKS_URL, USERS_URL } from "../../helpers/ApiEndpoints";
import { AppContext } from "../../providers/AppProvider";
import { UserCreateForm } from "../../components/forms/UserCreateForm";
import { getSettingsFromUserSettings } from "../../helpers/Utils";
import { LoadingComponent } from "../../components/common/LoadingComponent";
import { TableComponent } from "../../components/common/TableComponent";
import { taskColumns } from "../../columns/taskColumns";
import TaskList from "../../components/task/TaskList";

const ProfileTasks = ({ user }: any) => {
    return (
        <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
            <TaskList filterParams={{ assignee_id: user?.id }} />
        </div>
    )
}

const ProfileOverview = ({ user }: any) => {
    const { setIdForUpdate, setIdForEmail } = useContext(AppContext)
    return (
        <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
            <div className='card-header'>
                <div className='card-title m-0'>
                    <h3 className='fw-bolder m-0'>Profile Details</h3>
                </div>
                <button className='btn btn-sm btn-primary align-self-center' onClick={() => setIdForUpdate(user?.id)}>Edit Profile</button>
            </div>
            <div className='card-body p-9'>
                <div className='row mb-7'>
                    <label className='col-lg-4 fw-bold text-muted'>Name</label>
                    <div className='col-lg-8'>
                        <span className='fw-bolder fs-6 text-dark'>{user?.name}</span>
                    </div>
                </div>
                <div className='row mb-7'>
                    <label className='col-lg-4 fw-bold text-muted'>Email</label>
                    <div className='col-lg-8'>
                        <span onClick={() => setIdForEmail(user?.email)} className='fw-bolder fs-6 text-dark text-hover-primary cursor-pointer'>{user?.email}</span>
                    </div>
                </div>
                <div className='row mb-7'>
                    <label className='col-lg-4 fw-bold text-muted'>Contact</label>
                    <div className='col-lg-8'>
                        <a href={`tel:${user?.contact}`} className='fw-bolder fs-6 text-dark text-hover-primary'>{user?.contact}</a>
                    </div>
                </div>
                <div className='row mb-7'>
                    <label className='col-lg-4 fw-bold text-muted'>Department</label>
                    <div className='col-lg-8'>
                        <span className='fw-bolder fs-6 text-dark'>{getSettingsFromUserSettings(user?.userSettings, 'department').label}</span>
                    </div>
                </div>
                <div className='row mb-7'>
                    <label className='col-lg-4 fw-bold text-muted'>Designation</label>
                    <div className='col-lg-8'>
                        <span className='fw-bolder fs-6 text-dark'>{getSettingsFromUserSettings(user?.userSettings, 'designation').label}</span>
                    </div>
                </div>
                <div className='row mb-7'>
                    <label className='col-lg-4 fw-bold text-muted'>Assigned Email</label>
                    <div className='col-lg-8'>
                        <span className='fw-bolder fs-6 text-dark'>{getSettingsFromUserSettings(user?.userSettings, 'email').label}</span>
                    </div>
                </div>
                <div className='row mb-7'>
                    <label className='col-lg-4 fw-bold text-muted'>Assigned WhatsApp</label>
                    <div className='col-lg-8'>
                        <span className='fw-bolder fs-6 text-dark'>{getSettingsFromUserSettings(user?.userSettings, 'whatsapp').label}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

const ProfileTabs = ({tab, setTab}: any) => {
    const tabs = [
        { label: 'Overview', value: 'overview' },
        { label: 'Tasks', value: 'tasks' },
        // { label: 'Emails', value: 'emails' },
        // { label: 'WhatsApp', value: 'whatsapp' },
    ]

    return (
        <div className='d-flex overflow-auto h-55px'>
            <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
                {tabs?.map((item) => 
                    <li className='nav-item' key={item.value} onClick={() => setTab(item.value)}>
                        <span className={`nav-link text-active-primary me-6 cursor-pointer ${item.value === tab && 'active'}`}>
                            {item.label}
                        </span> 
                    </li>
                )}
            </ul>
        </div>
    )
}

const ProfileHeader = ({ user }: any) => {
    const { setIdForEmail } = useContext(AppContext)
    return (
        <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
            <div className='me-7 mb-4'>
                <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>
                    <img src={user?.avatar || toAbsoluteUrl('/media/avatars/blank.png')} alt='Avatar' />
                </div>
            </div>
            <div className='flex-grow-1'>
                <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
                    <div className='d-flex flex-column'>
                        <div className='d-flex align-items-center mb-2'>
                            <span className='text-gray-800 fs-2 fw-bolder me-1'>
                                {user?.name}
                            </span>
                        </div>
                        <div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>
                            <a href={`tel:${user?.contact}`} className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2 gap-2'>
                                <i className="fa-solid fa-square-phone"></i> {user?.contact}
                            </a>
                            <span className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2 gap-2 cursor-pointer' onClick={() => setIdForEmail(user?.email)}>
                                <i className="fa-solid fa-envelope"></i> {user?.email}
                            </span>
                            {getSettingsFromUserSettings(user?.userSettings, 'department').label && <span className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2 gap-2 cursor-pointer'>
                                <i className="fa-solid fa-building"></i> {getSettingsFromUserSettings(user?.userSettings, 'department').label}
                            </span>}
                            {getSettingsFromUserSettings(user?.userSettings, 'designation').label && <span className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2 gap-2 cursor-pointer'>
                                <i className="fa-solid fa-user-tie"></i> {getSettingsFromUserSettings(user?.userSettings, 'designation').label}
                            </span>}
                        </div>
                    </div>
                </div>
                <div className='d-flex flex-wrap flex-stack'>
                    <div className='d-flex flex-column flex-grow-1 pe-8'>
                        <div className='d-flex flex-wrap'>
                            <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                                <div className='d-flex align-items-center'>
                                    <i className="bi bi-check2-square fs-3 text-warning me-3"></i>
                                    <div className='fs-2 fw-bolder'>123</div>
                                </div>
                                <div className='fw-bold fs-6 text-gray-400'>In Progress</div>
                            </div>
                            <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                                <div className='d-flex align-items-center'>
                                    <i className="bi bi-check2-square fs-3 text-danger me-3"></i>
                                    <div className='fs-2 fw-bolder'>123</div>
                                </div>
                                <div className='fw-bold fs-6 text-gray-400'>Pending</div>
                            </div>
                            <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                                <div className='d-flex align-items-center'>
                                    <i className="bi bi-check2-square fs-3 text-success me-3"></i>
                                    <div className='fs-2 fw-bolder'>123</div>
                                </div>
                                <div className='fw-bold fs-6 text-gray-400'>Completed</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const UsersProfilePage = () => {
    const { id } = useParams()
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState({})
    const [showCreate, setShowCreate] = useState(false)
    const [tab, setTab] = useState("overview")

    useEffect(() => {
        getUser()
    },[id])

    const getUser = () => {
        setLoading(true)
        getRequest(`${USERS_URL}/${id}`).then((response) => {
            if(response){
                setUser(response)
            }else{
                navigate('/users')
            }
        }).finally(() => {
            setLoading(false)
        })
    }

    const toggleShowCreate = (show: boolean) => {
        setShowCreate(show)
    }
    
    return (
        <>
            <div className='card mb-5 mb-xl-10'>
                <div className='card-body pt-9 pb-0'>
                    <ProfileHeader user={user}/>
                    <ProfileTabs tab={tab} setTab={setTab} />
                </div>
            </div>
            {tab === 'overview' && <ProfileOverview user={user}/>}
            {tab === 'tasks' && <ProfileTasks user={user} />}
            <UserCreateForm show={showCreate} toggleShow={toggleShowCreate} updateList={getUser} />
            {loading && <LoadingComponent />}
        </>
    )
}

export default UsersProfilePage;