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

const QueryUnipile = (queryKey: any, url: string, params: any = {}, attachment: boolean = false, enabled: boolean = true) => {
    const queryInstance = useQuery([queryKey, params], () => getRequestUnipile(url, params, attachment), {
        keepPreviousData: true,
        enabled: enabled,
        cacheTime: attachment ? Infinity : (1000 * 60 * 5),
        staleTime: attachment ? Infinity : 0,
    })

    return queryInstance
}

const QueryInfiniteUnipile = (queryKey: any, url: string, params: any = {}, enabled: boolean = true) => {
    const queryInstance = useInfiniteQuery([queryKey, params], ({ pageParam }) => {
        const payload = {
            ...params,
            ...pageParam
        }

        return getRequestUnipile(url, payload)
    }, {
        getNextPageParam: (lastPage, _) => (lastPage.cursor ? { cursor: lastPage.cursor } : null),
        enabled: enabled
    })

    return queryInstance
}

export { Query, QueryInfinite, QueryUnipile, QueryInfiniteUnipile }