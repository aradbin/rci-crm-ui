/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'

const PaginationComponent = ({page, pageSize, count, updatePage, updatePageSize}: any) => {
    return (
        <div className='row mt-4'>
            <div className='col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start'>
                <span className="badge badge-light-primary me-4">Total: {count}</span>
                <label className="fw-bold fs-7 col-form-label pe-2">Show rows</label>
                <div>
                    <select
                        className="form-select form-select-sm w-80px"
                        onChange={(e) => {updatePageSize(e.target.value)}}
                    >
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="40">40</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </div>
            </div>
            <div className='col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end'>
                {count > pageSize && <div id='kt_table_users_paginate'>
                    <ul className='pagination'>
                        {page>1 && <li className='page-item'>
                            <a
                                className="page-link border border-gray-300 pt-2"
                                onClick={() => updatePage(page-1)}
                                style={{cursor: 'pointer'}}
                            >
                                <span className="fa-solid fa-chevron-left"></span>
                            </a>
                        </li>}
                        {count > 1 && [...Array(Math.ceil(count/pageSize))].map((item,index) => (
                            <li
                            key={index}
                                className={clsx('page-item', {
                                    active: page === index+1
                                })}
                            >
                                <a
                                    className="page-link border border-gray-300 pt-2"
                                    onClick={() => updatePage(index+1)}
                                    style={{cursor: 'pointer'}}
                                >
                                    {index+1}
                                </a>
                            </li>
                        ))}
                        {page*pageSize < count && <li className='page-item'>
                            <a
                                className="page-link border border-gray-300 pt-2"
                                onClick={() => updatePage(page+1)}
                                style={{cursor: 'pointer'}}
                            >
                                <span className="fa-solid fa-chevron-right"></span>
                            </a>
                        </li>}
                    </ul>
                </div>}
            </div>
        </div>
    )
}

export {PaginationComponent}
