import { useQuery } from "react-query"
import { getRequest } from "../helpers/Requests"

const Query = (queryKey: any, url: string, params: string = "") => {
    const queryInstance = useQuery([queryKey, params], () => getRequest(url, params), {
        keepPreviousData: true,
    })

    return queryInstance
}

export { Query }