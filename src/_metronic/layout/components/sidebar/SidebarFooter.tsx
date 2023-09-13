/* eslint-disable react/jsx-no-target-blank */
import { Link } from 'react-router-dom'
import {KTIcon} from '../../../helpers'

const SidebarFooter = () => {
  return (
    <div className='app-sidebar-footer flex-column-auto pt-2 pb-6 px-6' id='kt_app_sidebar_footer'>
      <Link
        to="/settings"
        className='btn btn-flex flex-center btn-custom btn-primary overflow-hidden text-nowrap px-0 h-40px w-100'
        title='Metronic Docs & Components'
      >
        <span className='btn-label'>Settings</span>
        <KTIcon iconName='document' className='btn-icon fs-2 m-0' />
      </Link>
    </div>
  )
}

export {SidebarFooter}
