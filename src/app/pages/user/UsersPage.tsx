import { useState } from "react"
import { KTCard, KTCardBody, KTIcon } from "../../../_metronic/helpers"
import { userColumns } from "../../columns/userColumns"
import { TableComponent } from "../../components/common/TableComponent"
import { USERS_URL } from "../../helpers/ApiEndpoints"
import { UserCreateForm } from "../../components/forms/UserCreateForm"
import { ToolbarComponent } from "../../components/common/ToolbarComponent"
import { stringifyRequestQuery } from "../../helpers/Utils"
import { FilterComponent } from "../../components/common/FilterComponent"
import { UserImportForm } from "../../components/forms/UserImportForm"

const breadCrumbs = [
    { title: 'User Management', path: '/users', isSeparator: false },
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

const UsersPage = () => {
    const [params, setParams] = useState("")
    const [refetch, setRefetch] = useState(0)
    const [showCreate, setShowCreate] = useState(false)
    const [showImport, setShowImport] = useState(false)

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
            <ToolbarComponent title="Users" breadCrumbs={breadCrumbs} handleButtonClick={toggleShowCreate}>
                <>
                    <FilterComponent filter={filter} submit={handleFilterSubmit}/>
                    <button className='btn btn-sm fw-bold btn-primary' onClick={() => toggleShowImport(true)}>
                        <KTIcon iconName='file-up' className='fs-3' /> Import
                    </button>
                </>
            </ToolbarComponent>
            <KTCard className="mb-5 mb-xl-8">
                <KTCardBody className='py-3'>
                    <TableComponent queryKey="users" url={USERS_URL} params={params} columns={userColumns} refetch={refetch} />
                </KTCardBody>
            </KTCard>
            <UserCreateForm show={showCreate} toggleShow={toggleShowCreate} updateList={updateList} />
            <UserImportForm show={showImport} toggleShow={toggleShowImport} updateList={updateList} />
        </>
    )
}

export default UsersPage;