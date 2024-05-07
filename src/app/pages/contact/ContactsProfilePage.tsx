import { useNavigate, useParams } from "react-router-dom";
import { toAbsoluteUrl } from "../../../_metronic/helpers";
import { useContext, useEffect, useState } from "react";
import { getRequest } from "../../helpers/Requests";
import { CONTACTS_URL, EMAIL_URL } from "../../helpers/ApiEndpoints";
import { AppContext } from "../../providers/AppProvider";
import { LoadingComponent } from "../../components/common/LoadingComponent";
import { TableComponent } from "../../components/common/TableComponent";
import { stringifyRequestQuery } from "../../helpers/Utils";
import { emailColumns } from "../../columns/emailColumns";
import { ShowEmail } from "../../components/email/ShowEmail";
import { ContactCreateForm } from "../../components/forms/ContactCreateForm";

const ProfileEmail = ({ contact }: any) => {
    return (<>
        <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
            <div className='card-body py-3'>
                <TableComponent queryKey={`contact-email-${contact?.id}`} url={EMAIL_URL} params={stringifyRequestQuery({ email: contact?.email })} columns={emailColumns} refetch={1} />
            </div>
        </div>
        <ShowEmail />
    </>)
}

const ProfileCustomers = ({ contact }: any) => {
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
                <button className='btn btn-sm btn-primary align-self-center' onClick={() => toggleShow(true)}>Add Service</button>
            </div>
            <div className='card-body py-3'>
                {/* <ContactCustomerList filterParams={{ contact_id: contact?.id }} refetch={refetch} /> */}
            </div>
        </div>
        {/* <ContactCustomerCreateForm contactId={contact?.id} show={show} toggleShow={toggleShow} updateList={updateList} /> */}
    </>)
}

const ProfileOverview = ({ contact }: any) => {
    const { setIdForUpdate, setIdForEmail } = useContext(AppContext)
    return (
        <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
            <div className='card-header'>
                <div className='card-title m-0'>
                    <h3 className='fw-bolder m-0'>Profile Details</h3>
                </div>
                <button className='btn btn-sm btn-primary align-self-center' onClick={() => setIdForUpdate(contact?.id)}>Edit Profile</button>
            </div>
            <div className='card-body p-9'>
                <div className='row mb-7'>
                    <label className='col-lg-4 fw-bold text-muted'>Name</label>
                    <div className='col-lg-8'>
                        <span className='fw-bolder fs-6 text-dark'>{contact?.name}</span>
                    </div>
                </div>
                <div className='row mb-7'>
                    <label className='col-lg-4 fw-bold text-muted'>Email</label>
                    <div className='col-lg-8'>
                        <span onClick={() => setIdForEmail(contact?.email)} className='fw-bolder fs-6 text-dark text-hover-primary cursor-pointer'>{contact?.email}</span>
                    </div>
                </div>
                <div className='row mb-7'>
                    <label className='col-lg-4 fw-bold text-muted'>Contact</label>
                    <div className='col-lg-8'>
                        <a href={`tel:${contact?.contact}`} className='fw-bolder fs-6 text-dark text-hover-primary'>{contact?.contact}</a>
                    </div>
                </div>
                <div className='row mb-7'>
                    <label className='col-lg-4 fw-bold text-muted'>Alternative Contact</label>
                    <div className='col-lg-8'>
                        <a href={`tel:${contact?.optional_contact}`} className='fw-bolder fs-6 text-dark text-hover-primary'>{contact?.optional_contact}</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

const ProfileTabs = ({tab, setTab}: any) => {
    const tabs = [
        { label: 'Overview', value: 'overview' },
        { label: 'Customers', value: 'customers' },
        { label: 'Email', value: 'email' },
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

const ProfileHeader = ({ contact }: any) => {
    const { setIdForEmail } = useContext(AppContext)

    return (
        <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
            <div className='me-7 mb-4'>
                <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>
                    <img src={contact?.avatar || toAbsoluteUrl('/media/avatars/blank.png')} alt='Avatar' />
                </div>
            </div>
            <div className='flex-grow-1'>
                <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
                    <div className='d-flex flex-column'>
                        <div className='d-flex align-items-center mb-2'>
                            <span className='text-gray-800 fs-2 fw-bolder me-1'>
                                {contact?.name}
                            </span>
                        </div>
                        <div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>
                            <a href={`tel:${contact?.contact}`} className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2 gap-2'>
                                <i className="fa-solid fa-square-phone"></i> {contact?.contact}
                            </a>
                            <span className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2 gap-2 cursor-pointer' onClick={() => setIdForEmail(contact?.email)}>
                                <i className="fa-solid fa-envelope"></i> {contact?.email}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const ContactsProfilePage = () => {
    const { id } = useParams()
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [contact, setContact] = useState({})
    const [showCreate, setShowCreate] = useState(false)
    const [tab, setTab] = useState("overview")

    useEffect(() => {
        getContact()
    },[id])

    const getContact = () => {
        setLoading(true)
        getRequest(`${CONTACTS_URL}/${id}`).then((response) => {
            if(response){
                setContact(response)
            }else{
                navigate('/contacts')
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
                    <ProfileHeader contact={contact}/>
                    <ProfileTabs tab={tab} setTab={setTab} />
                </div>
            </div>
            {tab === 'overview' && <ProfileOverview contact={contact}/>}
            {tab === 'customers' && <ProfileCustomers contact={contact}/>}
            {tab === 'email' && <ProfileEmail contact={contact} />}
            <ContactCreateForm show={showCreate} toggleShow={toggleShowCreate} updateList={getContact} />
            {loading && <LoadingComponent />}
        </>
    )
}

export default ContactsProfilePage;