import { useState } from "react"
import { KTCard, KTCardBody } from "../../../_metronic/helpers"
import { TableComponent } from "../../components/common/TableComponent"
import { CUSTOMERS_URL } from "../../helpers/ApiEndpoints"
import { ToolbarComponent } from "../../components/common/ToolbarComponent"
import { stringifyRequestQuery } from "../../helpers/Utils"
import { EmailCreateForm } from "../../components/forms/EmailCreateForm"
import { CustomerProvider } from "../../providers/CustomerProvider"
import { CustomerFilter } from "../../components/filters/CustomerFilter"
import { CustomerCreateForm } from "../../components/forms/CustomerCreateForm"
import { customerColumns } from "../../columns/customerColumns"

const breadCrumbs = [
    { title: 'Customer Management', path: '/customers', isSeparator: false },
    { isSeparator: true },
]

const CustomersPage = () => {
    const [params, setParams] = useState("")
    const [refetch, setRefetch] = useState(0)
    const [showCreate, setShowCreate] = useState(false)
    const [showEmail, setShowEmail] = useState(false)

    const handleFilterSubmit = (values: any) => {
        setParams(stringifyRequestQuery({...values}))
    }

    const toggleShowCreate = (show: boolean) => {
        setShowCreate(show)
    }

    const toggleShowEmail = (show: boolean) => {
        setShowEmail(show)
    }

    const updateList = () => {
        setRefetch(refetch+1)
    }

    return (
        <CustomerProvider>
            <ToolbarComponent title="Customers" breadCrumbs={breadCrumbs} handleButtonClick={toggleShowCreate}>
                <CustomerFilter submit={handleFilterSubmit}/>
            </ToolbarComponent>
            <KTCard className="mb-5 mb-xl-8">
                <KTCardBody className='py-3'>
                    <TableComponent queryKey="customers" url={CUSTOMERS_URL} params={params} columns={customerColumns} refetch={refetch} />
                </KTCardBody>
            </KTCard>
            <CustomerCreateForm show={showCreate} toggleShow={toggleShowCreate} updateList={updateList} />
            <EmailCreateForm show={showEmail} toggleShow={toggleShowEmail} updateList={() => {}} />
        </CustomerProvider>
    )
}

export default CustomersPage;