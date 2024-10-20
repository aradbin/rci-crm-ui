import { useNavigate, useParams } from "react-router-dom";
import { KTSVG, toAbsoluteUrl } from "../../../_metronic/helpers";
import { useContext, useEffect, useState } from "react";
import { getRequest } from "../../helpers/Requests";
import { CUSTOMERS_URL, TASKS_URL, VOIP_URL } from "../../helpers/ApiEndpoints";
import { AppContext } from "../../providers/AppProvider";
import { CustomerCreateForm } from "../../components/forms/CustomerCreateForm";
import { LoadingComponent } from "../../components/common/LoadingComponent";
import TaskList from "../../components/task/TaskList";
import { statuses } from "../../helpers/Variables";
import CustomerServiceList from "../../components/customer/CustomerServiceList";
import { CustomerServiceCreateForm } from "../../components/forms/CustomerServiceCreateForm";
import { TableComponent } from "../../components/common/TableComponent";
import { voipColumns } from "../../columns/voipColumns";
import { getCustomerPriorityBadge, getStatusBadge, stringifyRequestQuery } from "../../helpers/Utils";
import CustomerContactList from "../../components/customer/CustomerContactList";
import { CustomerContactCreateForm } from "../../components/forms/CustomerContactCreateForm";
import { VoIPCreateForm } from "../../components/forms/VoIPCreateForm";
import EmailList from "../../components/email/EmailList";

const ProfileVoIPs = ({ customer }: any) => {
    const [refetch, setRefetch] = useState(0)

    const updateList = () => {
        setRefetch(refetch+1)
    }
    return (<>
        <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
            <div className='card-body py-3'>
                <TableComponent queryKey={`customer-voip-${customer?.id}`} url={`${VOIP_URL}/list`} params={stringifyRequestQuery({ customer_id: customer?.id })} columns={voipColumns} refetch={refetch} />
            </div>
        </div>
        <VoIPCreateForm updateList={updateList} />
    </>)
}

const ProfileEmail = ({ customer }: any) => {
    return (<>
        <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
            <EmailList filterParams={{ any_email: customer?.email }} />
        </div>
    </>)
}

const ProfileTasks = ({ customer }: any) => {
    return (
        <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
            <TaskList filterParams={{ customer_id: customer?.id }} />
        </div>
    )
}

const ProfileServices = ({ customer }: any) => {    
    const [refetch, setRefetch] = useState(1)

    const updateList = () => {
        setRefetch(refetch+1)
    }

    return (<>
        <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
            <CustomerServiceList filterParams={{ customer_id: customer?.id }} refetch={refetch} />
        </div>
        <CustomerServiceCreateForm customerId={customer?.id} updateList={updateList} />
    </>)
}

const ProfileContacts = ({ customer }: any) => {
    const [refetch, setRefetch] = useState(1)
    const [show, setShow] = useState(false)

    const toggleShow = (val: boolean) => {
        setShow(val)
    }

    const updateList = () => {
        setRefetch(refetch+1)
    }

    return (<>
        <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
            <div className="card-header justify-content-end">
                <button className='btn btn-sm btn-primary align-self-center' onClick={() => toggleShow(true)}>Add Contact</button>
            </div>
            <CustomerContactList filterParams={{ customer_id: customer?.id }} refetch={refetch} />
        </div>
        <CustomerContactCreateForm customer={customer} show={show} toggleShow={toggleShow} updateList={updateList} />
    </>)
}

