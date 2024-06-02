import {lazy, FC, Suspense} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import {WithChildren} from '../../_metronic/helpers'

const PrivateRoutes = () => {
  const UsersPage = lazy(() => import('../pages/user/UsersPage'))
  const UsersProfilePage = lazy(() => import('../pages/user/UsersProfilePage'))
  const CustomersPage = lazy(() => import('../pages/customer/CustomersPage'))
  const CustomersProfilePage = lazy(() => import('../pages/customer/CustomersProfilePage'))
  const ContactsPage = lazy(() => import('../pages/contact/ContactsPage'))
  const ContactsProfilePage = lazy(() => import('../pages/contact/ContactsProfilePage'))
  const TasksPage = lazy(() => import('../pages/task/TasksPage'))
  const TasksDetailsPage = lazy(() => import('../pages/task/TasksDetailsPage'))
  const EmailPage = lazy(() => import('../pages/email/EmailPage'))
  const WhatsAppPage = lazy(() => import('../pages/whatsapp/WhatsAppPage'))
  const PhonePage = lazy(() => import('../pages/phone/PhonePage'))
  const VoipPage = lazy(() => import('../pages/voip/VoipPage'))
  const SettingsPage = lazy(() => import('../pages/settings/SettingsPage'))

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/dashboard' />} />
        {/* Pages */}
        <Route path='dashboard' element={<DashboardWrapper />} />

        {/* Lazy Modules */}
        <Route
          path='users'
          element={
            <SuspensedView>
              <UsersPage />
            </SuspensedView>
          }
        />
        <Route
          path='users/:id'
          element={
            <SuspensedView>
              <UsersProfilePage />
            </SuspensedView>
          }
        />
        <Route
          path='customers'
          element={
            <SuspensedView>
              <CustomersPage />
            </SuspensedView>
          }
        />
        <Route
          path='customers/:id'
          element={
            <SuspensedView>
              <CustomersProfilePage />
            </SuspensedView>
          }
        />
        <Route
          path='contacts'
          element={
            <SuspensedView>
              <ContactsPage />
            </SuspensedView>
          }
        />
        <Route
          path='contacts/:id'
          element={
            <SuspensedView>
              <ContactsProfilePage />
            </SuspensedView>
          }
        />
        <Route
          path='tasks'
          element={
            <SuspensedView>
              <TasksPage />
            </SuspensedView>
          }
        />
        <Route
          path='tasks/:id'
          element={
            <SuspensedView>
              <TasksDetailsPage />
            </SuspensedView>
          }
        />
        <Route
          path='email'
          element={
            <SuspensedView>
              <EmailPage />
            </SuspensedView>
          }
        />
        <Route
          path='whatsapp'
          element={
            <SuspensedView>
              <WhatsAppPage />
            </SuspensedView>
          }
        />
        <Route
          path='phone/:type'
          element={
            <SuspensedView>
              <PhonePage />
            </SuspensedView>
          }
        />
        <Route
          path='voip'
          element={
            <SuspensedView>
              <VoipPage />
            </SuspensedView>
          }
        />
        <Route
          path='settings'
          element={
            <SuspensedView>
              <SettingsPage />
            </SuspensedView>
          }
        />
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

const SuspensedView: FC<WithChildren> = ({children}) => {
  const baseColor = getCSSVariableValue('--bs-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export {PrivateRoutes}
