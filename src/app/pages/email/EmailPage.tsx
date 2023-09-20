import { useState } from "react"
import { KTCard, KTCardBody } from "../../../_metronic/helpers"
import { TableComponent } from "../../components/common/TableComponent"
import { EMAIL_URL } from "../../helpers/ApiEndpoints"
import { ToolbarComponent } from "../../components/common/ToolbarComponent"
import { EmailCreateForm } from "../../components/forms/EmailCreateForm"

const breadCrumbs = [
    { title: 'Email', path: '/email', isSeparator: false },
    { isSeparator: true },
]

const EmailPage = () => {
    const [params, setParams] = useState("")
    const [refetch, setRefetch] = useState(0)
    const [showCreate, setShowCreate] = useState(false)

    const toggleShowCreate = (show: boolean) => {
        setShowCreate(show)
    }

    const updateList = () => {
        setRefetch(refetch+1)
    }

    return (
        <>
            <ToolbarComponent title="Email" breadCrumbs={breadCrumbs} handleButtonClick={toggleShowCreate}>
            </ToolbarComponent>
            <KTCard className="mb-5 mb-xl-8">
                <KTCardBody className='py-3'>
                    {/* <TableComponent queryKey="email" url={EMAIL_URL} params={params} columns={[]} refetch={refetch} /> */}
                </KTCardBody>
            </KTCard>
            <EmailCreateForm show={showCreate} toggleShow={toggleShowCreate} updateList={() => {}} />
        </>
    )
}

export default EmailPage;