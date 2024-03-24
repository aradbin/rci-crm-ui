import { useState } from "react"
import { KTCard, KTCardBody } from "../../../_metronic/helpers"
import { TableComponent } from "../../components/common/TableComponent"
import { VOIP_URL } from "../../helpers/ApiEndpoints"
import { ToolbarComponent } from "../../components/common/ToolbarComponent"
import { stringifyRequestQuery } from "../../helpers/Utils"
import { FilterComponent } from "../../components/common/FilterComponent"
import { voipColumns } from "../../columns/voipColumns"

const breadCrumbs = [
    { title: 'VoIP', path: '/voip', isSeparator: false },
    { isSeparator: true },
]

const filter = {
    initialValues: {
        remote_number: "",
        local_number: "",
    },
    fields: [
        { label: "Number", name: "remote_number" },
        { label: "VoIP Number", name: "local_number" },
    ]
}

const VoipPage = () => {
    const [params, setParams] = useState("")

    const handleFilterSubmit = (values: any) => {
        setParams(stringifyRequestQuery({...values}))
    }

    return (
        <>
            <ToolbarComponent title="VoIP Call Log" breadCrumbs={breadCrumbs} handleButtonClick={() => {}} hasCreate={false}>
                <FilterComponent filter={filter} submit={handleFilterSubmit}/>
            </ToolbarComponent>
            <KTCard className="mb-5 mb-xl-8">
                <KTCardBody className='py-3'>
                    <TableComponent queryKey="voip" url={`${VOIP_URL}/list`} params={params} columns={voipColumns} refetch="0" />
                </KTCardBody>
            </KTCard>
        </>
    )
}

export default VoipPage;