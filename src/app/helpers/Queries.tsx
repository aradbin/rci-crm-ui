import { useQuery } from "react-query"
import { getRequest } from "../helpers/Requests"
import { stringifyRequestQuery } from "./Utils"

const Query = (queryKey: any, url: string, params: string = "") => {
    const queryInstance = useQuery([queryKey, params], () => getRequest(url, params), {
        keepPreviousData: true,
    })

    return queryInstance
}

const getAllItemParams = stringifyRequestQuery({
    page: 1,
    pageSize: 9999
})

export { Query, getAllItemParams }