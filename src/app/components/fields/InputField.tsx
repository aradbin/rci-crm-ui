import clsx from "clsx";

export const InputField = ({
    label,
    placeholder,
    field,
    type,
    required,
    form: { touched, errors },
    size,
    formStyle
}: any) => {
    return (
        <div className={`mb-4 ${formStyle==='inline' && 'form-group row'}`}>
            <label className={`${required} fw-bold mb-2 ${size==='sm' ? 'fs-7' : 'fs-6'} ${formStyle==='inline' && 'col-sm-3 col-form-label'} ${(size==='sm' && formStyle==='inline') && 'pt-3'}`}>{label}</label>
            
            {formStyle==='inline' ? 
                <div className="col-sm-9">
                    <input
                        {...field}
                        placeholder={placeholder || label}
                        type={type}
                        className={clsx('form-control mb-3 mb-lg-0',
                            {'form-control-sm': size==='sm'},
                            {'is-invalid': touched[field.name] && errors[field.name]},
                            // {'is-valid': touched[field.name] && !errors[field.name]},
                        )}
                        autoComplete='off'
                    />
                </div>
            :
                <input
                    {...field}
                    placeholder={placeholder || label}
                    type={type}
                    className={clsx('form-control mb-3 mb-lg-0',
                        {'form-control-sm': size==='sm'},
                        {'is-invalid': touched[field.name] && errors[field.name]},
                        // {'is-valid': touched[field.name] && !errors[field.name]},
                    )}
                    autoComplete='off'
                />
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