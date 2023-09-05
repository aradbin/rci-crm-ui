import { useEffect, useMemo, useState } from "react";
import { useQueryClient } from "react-query";
import { useExpanded, useTable } from "react-table";
import { Query } from "../../helpers/Queries";
import { Loading } from "./Loading";
import { PaginationComponent } from "./PaginationComponent";

const TableLayout = ({
    getTableProps,
    getTableBodyProps,
    headers,
    rows,
    prepareRow,
  }: any) => {
    return (
        <div className='table-responsive'>
            <table
                id='kt_table_users'
                className='table align-middle table-striped table-hover fs-6 gy-5 dataTable no-footer'
                {...getTableProps()}
            >
                <thead>
                    <tr className='table-active text-center text-primary fw-bolder gs-0'>
                        {headers.map((column: any) => (
                            <th className='px-4' {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className='fw-semibold' {...getTableBodyProps()}>
                    {rows.length > 0 ? (
                        rows.map((row: any, i: number) => {
                            prepareRow(row)
                            return <tr className='text-center' {...row.getRowProps()}>
                                {row.cells.map((cell: any) => {
                                    return (
                                        <td className='px-4'
                                            {...cell.getCellProps()}
                                        >
                                            {cell.render('Cell')}
                                        </td>
                                    )
                                })}
                            </tr>
                        })
                    ) : (
                    <tr>
                        <td colSpan={headers.length}>
                            <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                                No matching records found
                            </div>
                        </td>
                    </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

const TableInstance = ({tableData, tableColumns}: any) => {
    const [columns, data] = useMemo(
      () => {
        const columns = tableColumns
        return [columns, tableData];
      },
      [tableData]
    );

    const tableInstance = useTable({ columns, data }, useExpanded);
  
    return (
      <TableLayout {...tableInstance} />
    );
}

const TableComponent = ({queryKey, url, params, columns, refetch, canExpand=''}: any) => {
    const queryClient = useQueryClient()

    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)

    const { isLoading, isFetching, data } = Query(queryKey, url, `page=${page}&pageSize=${pageSize}${params!=="" ? "&"+params : ""}`)

    const updatePage = (value: number) => {
        setPage(value)
    }

    const updatePageSize = (value: number) => {
        setPage(1)
        setPageSize(value)
    }

    useEffect(() => {
        if(page===1){
            queryClient.invalidateQueries({ queryKey: [queryKey, `page=1&pageSize=${pageSize}${params!=="" ? "&"+params : ""}`] })
        }else{
            setPage(1)
        }
    },[refetch, params])

    let tableData = data?.results
    if(canExpand){
        tableData = data?.results?.map((item: any) => {
            return {
                ...item,
                subRows: item[canExpand]
            }
        })
    }

    return (
      <>
        <TableInstance tableData={tableData || []} tableColumns={columns} />
        {(isLoading || isFetching) && <Loading />}
        <PaginationComponent page={page} pageSize={pageSize} count={data?.totalCount} updatePage={updatePage} updatePageSize={updatePageSize} />
      </>
    );
}

export {TableComponent}
