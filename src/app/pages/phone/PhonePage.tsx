import { useEffect, useState } from "react"
import { KTCard, KTCardBody } from "../../../_metronic/helpers"
import { TableComponent } from "../../components/common/TableComponent"
import { PHONE_URL } from "../../helpers/ApiEndpoints"
import { ToolbarComponent } from "../../components/common/ToolbarComponent"
import { stringifyRequestQuery } from "../../helpers/Utils"
import { FilterComponent } from "../../components/common/FilterComponent"
import { VoIPCreateForm } from "../../components/forms/VoIPCreateForm"
import { phoneColumns } from "../../columns/phoneColumns"
import { useParams } from "react-router-dom"

const breadCrumbs = [
    { title: 'Phone', path: '/phone/calls', isSeparator: false },
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

const PhonePage = () => {
    const { type } = useParams()
    const [params, setParams] = useState("")
    const [refetch, setRefetch] = useState(0)

    useEffect(() => {
        
    },[type])

    const handleFilterSubmit = (values: any) => {
        setParams(stringifyRequestQuery({...values}))
    }

    const updateList = () => {
        setRefetch(refetch+1)
    }

    return (
        <>
            <ToolbarComponent title={`${type === 'call' ? 'Call' : 'SMS'} Log`} breadCrumbs={breadCrumbs} handleButtonClick={() => {}} hasCreate={false}>
                <FilterComponent filter={filter} submit={handleFilterSubmit}/>
            </ToolbarComponent>
            <KTCard className="mb-5 mb-xl-8">
                <KTCardBody className='py-3'>
                    <TableComponent queryKey="calls" url={PHONE_URL} params={params} columns={phoneColumns} refetch={refetch} />
                </KTCardBody>
            </KTCard>
            <VoIPCreateForm updateList={updateList} />
        </>
    )
}

export default PhonePage;