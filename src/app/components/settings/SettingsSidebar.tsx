import React from 'react'
import { settings } from '../../helpers/Variables'

const SettingsSidebar = ({type, setType}: any) => {
  return (
    <div className='flex-column flex-lg-row-auto w-100 w-lg-250px w-xl-300px mb-10 mb-lg-0'>
        <div className='card card-flush'>
            <div className='card-body py-4' id='kt_chat_contacts_body'>
                <div
                    className='scroll-y me-n5 pe-5 h-auto'
                    data-kt-scroll='true'
                    data-kt-scroll-activate='{default: false, lg: true}'
                    data-kt-scroll-max-height='auto'
                    data-kt-scroll-dependencies='#kt_header, #kt_toolbar, #kt_footer, #kt_chat_contacts_header'
                    data-kt-scroll-wrappers='#kt_content, #kt_chat_contacts_body'
                    data-kt-scroll-offset='0px'
                >
                    {settings.map((item, index) => {
                        return (
                            <React.Fragment key={index}>
                                <div className='d-flex align-items-center py-4' onClick={() => setType(item)}>
                                    <div>
                                        <span><i className={`fa-solid fa-screwdriver-wrench fs-4 pt-1 ${type.value===item.value ? 'text-primary' : 'text-gray-900'}`}></i></span>
                                    </div>
                                    <div className='ms-5'>
                                        <span className={`fs-4 fw-bolder text-hover-primary mb-2 ${type.value===item.value ? 'text-primary' : 'text-gray-900'}`}>
                                        {item.label}
                                        </span>
                                    </div>
                                </div>
                                {index !== settings.length - 1 && <div className='separator separator-dashed'></div>}
                            </React.Fragment>
                        )
                    })}
                </div>
            </div>
        </div>
    </div>
  )
}

export {SettingsSidebar}
