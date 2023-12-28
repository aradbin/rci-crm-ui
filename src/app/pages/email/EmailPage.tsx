import { useContext, useState } from "react"
import { KTCard, KTCardBody, KTIcon } from "../../../_metronic/helpers"
import { TableComponent } from "../../components/common/TableComponent"
import { EMAIL_URL } from "../../helpers/ApiEndpoints"
import { ToolbarComponent } from "../../components/common/ToolbarComponent"
import { AppContext } from "../../providers/AppProvider"
import { emailColumns } from "../../columns/emailColumns"

const breadCrumbs = [
    { title: 'Email', path: '/email', isSeparator: false },
    { isSeparator: true },
]

const EmailPage = () => {
    const [params, setParams] = useState("")
    const [refetch, setRefetch] = useState(0)

    const { setShowCreateEmail } = useContext(AppContext)

    const toggleShowCreate = (show: boolean) => {
        setShowCreateEmail(show)
    }

    const updateList = () => {
        setRefetch(refetch+1)
    }

    return (
        <>
            <ToolbarComponent title="Email Inbox" breadCrumbs={breadCrumbs} handleButtonClick={toggleShowCreate}>
            </ToolbarComponent>
            <KTCard className="mb-5 mb-xl-8">
                <KTCardBody className='py-3'>
                    <TableComponent queryKey="email" url={EMAIL_URL} params={params} columns={emailColumns} refetch={refetch} />
                </KTCardBody>
            </KTCard>
        </>
    )
}

export default EmailPage;