import {useState} from 'react'
import {KTCard, KTCardBody} from '../../../_metronic/helpers'
import {TableComponent} from '../../components/common/TableComponent'
import {VOIP_LOGS_URL} from '../../helpers/ApiEndpoints'
import {ToolbarComponent} from '../../components/common/ToolbarComponent'
import {stringifyRequestQuery} from '../../helpers/Utils'
import {voipLogsColumns} from '../../columns/voipLogsColumns'
import {FilterComponent} from '../../components/common/FilterComponent'
import {useQueryClient} from 'react-query'

const breadCrumbs = [
  {title: 'Voip Call Logs', path: '/voip', isSeparator: false},
  {isSeparator: true},
]

const filter = {
  initialValues: {
    remote_number: '',
    local_number: '',
    // contact: '',
  },
  fields: [
    {label: 'Remote Number', name: 'remote_number'},
    {label: 'Local Number', name: 'local_number'},
    // {label: 'Contact', name: 'contact'},
  ],
}

const VoipLogsPage = () => {
  const queryClient = useQueryClient()

  const [params, setParams] = useState('')
  const [refetch, setRefetch] = useState(0)
  const [showCreate, setShowCreate] = useState(false)

  const handleFilterSubmit = (values: any) => {
    setParams(stringifyRequestQuery({...values}))
  }

  const toggleShowCreate = (show: boolean) => {
    setShowCreate(show)
  }

  // const updateList = () => {
  //   queryClient.invalidateQueries({queryKey: ['all-customers', 'pageSize=all']})
  //   setRefetch(refetch + 1)
  // }

  return (
    <>
      <ToolbarComponent
        title='Call Logs'
        breadCrumbs={breadCrumbs}
        handleButtonClick={toggleShowCreate}
      >
        <FilterComponent filter={filter} submit={handleFilterSubmit} />
      </ToolbarComponent>
      <KTCard className='mb-5 mb-xl-8'>
        <KTCardBody className='py-3'>
          <TableComponent
            queryKey='voip-logs'
            url={VOIP_LOGS_URL}
            params={params}
            columns={voipLogsColumns}
            refetch={refetch}
          />
        </KTCardBody>
      </KTCard>
      {/* <CustomerCreateForm show={showCreate} toggleShow={toggleShowCreate} updateList={updateList} /> */}
    </>
  )
}

export default VoipLogsPage
