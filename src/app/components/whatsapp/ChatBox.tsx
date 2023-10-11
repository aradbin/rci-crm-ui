/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react'
import { toAbsoluteUrl } from '../../../_metronic/helpers'
import { Dropdown1 } from '../../../_metronic/partials'
import { USERS_URL } from '../../helpers/ApiEndpoints'
import { Query } from '../../helpers/Queries'
import { ChatInner } from './ChatInner'

const users = [
  { id: 1 },
  { id: 1 },
  { id: 1 },
  { id: 1 },
  { id: 1 },
  { id: 1 },
  { id: 1 },
  { id: 1 },
  { id: 1 },
  { id: 1 },
  { id: 1 },
  { id: 1 },
  { id: 1 },
  { id: 1 },
  { id: 1 },
  { id: 1 },
  { id: 1 },
  { id: 1 },
  { id: 1 },
  { id: 1 },
]
const ChatBox = () => {
//   const usersQuery = Query('all-users', USERS_URL, 'pageSize=all')

//   const [users, setUsers] = useState([])

//   useEffect(() => {
//     if(JSON.stringify(usersQuery?.data) !== JSON.stringify(users)){
//         setUsers(usersQuery?.data)
//     }
// }, [usersQuery]);

  return (
    <div className='d-flex flex-column flex-lg-row'>
      <div className='flex-column flex-lg-row-auto w-100 w-lg-300px w-xl-400px mb-10 mb-lg-0'>
        <div className='card card-flush'>
          <div className='card-header pt-7' id='kt_chat_contacts_header'>
            <form className='w-100 position-relative' autoComplete='off'>
              <span className='fa fa-search fs-6 text-lg-1 text-gray-500 position-absolute top-50 ms-5 translate-middle-y'></span>
              <input
                type='text'
                className='form-control form-control-solid px-15'
                name='search'
                placeholder='Search'
              />
            </form>
          </div>

          <div className='card-body pt-5' id='kt_chat_contacts_body'>
            <div
              className='scroll-y me-n5 pe-5'
              data-kt-scroll='true'
              data-kt-scroll-activate='{default: false, lg: true}'
              data-kt-scroll-max-height='auto'
              data-kt-scroll-dependencies='#kt_header, #kt_toolbar, #kt_footer, #kt_chat_contacts_header'
              data-kt-scroll-wrappers='#kt_content, #kt_chat_contacts_body'
              data-kt-scroll-offset='0px'
              style={{ height: 'calc(100vh - 344px)' }}
            >
              {users?.map((item,index) =>
                <div className='d-flex flex-stack py-4' key={index}>
                  <div className='d-flex align-items-center'>
                    <div className='symbol symbol-45px symbol-circle'>
                      <img alt='Pic' src={toAbsoluteUrl('/media/avatars/300-1.jpg')} />
                    </div>

                    <div className='ms-5'>
                      <a href='#' className='fs-5 fw-bolder text-gray-900 text-hover-primary mb-2'>
                        Max Smith
                      </a>
                      <div className='fw-bold text-gray-400'>+88012343546547</div>
                    </div>
                  </div>

                  <div className='d-flex flex-column align-items-end ms-2'>
                    <span className='text-muted fs-7 mb-1'>20 hrs</span>
                  </div>
                </div>
              )}              
            </div>
          </div>
        </div>
      </div>

      <div className='flex-lg-row-fluid ms-lg-7 ms-xl-10'>
        <div className='card' id='kt_chat_messenger'>
          <div className='card-header px-5' id='kt_chat_messenger_header'>
            <div className='d-flex align-items-center'>
              <div className='symbol symbol-45px symbol-circle'>
                <img alt='Pic' src={toAbsoluteUrl('/media/avatars/300-1.jpg')} />
              </div>

              <div className='ms-5'>
                <a href='#' className='fs-5 fw-bolder text-gray-900 text-hover-primary mb-2'>
                  Max Smith
                </a>
                <div className='fw-bold text-gray-400'>+88012343546547</div>
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
          <ChatInner />
        </div>
      </div>
    </div>
  )
}

export {ChatBox}
