/* eslint-disable jsx-a11y/anchor-is-valid */
import {useContext, useEffect, useState} from 'react'
import clsx from 'clsx'
import { toAbsoluteUrl } from '../../../_metronic/helpers'
import { getRequest } from '../../helpers/Requests'
import { WHATSAPP_URL } from '../../helpers/ApiEndpoints'
import { useAuth } from '../../modules/auth'
import { formatDateTime, getSettingsFromUserSettings } from '../../helpers/Utils'
import { SocketContext } from '../../providers/SocketProvider'
import ChatImage from './ChatImage'

const ChatInner = ({conversation}: any) => {
  const { currentUser } = useAuth()
  const { socket, whatsapp, setWhatsApp } = useContext(SocketContext)

  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    if(conversation?.id){
      getRequest(`${WHATSAPP_URL}/${conversation?.id}`).then((response) => {
        setWhatsApp(response)
      })
    }
  },[conversation])

  const sendMessage = () => {
    if(socket){
      const payload: any = {
        conversation_id: conversation?.id || null,
        sender_number: getSettingsFromUserSettings(currentUser?.userSettings, 'whatsapp').phone_number,
      }
      socket.emit('whatsapp', payload, (response: any) => {
        setWhatsApp(prevMessages => {
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
    <div className='card' id='kt_chat_whatsapp'>
      <div className='card-header px-5' id='kt_chat_whatsapp_header'>
        <div className='d-flex align-items-center'>
          <div className='symbol symbol-45px symbol-circle'>
            <img alt='Avatar' src={conversation?.customer?.avatar || toAbsoluteUrl('/media/avatars/blank.png')} />
          </div>
          <div className='ms-5'>
            <a href='#' className='fs-5 fw-bolder text-gray-900 text-hover-primary mb-2'>
              {conversation?.customer?.name || conversation?.recipient_id}
            </a>
            {conversation?.customer?.name && <div className='fw-bold text-gray-400'>{conversation?.recipient_id}</div>}
          </div>
        </div>
        {/* <div className='card-toolbar'>
          <div className='me-n3'>
            <button
              className='btn btn-sm btn-icon btn-active-light-primary'
              data-kt-menu-trigger='click'
              data-kt-menu-placement='bottom-end'
              data-kt-menu-flip='top-end'
            >
              <i className='bi bi-three-dots fs-2'></i>
            </button>
            <Dropdown1 />
          </div>
        </div> */}
      </div>

      <div
        className='card-body p-5 pb-0'
        id='kt_chat_whatsapp_body'
      >
        <div
          className='scroll-y me-n5 pe-5 d-flex flex-column-reverse'
          data-kt-element='messages'
          data-kt-scroll='true'
          data-kt-scroll-activate='{default: false, lg: true}'
          data-kt-scroll-max-height='auto'
          data-kt-scroll-dependencies='#kt_header, #kt_app_header, #kt_app_toolbar, #kt_toolbar, #kt_footer, #kt_app_footer, #kt_chat_whatsapp_header, #kt_chat_whatsapp_footer'
          data-kt-scroll-wrappers='#kt_content, #kt_app_content, #kt_chat_whatsapp_body'
          data-kt-scroll-offset='5px'
          style={{ height: 'calc(100vh - 321px)' }}
        >
          {whatsapp?.map((item: any, index: number) => {
            const state = item?.user ? 'primary' : 'info'
            const contentClass = `d-flex justify-content-${item?.user ? 'end' : 'start'} mb-10`
            return (
              <div
                key={index}
                className={clsx('d-flex', contentClass, 'mb-10')}
              >
                <div
                  className={clsx('d-flex flex-column align-items', `align-items-${item.user ? 'end' : 'start'}`
                  )}
                >
                  <div className='d-flex align-items-center mb-2'>
                    {item?.user ? (
                      <>
                        <div className='me-3'>
                          <span className='text-muted fs-7 mb-1'>{formatDateTime(item.created_at)}</span>
                          <a href='#' className='fs-5 fw-bolder text-gray-900 text-hover-primary ms-1'>
                            {item?.user?.name}
                          </a>
                        </div>
                        <div className='symbol  symbol-35px symbol-circle '>
                          <img alt='Avatar' src={item?.user?.avatar || toAbsoluteUrl('/media/avatars/blank.png')} />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className='symbol  symbol-35px symbol-circle '>
                          <img alt='Avatar' src={conversation?.customer?.avatar || toAbsoluteUrl('/media/avatars/blank.png')} />
                        </div>
                        <div className='ms-3'>
                          <span className='fs-5 fw-bolder text-gray-900 text-hover-primary mb-2'>
                            {item?.customer?.name || conversation?.recipient_id}
                          </span>
                          {item?.customer?.name && <div className='fw-bold text-gray-400'>{item?.recipient_id}</div>}
                        </div>
                      </>
                    )}
                  </div>

                  {item?.payload?.body &&
                    <div className={clsx(
                        'p-5 rounded',
                        `bg-light-${state}`,
                        'text-dark fw-bold mw-lg-400px',
                        `text-${item?.user ? 'end' : 'start'}`
                      )}
                      data-kt-element='message-text'
                      dangerouslySetInnerHTML={{__html: item?.payload?.body}}
                    />
                  }
                  {(item?.payload?.hasMedia) &&
                    <ChatImage id={item?.payload?.hasMedia} />
                  }
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div
        className='card-footer d-flex p-5'
        id='kt_chat_whatsapp_footer'
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

export {ChatInner}