const ProfileOverview = ({ customer }: any) => {
    const { setIdForUpdate, setIdForEmail } = useContext(AppContext)
    return (
        <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
            <div className='card-header'>
                <div className='card-title m-0'>
                    <h3 className='fw-bolder m-0'>Profile Details</h3>
                </div>
                <button className='btn btn-sm btn-primary align-self-center' onClick={() => setIdForUpdate(customer?.id)}>Edit Profile</button>
            </div>
            <div className='card-body p-9'>
                <div className='row mb-7'>
                    <label className='col-lg-4 fw-bold text-muted'>Name</label>
                    <div className='col-lg-8'>
                        <span className='fw-bolder fs-6 text-dark'>{customer?.name}</span>
                    </div>
                </div>
                <div className='row mb-7'>
                    <label className='col-lg-4 fw-bold text-muted'>Email</label>
                    <div className='col-lg-8'>
                        <span onClick={() => setIdForEmail(customer?.email)} className='fw-bolder fs-6 text-dark text-hover-primary cursor-pointer'>{customer?.email}</span>
                    </div>
                </div>
                <div className='row mb-7'>
                    <label className='col-lg-4 fw-bold text-muted'>Contact</label>
                    <div className='col-lg-8'>
                        <a href={`tel:${customer?.contact}`} className='fw-bolder fs-6 text-dark text-hover-primary'>{customer?.contact}</a>
                    </div>
                </div>
                <div className='row mb-7'>
                    <label className='col-lg-4 fw-bold text-muted'>Alternative Contact</label>
                    <div className='col-lg-8'>
                        <a href={`tel:${customer?.metadata?.optional_contact}`} className='fw-bolder fs-6 text-dark text-hover-primary'>{customer?.metadata?.optional_contact}</a>
                    </div>
                </div>
                <div className='row mb-7'>
                    <label className='col-lg-4 fw-bold text-muted'>Address</label>
                    <div className='col-lg-8'>
                    <span className='fw-bolder fs-6 text-dark'>{customer?.address}</span>
                    </div>
                </div>
                <div className='row mb-7'>
                    <label className='col-lg-4 fw-bold text-muted'>Status</label>
                    <div className='col-lg-8'>
                    <span className='fw-bolder fs-6 text-dark'>{getStatusBadge(customer?.is_active)}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

const ProfileTabs = ({tab, setTab}: any) => {
    const tabs = [
        { label: 'Overview', value: 'overview' },
        { label: 'Contacts', value: 'contacts' },
        { label: 'Services', value: 'services' },
        { label: 'Tasks', value: 'tasks' },
        { label: 'Email', value: 'email' },
        // { label: 'WhatsApp', value: 'whatsapp' },
        { label: 'VoIP', value: 'voip' },
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

const ProfileHeader = ({ customer }: any) => {
    const { setIdForEmail, refetchTask } = useContext(AppContext)
    const [counts, setCounts] = useState<any>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if(customer?.id){
            setLoading(true)
            getRequest(`${TASKS_URL}/count`, `customer_id=${customer?.id}`).then((response) => {
                const count = {}
                response?.map((item: any) => {
                    count[item?.status] = item?.count
                })
                setCounts(count)
            }).finally(() => {
                setLoading(false)
            })
        }
    },[customer, refetchTask])

    return (
        <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
            <div className='me-7 mb-4'>
                <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>
                    <img src={customer?.avatar || toAbsoluteUrl('/media/avatars/blank.png')} alt='Avatar' />
                </div>
            </div>
            <div className='flex-grow-1'>
                <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
                    <div className='d-flex flex-column'>
                        <div className='d-flex align-items-center mb-2'>
                            <span className='text-gray-800 fs-2 fw-bolder me-1'>
                                {customer?.name}
                            </span>
                            {customer?.priority > 1 && <KTSVG path='media/icons/duotune/general/gen049.svg' className={`svg-icon svg-icon-2x ms-2 ${getCustomerPriorityBadge(customer?.priority)}`} />}
                        </div>
                        <div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>
                            <a href={`tel:${customer?.contact}`} className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2 gap-2'>
                                <i className="fa-solid fa-square-phone"></i> {customer?.contact}
                            </a>
                            <span className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2 gap-2 cursor-pointer' onClick={() => setIdForEmail(customer?.email)}>
                                <i className="fa-solid fa-envelope"></i> {customer?.email}
                            </span>
                        </div>
                    </div>
                </div>
                <div className='d-flex flex-wrap flex-stack'>
                    <div className='d-flex flex-column flex-grow-1 pe-8'>
                        <div className='d-flex flex-wrap'>
                            {statuses?.map((item, index) =>
                                <div key={index} className={`border border-${item?.color} border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3`}>
                                    <div className='d-flex align-items-center'>
                                        <i className={`bi bi-check2-square fs-3 text-${item?.color} me-3`}></i>
                                        <div className={`fs-2 fw-bolder text-${item?.color}`}>
                                            {loading ? <span className='spinner-border align-middle' style={{ width: '1.5rem', height: '1.5rem' }}></span> : <span>{counts[item?.value] || 0}</span>}
                                        </div>
                                    </div>
                                    <div className={`fw-bold fs-6 text-${item?.color}`}>{item?.label}</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const CustomersProfilePage = () => {
    const { id } = useParams()
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [customer, setCustomer] = useState({})
    const [showCreate, setShowCreate] = useState(false)
    const [tab, setTab] = useState("overview")

    useEffect(() => {
        getCustomer()
    },[id])

    const getCustomer = () => {
        setLoading(true)
        getRequest(`${CUSTOMERS_URL}/${id}`).then((response) => {
            if(response){
                setCustomer(response)
            }else{
                navigate('/customers')
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
                    <ProfileHeader customer={customer}/>
                    <ProfileTabs tab={tab} setTab={setTab} />
                </div>
            </div>
            {tab === 'overview' && <ProfileOverview customer={customer}/>}
            {tab === 'contacts' && <ProfileContacts customer={customer}/>}
            {tab === 'services' && <ProfileServices customer={customer}/>}
            {tab === 'tasks' && <ProfileTasks customer={customer} />}
            {tab === 'email' && <ProfileEmail customer={customer} />}
            {tab === 'voip' && <ProfileVoIPs customer={customer}/>}
            <CustomerCreateForm show={showCreate} toggleShow={toggleShowCreate} updateList={getCustomer} />
            {loading && <LoadingComponent />}
        </>
    )
}

export default CustomersProfilePage;