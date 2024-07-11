/* eslint-disable jsx-a11y/anchor-is-valid */
import {useContext, useEffect, useState} from 'react'
import clsx from 'clsx'
import { toAbsoluteUrl } from '../../../_metronic/helpers'
import { createRequest, getRequest } from '../../helpers/Requests'
import { WHATSAPP_URL } from '../../helpers/ApiEndpoints'
import { useAuth } from '../../modules/auth'
import { formatDateTime, getSettingsFromUserSettings } from '../../helpers/Utils'
import { SocketContext } from '../../providers/SocketProvider'
import ChatImage from './ChatImage'
import { LoadingComponent } from '../common/LoadingComponent'

const ChatInner = ({conversation}: any) => {
  const { currentUser } = useAuth()
  const { socketCommunication, whatsapp, setWhatsApp } = useContext(SocketContext)

  const [message, setMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if(conversation?.id){
      getWhatsApp(false)
    }
  },[conversation])

  const getWhatsApp = (keep = true) => {
    setLoading(true)
    if(!keep){
      setWhatsApp([])
    }
    getRequest(`${WHATSAPP_URL}/${conversation?.id}`).then((response) => {
      setWhatsApp(response?.items || [])
    }).finally(() => {
      setLoading(false)
    })
  }

  const sendMessage = () => {
    if(socketCommunication){
      const payload: any = {
        conversation_id: conversation?.id,
        sender_number: getSettingsFromUserSettings(currentUser?.userSettings, 'whatsapp').phone_number,
        text: message
      }
      socketCommunication.emit('whatsapp', payload, (response: any) => {
        setWhatsApp(prevMessages => {
          const currentMessages = [...prevMessages]
          currentMessages.unshift({
            is_sender: 1,
            text: message,
          })
          return currentMessages
        })
        setMessage('')
      })
    }else{
      setLoading(true)
      createRequest(WHATSAPP_URL, {
        conversation_id: conversation?.id || null,
        text: message
      }).then((response) => {
        setWhatsApp(prevMessages => {
          const currentMessages = [...prevMessages]
          currentMessages.unshift({
            is_sender: 1,
            text: message,
          })
          return currentMessages
        })
        setMessage('')
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        setLoading(false)
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
              {conversation?.name || conversation?.provider_id?.split('@')[0]}
            </a>
            {conversation?.name && <div className='fw-bold text-gray-400'>{conversation?.provider_id?.split('@')[0]}</div>}
          </div>
        </div>
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
            const state = item?.is_sender === 1 ? 'primary' : 'info'
            const contentClass = `d-flex justify-content-${item?.is_sender === 1 ? 'end' : 'start'} mb-1`
            return (
              <div
                key={index}
                className={clsx('d-flex', contentClass, 'mb-1')}
              >
                <div
                  className={clsx('d-flex flex-column align-items', `align-items-${item.is_sender === 1 ? 'end' : 'start'}`
                  )}
                >
                  {item?.text &&
                    <div className={clsx(
                        'px-3 py-2 rounded',
                        `bg-light-${state}`,
                        'text-dark fw-bold mw-lg-400px',
                        `text-${item?.is_sender === 1 ? 'end' : 'start'}`
                      )}
                      data-kt-element='message-text'
                      dangerouslySetInnerHTML={{__html: item?.text}}
                    />
                  }
                  {item?.attachments && item?.attachments?.map((attachment: any, index: number) =>
                    <ChatImage key={index} id={item?.id} attachment={attachment} />
                  )}
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
      {loading && <LoadingComponent />}
    </div>
  </>)
}

export {ChatInner}
