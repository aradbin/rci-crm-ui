/* eslint-disable jsx-a11y/anchor-is-valid */
import { useContext, useEffect, useState } from 'react'
import { CHAT_ATTENDEES_UNIPILE_URL, CHATS_UNIPILE_URL } from '../../helpers/ApiEndpoints'
import { QueryInfiniteUnipile } from '../../helpers/Queries'
import { ChatInner } from './ChatInner'
import { formatDate, getSettingsFromUserSettings } from '../../helpers/Utils'
import { LoadingComponent } from '../common/LoadingComponent'
import { useAuth } from '../../modules/auth'
import { AvatarComponent } from '../common/AvatarComponent'
import { AppContext } from '../../providers/AppProvider'

const ChatBox = () => {
  const { currentUser } = useAuth()
  const [filter, setFilter] = useState('')
  const [account, setAccount] = useState(getSettingsFromUserSettings(currentUser?.userSettings, 'whatsapp')[0]?.unipile_account_id)
  const [conversations, setConversations] = useState<any>([])
  const [selectedConversation, setSelectedConversation]: any = useState()
  const { customers, contacts } = useContext(AppContext)

  let { data, fetchNextPage, hasNextPage, isFetchingNextPage } = QueryInfiniteUnipile(`all-whatsapp-${account}`, CHATS_UNIPILE_URL, { account_id: account, limit: 250 }, account ? true : false)

  const { data: attendees, fetchNextPage: fetchNextPageAttendees, hasNextPage: hasNextPageAttendees } = QueryInfiniteUnipile(`all-attendees-${account}`, CHAT_ATTENDEES_UNIPILE_URL, { account_id: account, limit: 250 }, account ? true : false)

  useEffect(() => {
    if(hasNextPageAttendees){
      fetchNextPageAttendees()
    }
    if(data?.pages && data?.pages.length > 0 && attendees?.pages && attendees?.pages.length > 0){
      const allAttendees: any = []
      attendees?.pages?.forEach((page: any) => {
        page?.items?.forEach((item: any) => {
          allAttendees.push(item)            
        });
      })

      const pages: any = []
      data?.pages?.forEach((page: any) => {
        const items: any = []
        page?.items?.forEach((item: any) => {
          const customer = customers?.find((c: any) => c?.contact && item?.provider_id?.includes(c?.contact))
          const contact = contacts?.find((c: any) => c?.contact && item?.provider_id?.includes(c?.contact))
          const attendee = allAttendees.find((a: any) => a?.provider_id === item?.provider_id)
          items.push({
            ...item,
            attendee: attendee,
            customer: customer,
            contact: contact
          })            
        });
        pages.push({
          ...page,
          items: items
        })
      })
      setConversations({
        ...data,
        pages: pages
      })
    }else{
      setConversations(data)
    }
  },[account, attendees, data])

  useEffect(() => {
    setSelectedConversation(null)
  },[account])

  return (
    <div className='d-flex flex-column flex-lg-row'>
      <div className='flex-column flex-lg-row-auto w-100 w-lg-300px w-xl-400px mb-10 mb-lg-0'>
        <div className='card'>
          <div className='card-header gap-2 p-4' id='kt_chat_contacts_header'>
            <select className='form-select' value={account} onChange={(e) => setAccount(e.target.value)}>
              <option value='0'>Select</option>
              {getSettingsFromUserSettings(currentUser?.userSettings, 'whatsapp')?.map((item: any) => (
                <option value={item.unipile_account_id} key={item.unipile_account_id}>{item.label}</option>
              ))}
            </select>
            <form className='w-100 position-relative' autoComplete='off'>
              <span className='fa fa-search fs-6 text-lg-1 text-gray-500 position-absolute top-50 ms-5 translate-middle-y'></span>
              <input
                type='text'
                className='form-control px-15'
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
              style={{ height: 'calc(100vh - 320px)' }}
            >
              {conversations?.pages?.map((page: any, index: number) => (
                <div key={index}>
                  {page?.items?.map((item: any) => {
                    if(item?.provider_id !== 'status@broadcast' && (
                      !filter 
                      || item?.provider_id?.toLowerCase()?.includes(filter?.toLowerCase()) 
                      || item?.name?.toLowerCase()?.includes(filter?.toLowerCase()) 
                      || item?.attendee?.name?.toLowerCase()?.includes(filter?.toLowerCase())
                      || item?.customer?.name?.toLowerCase()?.includes(filter?.toLowerCase())
                      || item?.contact?.name?.toLowerCase()?.includes(filter?.toLowerCase())
                      || item?.customer?.contact?.toLowerCase()?.includes(filter?.toLowerCase())
                      || item?.contact?.contact?.toLowerCase()?.includes(filter?.toLowerCase())
                    )){
                      let name = item?.name
                      if(item?.attendee){
                        name = item?.attendee?.name
                      }
                      if(item?.customer){
                        name = (name && name !== '') ? `${name} (${item?.customer?.name})` : item?.customer?.name
                      }
                      if(item?.contact){
                        name = (name && name !== '') ? `${name} (${item?.contact?.name})` : item?.contact?.name
                      }
                      return (
                        <div className={`d-flex flex-stack pe-5 ps-2 py-3 cursor-pointer rounded ${selectedConversation?.id === item?.id ? 'bg-success-subtle' : ''}`} key={item?.id} onClick={() => setSelectedConversation({...item, name: name})}>
                          <div className='d-flex align-items-center'>
                            <AvatarComponent avatar={item?.customer?.avatar} name={name || item?.provider_id?.split('@')[0]} style='circle' size='40' />
                            <div className='ms-5'>
                              <span className='fs-5 fw-bolder text-gray-900 text-hover-primary mb-2' style={{ wordBreak: 'break-all' }}>
                                {name || item?.provider_id?.split('@')[0]}
                              </span>
                              {name && <div className='fw-bold text-gray-400'>{item?.provider_id?.split('@')[0]}</div>}
                            </div>
                            {item?.unread === 1 &&item?.unread_count > 0 && <span className="badge badge-circle badge-light-success ms-3">{item?.unread_count}</span>}
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

          {account && !data?.pages?.length && <LoadingComponent />}
        </div>
      </div>

      <div className='flex-lg-row-fluid ms-lg-7 ms-xl-10'>
        {selectedConversation && <ChatInner conversation={selectedConversation} />}
      </div>
    </div>
  )
}

export {ChatBox}
