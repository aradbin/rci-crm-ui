import { useNavigate, useParams } from "react-router-dom";
import { toAbsoluteUrl } from "../../../_metronic/helpers";
import { useContext, useEffect, useState } from "react";
import { getRequest } from "../../helpers/Requests";
import { CUSTOMERS_URL } from "../../helpers/ApiEndpoints";
import { AppContext } from "../../providers/AppProvider";
import { CustomerCreateForm } from "../../components/forms/CustomerCreateForm";
import { LoadingComponent } from "../../components/common/LoadingComponent";

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
                        <a href={`tel:${customer?.optional_contact}`} className='fw-bolder fs-6 text-dark text-hover-primary'>{customer?.optional_contact}</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

const ProfileTabs = () => {
    return (
        <div className='d-flex overflow-auto h-55px'>
            <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
                <li className='nav-item'>
                    <span className='nav-link text-active-primary me-6 cursor-pointer active'>
                        Overview
                    </span>
                </li>
                <li className='nav-item'>
                    <span className='nav-link text-active-primary me-6 cursor-pointer'>
                        Tasks
                    </span>
                </li>
                <li className='nav-item'>
                    <span className='nav-link text-active-primary me-6 cursor-pointer'>
                        Emails
                    </span>
                </li>
                <li className='nav-item'>
                    <span className='nav-link text-active-primary me-6 cursor-pointer'>
                        WhatsApp
                    </span>
                </li>
            </ul>
        </div>
    )
}

const ProfileHeader = ({ customer }: any) => {
    const { setIdForEmail } = useContext(AppContext)
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

const CustomersProfilePage = () => {
    const { id } = useParams()
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [customer, setCustomer] = useState({})
    const [showCreate, setShowCreate] = useState(false)

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
                    <ProfileTabs />
                </div>
            </div>
            <ProfileOverview customer={customer}/>
            <CustomerCreateForm show={showCreate} toggleShow={toggleShowCreate} updateList={getCustomer} />
            {loading && <LoadingComponent />}
        </>
    )
}

export default CustomersProfilePage;