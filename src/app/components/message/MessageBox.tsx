/* eslint-disable jsx-a11y/anchor-is-valid */
import { useContext, useEffect, useState } from 'react'
import { toAbsoluteUrl } from '../../../_metronic/helpers'
import { Dropdown1 } from '../../../_metronic/partials'
import { USERS_URL, WHATSAPP_URL } from '../../helpers/ApiEndpoints'
import { Query } from '../../helpers/Queries'
import { formatDateTime } from '../../helpers/Utils'
import { AppContext } from '../../providers/AppProvider'
import { getRequest } from '../../helpers/Requests'

const MessageBox = () => {
  const { setShowCreateWhatsApp } = useContext(AppContext)

  const [conversations, setConversations] = useState([])
  const [selectedConversation, setSelectedConversation]: any = useState()

  const conversationsQuery = Query('whatsapp-conversations', WHATSAPP_URL, 'pageSize=all&sortBy=updated_at&orderBy=desc')

  useEffect(() => {
    if(JSON.stringify(conversationsQuery?.data) !== JSON.stringify(conversations)){
        setConversations(conversationsQuery?.data)
    }
  }, [conversationsQuery]);

  return (
        <>
            <div className='card-header pe-5' id='kt_drawer_chat_messenger_header'>
                <div className='card-title'>Messages</div>
                <div className='card-toolbar'>
                    <div className='btn btn-sm btn-icon btn-active-light-primary' id='kt_drawer_chat_close'>
                        <i className="fa fa-times fs-2"></i>
                    </div>
                </div>
            </div>

            <div className='card-body pt-5' id='kt_chat_contacts_body'>
                <form className='w-100 position-relative mb-2' autoComplete='off'>
                    <span className='fa fa-search fs-6 text-lg-1 text-gray-500 position-absolute top-50 ms-5 translate-middle-y'></span>
                    <input type='text' className='form-control form-control-solid px-15' name='search' placeholder='Search' />
                </form>
                <button className='btn btn-primary btn-sm w-100 mb-2' type='button' onClick={() => setShowCreateWhatsApp(true)}>New Chat</button>
                <div
                    className='scroll-y me-n5 pe-5'
                    data-kt-scroll='true'
                    data-kt-scroll-activate='{default: false, lg: true}'
                    data-kt-scroll-max-height='auto'
                    data-kt-scroll-dependencies='#kt_header, #kt_toolbar, #kt_footer, #kt_chat_contacts_header'
                    data-kt-scroll-wrappers='#kt_content, #kt_chat_contacts_body'
                    data-kt-scroll-offset='0px'
                    style={{ height: 'calc(100vh - 310px)' }}
                >
                    {conversations?.map((item: any) =>
                        <div className='d-flex flex-stack py-2 cursor-pointer' key={item?.id} onClick={() => setSelectedConversation(item)}>
                        <div className='d-flex align-items-center'>
                            <div className='symbol symbol-45px symbol-circle'>
                            <img alt='Avatar' src={item?.customer?.avatar || toAbsoluteUrl('/media/avatars/blank.png')} />
                            </div>
                            <div className='ms-5'>
                            <span className='fs-5 fw-bolder text-gray-900 text-hover-primary mb-2'>
                                {item?.customer?.name || item?.recipient_number}
                            </span>
                            {item?.customer?.name && <div className='fw-bold text-gray-400'>{item?.recipient_number}</div>}
                            </div>
                        </div>
                        <div className='d-flex flex-column align-items-end ms-2'>
                            <span className='text-muted fs-7 mb-1'>{item?.updated_at ? formatDateTime(item?.updated_at) : formatDateTime(item?.created_at)}</span>
                        </div>
                        </div>
                    )}              
                </div>
            </div>
        </>
  )
}

export {MessageBox}
