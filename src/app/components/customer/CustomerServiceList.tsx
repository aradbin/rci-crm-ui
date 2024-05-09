import { useEffect, useState } from "react"
import { TableComponent } from "../common/TableComponent"
import { CUSTOMER_SETTINGS_URL } from "../../helpers/ApiEndpoints"
import { stringifyRequestQuery } from "../../helpers/Utils"
import { customerSettingsColumns } from "../../columns/customerSettingsColumns"

const CustomerServiceList = ({ filterParams, refetch }: any) => {
    const [params, setParams] = useState<any>({...filterParams})

    useEffect(() => {
        setParams({...filterParams})
    },[filterParams])

    return (<>
        <div className='card-body py-3'>
            <TableComponent queryKey={`customer-settings-${filterParams?.customer_id}`} url={CUSTOMER_SETTINGS_URL} params={stringifyRequestQuery(params)} columns={customerSettingsColumns} refetch={refetch} />
        </div>
    </>)
}

export default CustomerServiceList