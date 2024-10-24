import { useInfiniteQuery, useQuery } from "react-query"
import { getRequest, getRequestUnipile } from "../helpers/Requests"

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

const QueryUnipile = (queryKey: any, url: string, params: string = "", attachment: boolean = false, enabled: boolean = true) => {
    const queryInstance = useQuery([queryKey, params], () => getRequestUnipile(url, params, attachment), {
        keepPreviousData: true,
        enabled: enabled
    })

    return queryInstance
}

const QueryInfiniteUnipile = (queryKey: any, url: string, params: string = "") => {
    const queryInstance = useInfiniteQuery([queryKey, params], ({ pageParam }) => {
        return getRequestUnipile(`${url}${params !== '' ? `?${params}` : ''}${pageParam ? (params !== '' ? `&cursor=${pageParam}` : `?cursor=${pageParam}`) : ''}`)
    }, {
        getNextPageParam: (lastPage, _) => lastPage.cursor,
    })

    return queryInstance
}

export { Query, QueryInfinite, QueryUnipile, QueryInfiniteUnipile }