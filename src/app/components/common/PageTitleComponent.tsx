import clsx from 'clsx'
import {Link} from 'react-router-dom'

export interface PageLink {
  title: string
  path: string
  isSeparator?: boolean
}

export interface PageTitleProps {
  pageTitle: string
  pageBreadcrumbs: Array<PageLink>
}

const PageTitleComponent = ({pageTitle, pageBreadcrumbs}: PageTitleProps) => {
  return (
    <div
      id='kt_page_title'
      data-kt-swapper='true'
      data-kt-swapper-mode='prepend'
      data-kt-swapper-parent="{default: '#kt_content_container', 'lg': '#kt_toolbar_container'}"
      className='page-title d-flex flex-wrap me-3 flex-column justify-content-center'
    >
      {/* begin::Title */}
      <h1 className='page-heading d-flex text-dark fw-bold fs-3 my-0 flex-column justify-content-center pb-2'>
        {pageTitle}
      </h1>
      {/* end::Title */}

      {pageBreadcrumbs && pageBreadcrumbs.length > 0 && (
        <ul className='breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0'>
          {Array.from(pageBreadcrumbs).map((item, index) => (
            <li className='breadcrumb-item text-muted' key={`${item.path}${index}`}>
              {!item.isSeparator ? (
                <Link className='text-muted text-hover-primary' to={item.path}>
                  {item.title}
                </Link>
              ) : (
                <span className='bullet bg-gray-400 w-5px h-2px'></span>
              )}
            </li>
          ))}
          <li className='breadcrumb-item text-dark'>{pageTitle}</li>
        </ul>
      )}
    </div>
  )
}

export {PageTitleComponent}
