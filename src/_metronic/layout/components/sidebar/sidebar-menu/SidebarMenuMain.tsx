/* eslint-disable react/jsx-no-target-blank */
import {useIntl} from 'react-intl'
import {SidebarMenuItem} from './SidebarMenuItem'

const SidebarMenuMain = () => {
  const intl = useIntl()

  return (
    <>
      <SidebarMenuItem to='/dashboard' icon='element-11' iconColor='text-primary' title={intl.formatMessage({id: 'MENU.DASHBOARD'})} fontIcon='bi-app-indicator' />
      <SidebarMenuItem to='/users' icon='profile-user' iconColor='text-danger' title='Users' fontIcon='bi-layers' />
      <SidebarMenuItem to='/customers' icon='address-book' iconColor='text-info' title='Customers' fontIcon='bi-layers' />
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Task</span>
        </div>
      </div>
      <SidebarMenuItem to='/tasks' icon='check-square' iconColor='text-primary' title='All Tasks' fontIcon='bi-layers' />
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Communication</span>
        </div>
      </div>
      <SidebarMenuItem to='/email' icon='messages' iconColor='text-warning' title='Email' fontIcon='bi-layers' />
      <SidebarMenuItem to='/whatsapp' icon='whatsapp' iconColor='text-success' title='WhatsApp' fontIcon='bi-layers' />
    </>
  )
}

export {SidebarMenuMain}
