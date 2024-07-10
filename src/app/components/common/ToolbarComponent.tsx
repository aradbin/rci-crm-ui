import { KTIcon } from "../../../_metronic/helpers"
import { PageTitleComponent } from "./PageTitleComponent"

const ToolbarComponent = ({title, breadCrumbs, handleButtonClick, children = <></>, hasCreate=true}) => {
    return (
        <div id="kt_app_toolbar" className='app-toolbar pb-3 pb-lg-6'>
            <div id="kt_app_toolbar_container" className='d-flex flex-stack container-fluid p-0'>
                <PageTitleComponent pageTitle={title} pageBreadcrumbs={breadCrumbs} />
                <div className='d-flex align-items-center gap-2 gap-lg-3'>
                    {children}
                    {hasCreate && <button className='btn btn-sm fw-bold btn-primary' onClick={() => handleButtonClick(true)}>
                        <KTIcon iconName='plus' className='fs-3' /> Create
                    </button>}
                </div>
            </div>
        </div>
    )
}

export {ToolbarComponent}