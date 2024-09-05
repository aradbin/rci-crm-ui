/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react'
import { toAbsoluteUrl } from '../../../_metronic/helpers'
import { CHATS_UNIPILE_URL } from '../../helpers/ApiEndpoints'
import { QueryInfiniteUnipile } from '../../helpers/Queries'
import { ChatInner } from './ChatInner'
import { formatDate, getSettingsFromUserSettings } from '../../helpers/Utils'
import { LoadingComponent } from '../common/LoadingComponent'
import { useAuth } from '../../modules/auth'

const ChatBox = () => {
  const { currentUser } = useAuth()
  const [filter, setFilter] = useState('')
  const [selectedConversation, setSelectedConversation]: any = useState()

  const getWhatsAppAccount = () => {
    return getSettingsFromUserSettings(currentUser?.userSettings, 'whatsapp').unipile_account_id
  }

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = QueryInfiniteUnipile('all-whatsapp', `${CHATS_UNIPILE_URL}?account_id=${getWhatsAppAccount()}`)

  return (
    <div className='d-flex flex-column flex-lg-row'>
      <div className='flex-column flex-lg-row-auto w-100 w-lg-300px w-xl-400px mb-10 mb-lg-0'>
        <div className='card'>
          <div className='card-header p-4' id='kt_chat_contacts_header'>
            <form className='w-100 position-relative' autoComplete='off'>
              <span className='fa fa-search fs-6 text-lg-1 text-gray-500 position-absolute top-50 ms-5 translate-middle-y'></span>
              <input
                type='text'
                className='form-control form-control-solid px-15'
                name='search'
                placeholder='Search'
                onChange={(e) => setFilter(e.target.value)}
              />
            </form>
          </div>

          <div className='card-body px-5 pt-2' id='kt_chat_contacts_body'>
            {/* <button className='btn btn-primary btn-sm w-100 mb-2' type='button' onClick={() => setShowCreateWhatsApp(true)}>New Chat</button> */}
            <div
              className='scroll-y me-n5 pe-1'
              data-kt-scroll='true'
              data-kt-scroll-activate='{default: false, lg: true}'
              data-kt-scroll-max-height='auto'
              data-kt-scroll-dependencies='#kt_header, #kt_toolbar, #kt_footer, #kt_chat_contacts_header'
              data-kt-scroll-wrappers='#kt_content, #kt_chat_contacts_body'
              data-kt-scroll-offset='0px'
              style={{ height: 'calc(100vh - 270px)' }}
            >
              {data?.pages?.map((page: any, index: number) => (
                <div key={index}>
                  {page?.items?.map((item: any) => {
                    if(!filter || (item?.provider_id?.toLowerCase()?.includes(filter?.toLowerCase()) || item?.name?.toLowerCase()?.includes(filter?.toLowerCase()))){
                      return (
                        <div className={`d-flex flex-stack px-5 py-3 cursor-pointer rounded ${selectedConversation?.id === item?.id ? 'bg-success-subtle' : ''}`} key={item?.id} onClick={() => setSelectedConversation(item)}>
                          <div className='d-flex align-items-center'>
                            <div className='symbol symbol-40px symbol-circle'>
                              <img alt='Avatar' src={item?.customer?.avatar || toAbsoluteUrl('/media/avatars/blank.png')} />
                            </div>
                            <div className='ms-5'>
                              <span className='fs-5 fw-bolder text-gray-900 text-hover-primary mb-2'>
                                {item?.name || item?.provider_id?.split('@')[0]}
                              </span>
                              {item?.name && <div className='fw-bold text-gray-400'>{item?.provider_id?.split('@')[0]}</div>}
                            </div>
                          </div>
                          <div className='d-flex flex-column align-items-end ms-2'>
                            <span className='text-muted fs-7 mb-1'>{item?.timestamp ? formatDate(item?.timestamp) : formatDate(new Date())}</span>
                          </div>
                        </div>
                      )
                    }
                  })}
                </div>
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

          {!data?.pages?.length && <LoadingComponent />}
        </div>
      </div>

      <div className='flex-lg-row-fluid ms-lg-7 ms-xl-10'>
        {selectedConversation && <ChatInner conversation={selectedConversation} />}
      </div>
    </div>
  )
}

export {ChatBox}
