import { useState } from "react"
import { KTCard, KTCardBody } from "../../../_metronic/helpers"
import { TableComponent } from "../../components/common/TableComponent"
import { CALLS_URL, VOIP_URL } from "../../helpers/ApiEndpoints"
import { ToolbarComponent } from "../../components/common/ToolbarComponent"
import { stringifyRequestQuery } from "../../helpers/Utils"
import { FilterComponent } from "../../components/common/FilterComponent"
import { voipColumns } from "../../columns/voipColumns"
import { VoIPCreateForm } from "../../components/forms/VoIPCreateForm"
import { callColumns } from "../../columns/callColumns"

const breadCrumbs = [
    { title: 'Phone', path: '/calls', isSeparator: false },
    { isSeparator: true },
]

const filter = {
    initialValues: {
        number: "",
    },
    fields: [
        { label: "Number", name: "number" },
    ]
}

const CallPage = () => {
    const [params, setParams] = useState("")
    const [refetch, setRefetch] = useState(0)

    const handleFilterSubmit = (values: any) => {
        setParams(stringifyRequestQuery({...values}))
    }

    const updateList = () => {
        setRefetch(refetch+1)
    }

    return (
        <>
            <ToolbarComponent title="Phone Call Log" breadCrumbs={breadCrumbs} handleButtonClick={() => {}} hasCreate={false}>
                <FilterComponent filter={filter} submit={handleFilterSubmit}/>
            </ToolbarComponent>
            <KTCard className="mb-5 mb-xl-8">
                <KTCardBody className='py-3'>
                    <TableComponent queryKey="calls" url={CALLS_URL} params={params} columns={callColumns} refetch={refetch} />
                </KTCardBody>
            </KTCard>
            <VoIPCreateForm updateList={updateList} />
        </>
    )
}

export default CallPage;