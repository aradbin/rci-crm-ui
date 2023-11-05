import {useEffect} from 'react'
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

const MasterLayout = () => {
  const location = useLocation()
  useEffect(() => {
    reInitMenu()
  }, [location.key])

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
