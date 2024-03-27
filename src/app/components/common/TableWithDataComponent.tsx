import { useEffect, useMemo, useState } from "react";
import { useExpanded, useTable } from "react-table";
import { LoadingComponent } from "./LoadingComponent";

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

const TableWithDataComponent = ({data=[], columns, isLoading=false, canExpand=''}: any) => {
    const [tableData, setTableData] = useState([])

    useEffect(() => {
        let array = data
        if(canExpand){
            array = data?.map((item: any) => {
                return {
                    ...item,
                    subRows: item[canExpand]
                }
            })
        }
        setTableData(array)
    },[data])

    return (
      <>
        <TableInstance tableData={tableData || []} tableColumns={columns} />
        {isLoading && <LoadingComponent />}
      </>
    );
}

export {TableWithDataComponent}
