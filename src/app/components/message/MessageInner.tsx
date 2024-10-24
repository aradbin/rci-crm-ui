/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useContext, useEffect, useState} from 'react'
import clsx from 'clsx'
import { getRequest } from '../../helpers/Requests'
import { MESSAGES_URL } from '../../helpers/ApiEndpoints'
import { useAuth } from '../../modules/auth'
import { formatDateTime } from '../../helpers/Utils'
import { SocketContext } from '../../providers/SocketProvider'
import { AvatarComponent } from '../common/AvatarComponent'

const MessageInner = ({selectedUser, setSelectedUser}: any) => {
  const { currentUser } = useAuth()
  const { socket, messages, setMessages } = useContext(SocketContext)

  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    if(selectedUser?.conversation_id){
      getRequest(`${MESSAGES_URL}/${selectedUser?.conversation_id}`).then((response) => {
        setMessages(response)
      })
    }
  },[selectedUser])

  const sendMessage = () => {
    if(socket){
      const payload: any = { sender: currentUser?.id, receiver: selectedUser?.user?.id, message }
      if(selectedUser?.conversation_id){
        payload.conversation_id = selectedUser?.conversation_id
      }
      socket.emit('message', payload, (response: any) => {
        setMessages(prevMessages => {
          const currentMessages = [...prevMessages]
          currentMessages.unshift(response)
          return currentMessages
        })
        setMessage('')
      })
    }
  }

  const onEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (<>
    <div className='card' id='kt_chat_messenger'>
      <div className='card-header px-5' id='kt_chat_messenger_header'>
        <div className='d-flex align-items-center'>
          <AvatarComponent avatar={selectedUser?.user?.avatar} name={selectedUser?.user?.name} style='circle' size="45" />
          <div className='ms-5'>
            <a href='#' className='fs-5 fw-bolder text-gray-900 text-hover-primary mb-2'>
              {selectedUser?.user?.name}
            </a>
            <div className='fw-bold text-gray-400'>{selectedUser?.user?.email}</div>
          </div>
        </div>
        <div className='card-toolbar'>
            <div className='me-n3'>
                <button className='btn btn-sm btn-icon btn-active-light-primary' onClick={() => setSelectedUser({
                    user: null,
                    conversation_id: null
                })}>
                    <i className="fa fa-times fs-2"></i>
                </button>
            </div>
        </div>
      </div>

      <div
        className='card-body p-5 pb-0'
        id='kt_chat_messenger_body'
      >
        <div
          className='scroll-y me-n5 pe-5 d-flex flex-column-reverse'
          data-kt-element='messages'
          data-kt-scroll='true'
          data-kt-scroll-activate='{default: false, lg: true}'
          data-kt-scroll-max-height='auto'
          data-kt-scroll-dependencies='#kt_header, #kt_app_header, #kt_app_toolbar, #kt_toolbar, #kt_footer, #kt_app_footer, #kt_chat_messenger_header, #kt_chat_messenger_footer'
          data-kt-scroll-wrappers='#kt_content, #kt_app_content, #kt_chat_messenger_body'
          data-kt-scroll-offset='5px'
          style={{ height: 'calc(100vh - 160px)' }}
        >
          {messages?.map((item: any, index: number) => {
            const state = item?.sent_by === currentUser?.id ? 'primary' : 'info'
            const contentClass = `d-flex justify-content-${item?.sent_by === currentUser?.id ? 'end' : 'start'} mb-10`
            return (
              <div
                key={index}
                className={clsx('d-flex', contentClass, 'mb-10')}
              >
                <div
                  className={clsx('d-flex flex-column align-items', `align-items-${item?.sent_by === currentUser?.id ? 'end' : 'start'}`
                  )}
                >
                  <div className='d-flex align-items-center mb-2'>
                    {item?.sent_by === currentUser?.id ? (
                      <>
                        <div className='me-3'>
                          <span className='text-muted fs-7 mb-1'>{formatDateTime(item.created_at)}</span>
                          <a href='#' className='fs-5 fw-bolder text-gray-900 text-hover-primary ms-1'>
                            {currentUser?.name}
                          </a>
                        </div>
                        <AvatarComponent avatar={currentUser?.avatar} name={currentUser?.name} style='circle' size="35" />
                      </>
                    ) : (
                      <>
                        <AvatarComponent avatar={selectedUser?.user?.avatar} name={selectedUser?.user?.name} style='circle' size="35" />
                        <div className='ms-3'>
                          <a href='#' className='fs-5 fw-bolder text-gray-900 text-hover-primary me-1'>
                            {selectedUser?.user?.name}
                          </a>
                          <span className='text-muted fs-7 mb-1'>{formatDateTime(item?.created_at)}</span>
                        </div>
                      </>
                    )}
                  </div>

                  <div
                    className={clsx(
                      'p-5 rounded',
                      `bg-light-${state}`,
                      'text-dark fw-bold mw-lg-400px',
                      `text-${item?.sent_by === currentUser?.id ? 'end' : 'start'}`
                    )}
                    data-kt-element='message-text'
                    dangerouslySetInnerHTML={{__html: item?.message}}
                  ></div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div
        className='card-footer d-flex p-5'
        id='kt_chat_messenger_footer'
      >
        <textarea
          className='form-control form-control-sm'
          rows={1}
          data-kt-element='input'
          placeholder='Type a message'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={onEnterPress}
        ></textarea>

        <button
          className='btn btn-primary btn-sm ms-2'
          type='button'
          data-kt-element='send'
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  </>)
}

export {MessageInner}
