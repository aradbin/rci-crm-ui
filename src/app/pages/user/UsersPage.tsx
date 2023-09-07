import { useState } from "react"
import { KTCard, KTCardBody, KTIcon } from "../../../_metronic/helpers"
import { userColumns } from "../../columns/userColumns"
import { TableComponent } from "../../components/common/TableComponent"
import { USERS_URL } from "../../helpers/ApiEndpoints"
import { UserProvider } from "../../providers/UserProvider"

const UserToolbar = () => {
    return (
        <div className='card-header border-0 pt-5'>
            <h3 className='card-title align-items-start flex-column'>
                <span className='card-label fw-bold fs-3 mb-1'>Users List</span>
            </h3>
            <div className='card-toolbar'>
                <button className='btn btn-sm btn-light-primary' data-bs-toggle='modal' data-bs-target='#kt_modal_invite_friends'>
                    <KTIcon iconName='plus' className='fs-3' /> Create User
                </button>
            </div>
        </div>
    );
}

const UsersPage = () => {
    const [params, setParams] = useState("")
    const [refetch, setRefetch] = useState(0)

    return (
        <UserProvider>
            <KTCard className="mb-5 mb-xl-8">
                <UserToolbar />
                <KTCardBody className='py-3'>
                    <TableComponent queryKey="users" url={USERS_URL} params={params} columns={userColumns} refetch={refetch} />
                </KTCardBody>
            </KTCard>
        </UserProvider>
    )
}

export default UsersPage;