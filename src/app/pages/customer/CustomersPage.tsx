import { useContext, useEffect, useState } from "react"
import { KTCard, KTCardBody, KTIcon } from "../../../_metronic/helpers"
import { TableComponent } from "../../components/common/TableComponent"
import { CUSTOMERS_URL } from "../../helpers/ApiEndpoints"
import { ToolbarComponent } from "../../components/common/ToolbarComponent"
import { getSettingsOptions, stringifyRequestQuery } from "../../helpers/Utils"
import { CustomerCreateForm } from "../../components/forms/CustomerCreateForm"
import { customerColumns } from "../../columns/customerColumns"
import { FilterComponent } from "../../components/common/FilterComponent"
import { CustomerImportForm } from "../../components/forms/CustomerImportForm"
import { AppContext } from "../../providers/AppProvider"

const breadCrumbs = [
    { title: 'Customer Management', path: '/customers', isSeparator: false },
    { isSeparator: true },
]

const CustomersPage = () => {
    const [params, setParams] = useState("")
    const [refetch, setRefetch] = useState(0)
    const [showCreate, setShowCreate] = useState(false)
    const [showImport, setShowImport] = useState(false)

    const { settings } = useContext(AppContext)

    const filter = {
        initialValues: {
            name: "",
            email: "",
            contact: "",
            customer_type_id: "",
            business_type_id: "",
            status: ""
        },
        fields: [
            { label: "Name", name: "name" },
            { label: "Email", name: "email" },
            { label: "Contact", name: "contact" },
            { label: "Customer Type", name: "customer_type_id", type: "select", options: getSettingsOptions(settings, 'customer-type') },
            { label: "Business Type", name: "business_type_id", type: "select", options: getSettingsOptions(settings, 'business-type') },
            { label: "Status", name: "status", type: "select", options: [
                { label: 'Active', value: true },
                { label: 'Inactive', value: false },
            ]},
        ]
    }

    useEffect(() => {
        filter.fields[3].options = getSettingsOptions(settings, 'customer-type')
        filter.fields[4].options = getSettingsOptions(settings, 'business-type')
    },[settings])

    const handleFilterSubmit = (values: any) => {
        setParams(stringifyRequestQuery({...values}))
    }

    const toggleShowCreate = (show: boolean) => {
        setShowCreate(show)
    }

    const toggleShowImport = (show: boolean) => {
        setShowImport(show)
    }

    const updateList = () => {
        setRefetch(refetch+1)
    }

    return (
        <>
            <ToolbarComponent title="Customers" breadCrumbs={breadCrumbs} handleButtonClick={toggleShowCreate}>
                <>
                    <FilterComponent filter={filter} submit={handleFilterSubmit}/>
                    <button className='btn btn-sm fw-bold btn-primary' onClick={() => toggleShowImport(true)}>
                        <KTIcon iconName='file-up' className='fs-3' /> Import
                    </button>
                </>
            </ToolbarComponent>
            <KTCard className="mb-5 mb-xl-8">
                <KTCardBody className='py-3'>
                    <TableComponent queryKey="customers" url={CUSTOMERS_URL} params={params} columns={customerColumns} refetch={refetch} />
                </KTCardBody>
            </KTCard>
            <CustomerCreateForm show={showCreate} toggleShow={toggleShowCreate} updateList={updateList} />
            <CustomerImportForm show={showImport} toggleShow={toggleShowImport} updateList={updateList} />
        </>
    )
}

export default CustomersPage;