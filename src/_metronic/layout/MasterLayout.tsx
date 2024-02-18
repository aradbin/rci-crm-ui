import {useContext, useEffect} from 'react'
import {Outlet, useLocation} from 'react-router-dom'
import {HeaderWrapper} from './components/header'
import {ScrollTop} from './components/scroll-top'
import {Content} from './components/content'
import {FooterWrapper} from './components/footer'
import {Sidebar} from './components/sidebar'
import {PageDataProvider} from './core'
import {reInitMenu} from '../helpers'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import { ShortcutComponent } from '../../app/components/common/ShortcutComponent'
import { EmailCreateForm } from '../../app/components/forms/EmailCreateForm'
import { TaskCreateForm } from '../../app/components/forms/TaskCreateForm'
import { WhatsAppCreateForm } from '../../app/components/forms/WhatsAppCreateForm'
import { MessagePage } from '../../app/pages/message/MessagePage'
import { AppContext } from '../../app/providers/AppProvider'
import { CUSTOMERS_URL, SETTINGS_URL, USERS_URL } from '../../app/helpers/ApiEndpoints'
import { Query } from '../../app/helpers/Queries'

const MasterLayout = () => {
  const location = useLocation()
  const { users, setUsers, customers, setCustomers, settings, setSettings } = useContext(AppContext)
  
  const usersQuery = Query('all-users', USERS_URL, 'pageSize=all')
  const customersQuery = Query('all-customers', CUSTOMERS_URL, 'pageSize=all')
  const settingsQuery = Query('all-settings', SETTINGS_URL, 'pageSize=all')
  
  useEffect(() => {
    reInitMenu()
  }, [location.key])

  useEffect(() => {
    if(JSON.stringify(usersQuery?.data) !== JSON.stringify(users)){
      setUsers(usersQuery?.data)
    }
  }, [usersQuery]);
  
  useEffect(() => {
    if(JSON.stringify(customersQuery?.data) !== JSON.stringify(customers)){
        setCustomers(customersQuery?.data)
    }
  }, [customersQuery]);

  useEffect(() => {
    if(JSON.stringify(settingsQuery?.data) !== JSON.stringify(settings)){
      setSettings(settingsQuery?.data)
    }
  }, [settingsQuery]);

  return (
    <PageDataProvider>
      <div className='d-flex flex-column flex-root app-root' id='kt_app_root'>
        <div className='app-page flex-column flex-column-fluid' id='kt_app_page'>
          <HeaderWrapper />
          <div className='app-wrapper flex-column flex-row-fluid' id='kt_app_wrapper'>
            <Sidebar />
            <div className='app-main flex-column flex-row-fluid' id='kt_app_main'>
              <div className='d-flex flex-column flex-column-fluid'>
                <Content>
                  <Outlet />
                </Content>
              </div>
              <FooterWrapper />
            </div>
          </div>
        </div>
      </div>

      <ShortcutComponent />

      <EmailCreateForm />
      <TaskCreateForm />
      <WhatsAppCreateForm />
      <MessagePage />
      
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

    </PageDataProvider>
  )
}

export {MasterLayout}
