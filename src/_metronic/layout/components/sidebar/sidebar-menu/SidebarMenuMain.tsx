/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import {useIntl} from 'react-intl'
import {KTIcon} from '../../../../helpers'
import {SidebarMenuItemWithSub} from './SidebarMenuItemWithSub'
import {SidebarMenuItem} from './SidebarMenuItem'

const SidebarMenuMain = () => {
  const intl = useIntl()

  return (
    <>
      <SidebarMenuItem to='/dashboard' icon='element-11' iconColor='text-primary' title={intl.formatMessage({id: 'MENU.DASHBOARD'})} fontIcon='bi-app-indicator' />
      <SidebarMenuItem to='/users' icon='profile-user' iconColor='text-success' title='Users' fontIcon='bi-layers' />
      <SidebarMenuItem to='/customers' icon='address-book' iconColor='text-info' title='Customers' fontIcon='bi-layers' />
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Communication</span>
        </div>
      </div>
      <SidebarMenuItem to='/email' icon='messages' iconColor='text-warning' title='Email' fontIcon='bi-layers' />
      <SidebarMenuItem to='/whatsapp' icon='whatsapp' iconColor='text-danger' title='WhatsApp' fontIcon='bi-layers' />
    </>
  )
}

export {SidebarMenuMain}
