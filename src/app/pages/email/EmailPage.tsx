import { useContext, useEffect, useState } from "react"
import { KTCard, KTCardBody, KTIcon } from "../../../_metronic/helpers"
import { TableComponent } from "../../components/common/TableComponent"
import { EMAIL_URL } from "../../helpers/ApiEndpoints"
import { ToolbarComponent } from "../../components/common/ToolbarComponent"
import { AppContext } from "../../providers/AppProvider"
import { emailColumns } from "../../columns/emailColumns"
import { ShowEmail } from "../../components/email/ShowEmail"
import { getRequest } from "../../helpers/Requests"
import { LoadingComponent } from "../../components/common/LoadingComponent"
import { useAuth } from "../../modules/auth"
import { stringifyRequestQuery } from "../../helpers/Utils"

const breadCrumbs = [
    { title: 'Email', path: '/email', isSeparator: false },
    { isSeparator: true },
]

const EmailPage = () => {
    const [settingsId, setSettingsId] = useState(0)
    const [params, setParams] = useState({})
    const [refetch, setRefetch] = useState(0)
    const [loading, setLoading] = useState(false)

    const { setShowCreateEmail } = useContext(AppContext)
    const {currentUser} = useAuth()

    useEffect(() => {
        const settings = currentUser?.userSettings?.find(item => item?.settings?.type === 'email')
        if(settings){
            setSettingsId(settings?.settings_id)
        }
    },[])

    const toggleShowCreate = (show: boolean) => {
        setShowCreateEmail(show)
    }

    const syncEmail = () => {
        setLoading(true)
        getRequest(`${EMAIL_URL}/sync`).finally(() => {
            setLoading(false)
            setRefetch(refetch+1)
        })
    }

    return (
        <>
            <ToolbarComponent title="Email Inbox" breadCrumbs={breadCrumbs} handleButtonClick={toggleShowCreate}>
                <button className='btn btn-sm btn-flex fw-bold btn-outline btn-outline-dashed btn-outline-primary' onClick={syncEmail}>
                    <i className="fa-solid fa-rotate text-primary me-1 fs-6"></i> Sync
                </button>
            </ToolbarComponent>
            <KTCard className="mb-5 mb-xl-8">
                <KTCardBody className='py-3'>
                    <TableComponent queryKey="email" url={EMAIL_URL} params={stringifyRequestQuery({...params, settings_id: settingsId })} columns={emailColumns} refetch={refetch} />
                    {loading && <LoadingComponent />}
                </KTCardBody>
            </KTCard>
            <ShowEmail />
        </>
    )
}

export default EmailPage;