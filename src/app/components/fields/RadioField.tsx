import clsx from "clsx";

export const RadioField = ({
    label,
    field,
    type,
    required,
    form: { touched, errors },
    size,
    formStyle
}: any) => {
    return (
        <div className={`mb-4 ${formStyle==='inline' && 'form-group row'}`}>
            <label className={`${required} fw-bold mb-2 ${size==='sm' ? 'fs-7' : 'fs-6'} ${formStyle==='inline' && 'col-sm-9 col-form-label'} ${(size==='sm' && formStyle==='inline') && 'pt-3'}`}>{label}</label>
            
            {formStyle==='inline' ? 
                <div className="col-sm-3 d-flex align-items-center justify-content-end pe-1">
                    <div className='form-check form-check-solid form-switch fv-row'>
                        <input
                            {...field}
                            type={type}
                            className={clsx('form-check-input mb-3 mb-lg-0',
                                {'w-35px h-20px': size==='sm'}
                            )}
                            checked={field.checked}
                        />
                        <label className='form-check-label'></label>
                    </div>
                </div>
            :
                <div className='form-check form-check-solid form-switch fv-row'>
                    <input
                        {...field}
                        type={type}
                        className={clsx('form-check-input mb-3 mb-lg-0',
                            {'w-35px h-20px': size==='sm'},
                        )}
                        checked={field.checked}
                    />
                    <label className='form-check-label'></label>
                </div>
            }
            
            {touched[field.name] && errors[field.name] && (
                <div className={`fv-plugins-message-container ${formStyle==='inline' ? "row" : ""}`}>
                    {formStyle==='inline' && <div className="col-sm-3"></div>}
                    <div className={`fv-help-block ${formStyle==='inline' ? "col-sm-9" : ""}`}>
                        <span role='alert' className="ps-2">{errors[field.name]}</span>
                    </div>
                </div>
            )}
        </div>
    );
}