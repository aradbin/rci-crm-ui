import {Suspense} from 'react'
import {Outlet} from 'react-router-dom'
import {I18nProvider} from '../_metronic/i18n/i18nProvider'
import {LayoutProvider, LayoutSplashScreen} from '../_metronic/layout/core'
import {MasterInit} from '../_metronic/layout/MasterInit'
import {AuthInit} from './modules/auth'
import {ThemeModeProvider} from '../_metronic/partials'
import { AppProvider } from './providers/AppProvider'
import { SocketProvider } from './providers/SocketProvider'

const App = () => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <I18nProvider>
        <LayoutProvider>
          <ThemeModeProvider>
            <SocketProvider>
              <AppProvider>
                <AuthInit>
                  <Outlet />
                  <MasterInit />
                </AuthInit>
              </AppProvider>
            </SocketProvider>
          </ThemeModeProvider>
        </LayoutProvider>
      </I18nProvider>
    </Suspense>
  )
}

export {App}
