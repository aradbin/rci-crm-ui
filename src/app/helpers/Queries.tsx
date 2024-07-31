import { useInfiniteQuery, useQuery } from "react-query"
import { getRequest } from "../helpers/Requests"

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

export { Query, QueryInfinite }