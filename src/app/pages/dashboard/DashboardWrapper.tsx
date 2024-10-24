/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useContext} from 'react'
import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'
import {StatisticsWidget5, StatisticsWidget6} from '../../../_metronic/partials/widgets'
import { AppContext } from '../../providers/AppProvider'
import { Query } from '../../helpers/Queries'
import { TASKS_URL } from '../../helpers/ApiEndpoints'

const DashboardPage = () => {
  const { users, customers, settings } = useContext(AppContext)

  const { data: tasks } = Query('task-count', `${TASKS_URL}/count`)

  const getTaskProgress = () => {
    const total = tasks?.reduce((acc: number, cur: any) => acc + parseInt(cur.count), 0)
    const success = tasks?.find((item: any) => item?.status === 'done')?.count || 0

    return `${(Math.round((success / total) * 100)) || 0}%`
  }
  
  return (
    <div className='row g-5 g-xl-5'>
      <div className='col-md-6 col-xl-3'>
        <StatisticsWidget5
          className='card-xl-stretch mb-xl-8'
          svgIcon='profile-user'
          color='primary'
          iconColor='white'
          title={`${users?.length || 0}`}
          titleColor='white'
          description='Total Active Users'
          descriptionColor='white'
          url='/users'
        />
      </div>

      <div className='col-md-6 col-xl-3'>
        <StatisticsWidget5
          className='card-xl-stretch mb-xl-8'
          svgIcon='bank'
          color='danger'
          iconColor='white'
          title={`${customers?.length || 0}`}
          titleColor='white'
          description='Total Active Customers'
          descriptionColor='white'
          url='/customers'
        />
      </div>

      <div className='col-md-6 col-xl-3'>
        <StatisticsWidget5
          className='card-xl-stretch mb-xl-8'
          svgIcon='briefcase'
          color='info'
          iconColor='white'
          title={`${settings?.filter((item: any) => item.type === 'service')?.length || 0}`}
          titleColor='white'
          description='Total Serivce Providing'
          descriptionColor='white'
          url='/settings'
        />
      </div>

      <div className='col-md-6 col-xl-3'>
        <StatisticsWidget5
          className='card-xl-stretch mb-xl-8'
          svgIcon='burger-menu'
          color='success'
          iconColor='white'
          title={`${tasks?.find((item: any) => item?.status === 'done')?.count || 0}`}
          titleColor='white'
          description='Total Task Completed'
          descriptionColor='white'
          url='/tasks'
        />
      </div>

      <div className='col-md-6 col-xl-6 mt-0'>
          <StatisticsWidget6
            className='card-xl-stretch mb-xl-8'
            color='success'
            title='Completed'
            description='Task Progress'
            progress={getTaskProgress()}
          />
        </div>
    </div>
  )
}

const DashboardWrapper: FC = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
      <DashboardPage />
    </>
  )
}

export {DashboardWrapper}
