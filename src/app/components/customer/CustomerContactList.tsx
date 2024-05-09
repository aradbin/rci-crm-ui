import { useEffect, useState } from "react"
import { TableComponent } from "../common/TableComponent"
import { CUSTOMER_CONTACTS_URL } from "../../helpers/ApiEndpoints"
import { stringifyRequestQuery } from "../../helpers/Utils"
import { customerContactColumns } from "../../columns/customerContactColumns"

const CustomerContactList = ({ filterParams, refetch }: any) => {
    const [params, setParams] = useState<any>({...filterParams})

    useEffect(() => {
        setParams({...filterParams})
    },[filterParams])

    return (<>
        <div className='card-body py-3'>
            <TableComponent queryKey={`customer-contacts-${filterParams?.contact_id}-${filterParams?.customer_id}`} url={CUSTOMER_CONTACTS_URL} params={stringifyRequestQuery(params)} columns={customerContactColumns} refetch={refetch} />
        </div>
    </>)
}

export default CustomerContactList