import { useEffect, useMemo, useState } from "react";
import { useQueryClient } from "react-query";
import { useExpanded, useTable } from "react-table";
import { Query, QueryInfinite } from "../../helpers/Queries";
import { PaginationComponent } from "../common/PaginationComponent";
import { LoadingComponent } from "../common/LoadingComponent";

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
                className='table table-row-dashed table-row-gray-300 align-middle gs-0'
                {...getTableProps()}
            >
                <thead>
                    <tr className='fw-bold text-muted'>
                        {headers.map((column: any) => (
                            <th className={column.id==='Actions' ? 'text-end' : ''} {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.length > 0 ? (
                        rows.map((row: any, i: number) => {
                            prepareRow(row)
                            return <tr {...row.getRowProps()}>
                                {row.cells.map((cell: any) => {
                                    return (
                                        <td className="text-dark fw-semibold fs-7" {...cell.getCellProps()}>
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

const EmailTable = ({queryKey, url, params='', columns, refetch, canExpand=''}: any) => {
    const queryClient = useQueryClient()

    const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } = QueryInfinite(queryKey, url, params)

    useEffect(() => {
        queryClient.invalidateQueries({ queryKey: [queryKey, params] })
    },[refetch, params])

    const getTableData = () => {
        let tableData = []
        data?.pages?.forEach(item => {
            tableData = tableData.concat(item?.items)
        })

        return tableData
    }

    return (
      <>
        <TableInstance tableData={getTableData() || []} tableColumns={columns} />
        {!data?.pages?.length && <LoadingComponent />}

        <div className="d-flex justify-content-center">
            {hasNextPage && <button className="btn btn-sm btn-outline btn-outline-primary" onClick={() => fetchNextPage()}>
                {isFetchingNextPage ?
                    <span>
                        Loading {' '} <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                    </span>
                : 
                    'Load More'
                }
            </button>}
        </div>
      </>
    );
}

export {EmailTable}
