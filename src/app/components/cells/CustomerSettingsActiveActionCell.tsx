import { useContext, useState } from "react"
import { AppContext } from "../../providers/AppProvider"
import { updateRequest } from "../../helpers/Requests"
import { CUSTOMER_SETTINGS_URL } from "../../helpers/ApiEndpoints"
import { toast } from "react-toastify"
import { useParams } from "react-router-dom"
import { useQueryClient } from "react-query"
import { LoadingComponent } from "../common/LoadingComponent"

const CustomerSettingsActiveActionCell = ({ item }: any) => {
  const { setIdForCustomerServiceUpdate, setIdForCustomerServiceCreate } = useContext(AppContext)
  const queryClient = useQueryClient()
  const { id } = useParams()

  const [loading, setLoading] = useState(false)

  const handleToggle = (e: any) => {
    if(item?.customerSettingsSingle){
      setLoading(true)
      updateRequest(`${CUSTOMER_SETTINGS_URL}/${item?.customerSettingsSingle?.id}`, { is_active: e.target.checked }).then((response) => {
        if(response?.status===200){
          toast.success(`Service ${e.target.checked ? 'Activated' : 'Deactivated'} Successfully`)
          queryClient.invalidateQueries({ queryKey: [`customer-settings-${id}`] })
        }
      }).finally(() => {
        setLoading(false)
      })
    }else{
      if(id && e.target.checked){
        setIdForCustomerServiceCreate(item?.id)
      }
    }
  }

  return (
    <div className='d-flex justify-content-center flex-shrink-0'>
      <div className="form-check form-switch form-check-custom form-check-solid me-1">
        <input className="form-check-input w-35px h-20px cursor-pointer" type="checkbox" defaultChecked={item?.customerSettingsSingle?.is_active || false} onChange={handleToggle} />
      </div>
      {loading && <LoadingComponent />}
    </div>
  )
}

export {CustomerSettingsActiveActionCell}
