/* eslint-disable jsx-a11y/anchor-is-valid */
import { Fragment, useContext, useEffect, useRef, useState } from 'react'
import { createRequestUnipile, updateRequestUnipile } from '../../helpers/Requests'
import { CHATS_UNIPILE_URL } from '../../helpers/ApiEndpoints'
import { formatTime, isUrl } from '../../helpers/Utils'
import ChatAttachment from './ChatAttachment'
import { LoadingComponent } from '../common/LoadingComponent'
import { Dropdown, Modal } from 'react-bootstrap'
import { QueryInfiniteUnipile } from '../../helpers/Queries'
import { useQueryClient } from 'react-query'
import { AppContext } from '../../providers/AppProvider'
import { AvatarComponent } from '../common/AvatarComponent'

const ChatInner = ({conversation}: any) => {
  const fileInputRef = useRef<any>(null)
  const [message, setMessage] = useState<string>('')
  const [files, setFiles] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const { setTitleForCreateTask } = useContext(AppContext)

  const { data, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = QueryInfiniteUnipile(`whatsapp-${conversation?.id}`, `${CHATS_UNIPILE_URL}/${conversation?.id}/messages`, { limit: 250 })

  const queryClient = useQueryClient()

  useEffect(() => {
    if(data?.pages[0]?.items[0]?.account_id && conversation?.unread === 1){
      const payload = {
        action: 'setReadStatus',
        value: true
      }
      updateRequestUnipile(`${CHATS_UNIPILE_URL}/${conversation?.id}`, JSON.stringify(payload)).then((response) => {
        queryClient.invalidateQueries({ queryKey: [`all-whatsapp-${data?.pages[0]?.items[0]?.account_id}`] })
      }).catch((error) => {
        console.log(error)
      })
    }
  }, [data])

  const sendMessage = () => {
    if(!files && message === ''){
      return
    }
    setLoading(true)
    const payload = new FormData()
    if(message){
      payload.append('text', message)
    }
    if(files && Object.keys(files).length > 0){
      Object.keys(files)?.forEach((key: any) => {
        payload.append('attachments', files[key])
      })
    }
    createRequestUnipile(`${CHATS_UNIPILE_URL}/${conversation?.id}/messages`, payload).then((response) => {
      refetch()
      setMessage('')
      setFiles(null)
    }).catch((error) => {
      console.log(error)
    }).finally(() => {
      setLoading(false)
    })
  }

  const onEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault()
      sendMessage()
    }
  }

  const handleClick = () => {
    fileInputRef?.current?.click(); 
  }

  const createTask = (item: any) => {
    if(item?.text){
      setTitleForCreateTask(item?.text)
    }
  }

  function renderFile(file: any) {
    switch (true) {
      case file.type.includes('image'):
        return <img src={URL.createObjectURL(file)} style={{ width: '150px', height: '100%' }} alt={file.name} />;
      case file.type.includes('video'):
        return <video src={URL.createObjectURL(file)} style={{ width: '150px', height: '100%' }} controls />;
      case file.type.includes('audio'):
        return <audio src={URL.createObjectURL(file)} style={{ width: '150px', height: '100%' }} controls />;
      case file.type.includes('pdf'):
        return <iframe src={URL.createObjectURL(file)} style={{ width: '150px', height: '100%' }} title="Attachment" />;
      case file.type.includes('text'):
        return <iframe src={URL.createObjectURL(file)} style={{ width: '150px', height: '100%' }} title="Attachment" />;
      default:
        return <p style={{ width: '150px', height: '100%', textAlign: 'center', padding: '10px', paddingTop: '50%', wordBreak: 'break-all' }}>{file.name}</p>;
    }
  }

  return (<>
    <div className='card' id='kt_chat_whatsapp'>
      <div className='card-header px-5' id='kt_chat_whatsapp_header'>
        <div className='d-flex align-items-center'>
          <AvatarComponent avatar={conversation?.customer?.avatar} name={conversation?.name || conversation?.provider_id?.split('@')[0]} style='circle' size='45' />
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
          {data?.pages?.map((page: any, index: number) => (
            <Fragment key={`${index}-${conversation?.id}`}>
              {page?.items?.map((item: any, index: number) => {
                const state = item?.is_event === 1 ? 'warning' : item?.is_sender === 1 ? 'success' : 'info'
                const contentClass = `d-flex justify-content-${item?.is_event === 1 ? 'center' : item?.is_sender === 1 ? 'end' : 'start'} ${item?.is_event === 1 ? 'my-4' : 'mb-1'}`
                return (
                  <div
                    key={`${index}-${conversation?.id}`}
                    className={`${contentClass} flex-column align-items align-items-${item.is_sender === 1 ? 'end' : 'start'}`}
                  >
                    {item?.edited ? <span className='fs-9 text-muted'>Edited</span> : <></>}
                    <div
                      className={`px-3 py-2 rounded bg-light-${state} text-dark fw-bold mw-lg-400px dropdown-on-hover`}
                      data-kt-element='message-text'
                      style={{ overflowWrap: 'anywhere' }}
                    >
                      {item?.attachments && item?.attachments?.map((attachment: any, index: number) =>
                        <ChatAttachment key={`${index}-${attachment.id}`} message={item?.id} attachment={attachment} />
                      )}
                      {item?.attachments?.length > 0 && item?.text && <div className="separator border-2 my-1"></div>}
                      <div className='d-flex gap-2 align-items-end justify-content-between'>
                        {item?.text ?
                          <p className={`text-wrap p-0 pb-1 m-0 ${item?.is_event === 1 ? 'text-center' : ''}`}>
                            {isUrl(item?.text) ?
                              <a href={item?.text?.startsWith('http') ? item?.text : 'https://' + item?.text} target='_blank' rel="noreferrer" className='text-primary'>
                                {item?.text}
                              </a>
                            :
                              item?.text
                            }
                          </p>
                        :
                          <p className='p-0 m-0'>&nbsp;</p>
                        }
                        {item?.is_event === 0 && <p className='d-flex p-0 m-0 fs-8 fw-normal text-right text-nowrap'>
                          {item?.timestamp && <span className='text-muted'>{formatTime(item?.timestamp)}</span>}
                          {item?.is_sender === 1 &&
                            <span className='ms-1'>
                              {item?.seen === 1 ?
                                <i className="bi bi-check-all text-success" />
                              :
                                item?.delivered === 1 ?
                                  <i className="bi bi-check-all" />
                                :
                                  <i className="bi bi-check" />
                              }
                            </span>
                          }
                        </p>}
                        {item?.text && <Dropdown>
                          <Dropdown.Toggle variant="link" id="dropdown-basic" className="dropdown-toggle-no-caret p-0 m-0" style={{ width: '7px' }}>
                            <i className="fa-solid fa-ellipsis-vertical pb-1 dropdown-icon"></i>
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item href="#" onClick={(e) => { e.preventDefault(); createTask(item) }}>Create Task</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>}
                      </div>
                    </div>
                  </div>
                )
              })}
            </Fragment>
          ))}
          <div className="d-flex justify-content-center my-2">
            {hasNextPage && <button className="btn btn-sm btn-outline btn-outline-primary" onClick={() => fetchNextPage()}>
              {isFetchingNextPage ?
                <span>Loading {' '} <span className='spinner-border spinner-border-sm align-middle ms-2'></span></span>
              : 
                'Load More'
              }
            </button>}
          </div>
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
          className='btn btn-icon btn-sm btn-secondary ms-2'
          type='button'
          data-kt-element='send'
          onClick={handleClick}
        >
          <i className="fa-solid fa-file-arrow-up" />
        </button>
        <input type='file' multiple ref={fileInputRef} onChange={(e) => {setFiles(e.target.files)}} style={{ display: 'none' }} />
        <button
          className='btn btn-primary btn-sm ms-2'
          type='button'
          data-kt-element='send'
          onClick={sendMessage}
        >
          {loading ? (
            <span className='spinner-border spinner-border-sm align-middle'></span>
          ) : (
              <span>Send</span>
          )}
        </button>
      </div>
      {!data?.pages?.length && isFetching && <LoadingComponent />}
    </div>

    <Modal className="fade" size='lg' aria-hidden='true' show={files} centered animation>
      <div className="modal-content">
        <div className="modal-body scroll-y mx-2 mx-xl-2 my-2">
          <div className='d-flex flex-column'>
            <div className='d-flex flex-row gap-2'>
              {files && Object.values(files).map((file: any, index: number) => (
                <div key={index} className='border me-4'>
                  {renderFile(file)}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-sm btn-primary w-125px me-3" disabled={loading} onClick={sendMessage}>
              {loading ? (
                  <span>
                      Please wait {' '}
                      <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
              ) : (
                  <span>Send</span>
              )}
          </button>
          <button type="button" className='btn btn-sm btn-outline btn-light w-125px' aria-disabled={loading} onClick={() => setFiles(null)}>
              Cancel
          </button>
        </div>
      </div>
    </Modal>
  </>)
}

export {ChatInner}
