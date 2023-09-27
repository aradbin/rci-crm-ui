import { useState } from "react"
import { KTCard, KTCardBody } from "../../../_metronic/helpers"
import { TableComponent } from "../../components/common/TableComponent"
import { EMAIL_URL } from "../../helpers/ApiEndpoints"
import { ToolbarComponent } from "../../components/common/ToolbarComponent"
import { WhatsAppCreateForm } from "../../components/forms/WhatsAppCreateForm"

const breadCrumbs = [
    { title: 'WhatsApp', path: '/whatsapp', isSeparator: false },
    { isSeparator: true },
]

const WhatsAppPage = () => {
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
            <ToolbarComponent title="WhatsApp" breadCrumbs={breadCrumbs} handleButtonClick={toggleShowCreate}>
            </ToolbarComponent>
            <KTCard className="mb-5 mb-xl-8">
                <KTCardBody className='py-3'>
                    {/* <TableComponent queryKey="email" url={EMAIL_URL} params={params} columns={[]} refetch={refetch} /> */}
                </KTCardBody>
            </KTCard>
            <WhatsAppCreateForm show={showCreate} toggleShow={toggleShowCreate} updateList={() => {}} />
        </>
    )
}

export default WhatsAppPage;