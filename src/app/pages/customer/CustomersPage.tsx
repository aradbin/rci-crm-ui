import { useState } from "react"
import { KTCard, KTCardBody } from "../../../_metronic/helpers"
import { TableComponent } from "../../components/common/TableComponent"
import { CUSTOMERS_URL } from "../../helpers/ApiEndpoints"
import { ToolbarComponent } from "../../components/common/ToolbarComponent"
import { stringifyRequestQuery } from "../../helpers/Utils"
import { CustomerCreateForm } from "../../components/forms/CustomerCreateForm"
import { customerColumns } from "../../columns/customerColumns"
import { FilterComponent } from "../../components/common/FilterComponent"
import { useQueryClient } from "react-query"

const breadCrumbs = [
    { title: 'Customer Management', path: '/customers', isSeparator: false },
    { isSeparator: true },
]

const filter = {
    initialValues: {
        name: "",
        email: "",
        contact: ""
    },
    fields: [
        { label: "Name", name: "name" },
        { label: "Email", name: "email" },
        { label: "Contact", name: "contact" },
    ]
}

const CustomersPage = () => {
    const queryClient = useQueryClient()

    const [params, setParams] = useState("")
    const [refetch, setRefetch] = useState(0)
    const [showCreate, setShowCreate] = useState(false)

    const handleFilterSubmit = (values: any) => {
        setParams(stringifyRequestQuery({...values}))
    }

    const toggleShowCreate = (show: boolean) => {
        setShowCreate(show)
    }

    const updateList = () => {
        queryClient.invalidateQueries({ queryKey: ['all-customers', 'pageSize=all'] })
        setRefetch(refetch+1)
    }

    return (
        <>
            <ToolbarComponent title="Customers" breadCrumbs={breadCrumbs} handleButtonClick={toggleShowCreate}>
                <FilterComponent filter={filter} submit={handleFilterSubmit}/>
            </ToolbarComponent>
            <KTCard className="mb-5 mb-xl-8">
                <KTCardBody className='py-3'>
                    <TableComponent queryKey="customers" url={CUSTOMERS_URL} params={params} columns={customerColumns} refetch={refetch} />
                </KTCardBody>
            </KTCard>
            <CustomerCreateForm show={showCreate} toggleShow={toggleShowCreate} updateList={updateList} />
        </>
    )
}

export default CustomersPage;