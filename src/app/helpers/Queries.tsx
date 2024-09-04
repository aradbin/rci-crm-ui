import { useInfiniteQuery, useQuery } from "react-query"
import { getRequest } from "../helpers/Requests"
import { UNIPILE_API_KEY, UNIPILE_BASE_URL } from "./ApiEndpoints"

const Query = (queryKey: any, url: string, params: string = "") => {
    const queryInstance = useQuery([queryKey, params], () => getRequest(url, params), {
        keepPreviousData: true,
    })

    return queryInstance
}

const QueryInfinite = (queryKey: any, url: string, params: string = "") => {
    const queryInstance = useInfiniteQuery([queryKey, params], ({ pageParam }) => {
        return getRequest(`${url}${params !== '' ? `?${params}` : ''}${pageParam ? `&cursor=${pageParam}` : ''}`)
    }, {
        getNextPageParam: (lastPage, _) => lastPage.cursor,
    })

    return queryInstance
}

const QueryUnipile = (queryKey: any, url: string, params: string = "") => {
    const queryInstance = useQuery([queryKey, params], () => fetch(`${UNIPILE_BASE_URL}${url}`, {
        method: 'GET',
        headers: {accept: '*/*', 'X-API-KEY': `${UNIPILE_API_KEY}`}
    }).then(async (response: any) => {
        if(params === 'attachment'){
            const data = await response.blob()
            return data
        }else{
            const data = await response.json()
            return data
        }
    }), {
        keepPreviousData: true,
    })

    return queryInstance
}

export { Query, QueryInfinite, QueryUnipile }