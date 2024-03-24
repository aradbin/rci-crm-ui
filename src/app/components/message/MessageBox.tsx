/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect } from 'react'
import { toAbsoluteUrl } from '../../../_metronic/helpers'
import { MESSAGES_URL } from '../../helpers/ApiEndpoints'
import { Query } from '../../helpers/Queries'
import { formatDateTime } from '../../helpers/Utils'
import { AppContext } from '../../providers/AppProvider'
import { useAuth } from '../../modules/auth'
import { SocketContext } from '../../providers/SocketProvider'

const MessageBox = ({setSelectedUser}: any) => {
    const { currentUser } = useAuth()
    const { users } = useContext(AppContext)
    const { messages, setMessages } = useContext(SocketContext)

    const messagesQuery = Query('all-messages', MESSAGES_URL, 'pageSize=all')

    useEffect(() => {
        if(JSON.stringify(messagesQuery?.data) !== JSON.stringify(messages)){
            setMessages(messagesQuery?.data)
        }
      }, [messagesQuery]);

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
                    {messages?.length > 0 && <p className='fs-7 fw-semibold text-muted my-2'>Recent</p>}
                    {messages?.map((item: any) =>
                        <div className='d-flex flex-stack py-2 cursor-pointer' key={item?.id} onClick={() => setSelectedUser({
                            user: item.user_one !== currentUser?.id ? item.userOne : item.userTwo,
                            conversation_id: item.id
                        })}>
                            <div className='d-flex align-items-center'>
                                <div className='symbol symbol-45px symbol-circle'>
                                    <img alt='Avatar' src={item.user_one !== currentUser?.id ? (item?.userOne?.avatar || toAbsoluteUrl('/media/avatars/blank.png')) : (item?.userTwo?.avatar || toAbsoluteUrl('/media/avatars/blank.png'))} />
                                </div>
                                <div className='ms-5'>
                                    <span className='fs-5 fw-bolder text-gray-900 text-hover-primary mb-2'>
                                    {item.user_one !== currentUser?.id ? item?.userOne?.name : item?.userTwo?.name}
                                    </span>
                                    <div className='fw-bold text-gray-400'>{item.user_one !== currentUser?.id ? item.userOne?.email : item.userTwo?.email}</div>
                                </div>
                            </div>
                            <div className='d-flex flex-column align-items-end ms-2'>
                                <span className='text-muted fs-7 mb-1'>{item?.updated_at ? formatDateTime(item?.updated_at) : formatDateTime(item?.created_at)}</span>
                            </div>
                        </div>
                    )}
                    <p className='fs-7 fw-semibold text-muted my-2'>All Users</p>
                    {users?.map((item: any) =>
                        <React.Fragment key={item?.id}>
                        {item?.id !== currentUser?.id && <div className='d-flex flex-stack my-2 cursor-pointer' onClick={() => setSelectedUser({
                            user: item,
                            conversation_id: null
                        })}>
                            <div className='d-flex align-items-center'>
                                <div className='symbol symbol-45px symbol-circle'>
                                    <img alt='Avatar' src={item?.avatar || toAbsoluteUrl('/media/avatars/blank.png')} />
                                </div>
                                <div className='ms-5'>
                                    <span className='fs-5 fw-bolder text-gray-900 text-hover-primary mb-2'>
                                        {item?.name}
                                    </span>
                                    <div className='fw-bold text-gray-400'>{item?.email}</div>
                                </div>
                            </div>
                        </div>}
                        </React.Fragment>
                    )}              
                </div>
            </div>
        </>
    )
}

export {MessageBox}
