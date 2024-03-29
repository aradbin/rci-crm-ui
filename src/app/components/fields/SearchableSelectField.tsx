import clsx from "clsx";
import Select from "react-select";
import { useThemeMode } from "../../../_metronic/partials";

export const SearchableSelectField = ({
    label,
    field,
    options,
    required,
    form,
    size,
    formStyle,
    multiple,
    isDisabled
}: any) => {
    const { mode } = useThemeMode()

    const customStyles = {
        control: (baseStyles: any) => ({
            ...baseStyles,
            border: `1px solid ${mode==='dark' ? '#323248' : '#dbdfe9'}`,
            backgroundColor: 'transparent',
        }),
        indicatorSeparator: (baseStyles: any) => ({
            ...baseStyles,
            display: 'none',
        }),
        dropdownIndicator: (baseStyles: any) => ({
            ...baseStyles,
            color: '#828c97',
        }),
        singleValue: (baseStyles: any) => ({
            ...baseStyles,
            color: mode==='dark' ? '#828c97' : '#4b5675',
            fontWeight: 500
        }),
        menu: (baseStyles: any) => ({
            ...baseStyles,
            backgroundColor: mode==='dark' ? '#1c1c1c' : '#fff',
        }),
        option: (baseStyles: any, state: any) => ({
            ...baseStyles,
            backgroundColor: state.isSelected ? '#4da6ff' : 'transparent',
            '&:hover': {
                backgroundColor: '#4da6ff', // Background color on hover
            },
            cursor: 'pointer'
        }),
    };
    
    const getValue = () => {
        if(options?.length > 0){
            return multiple
                ? options.filter((option: any) => field.value.indexOf(option.value) >= 0)
                : options.find((option: any) => option.value === field.value);
        } else {
            return multiple ? [] : ('');
        }
    }

    const onChange = (option: any) => {
        multiple ?
        form.setFieldValue(
            field.name,
            option?.map((item: any) => item.value) || [],
        )
        :
        form.setFieldValue(field.name, option.value)
    }

    return (
        <div className={`mb-7 ${formStyle==='inline' && 'form-group row'}`}>
            <label className={`${required} fw-bold mb-2 ${size==='sm' ? 'fs-7' : 'fs-6'} ${formStyle==='inline' && 'col-sm-3 col-form-label'} ${(size==='sm' && formStyle==='inline') && 'pt-3'}`}>{label}</label>

            {formStyle==='inline' ? 
                <div className="col-sm-9">
                    <Select
                        name={field.name}
                        styles={customStyles}
                        className={clsx('mb-3 mb-lg-0',
                            // {'is-invalid': touched[field.name] && errors[field.name]},
                            // {'is-valid': touched[field.name] && !errors[field.name]},
                        )}
                        options={options}
                        value={getValue()}
                        onChange={onChange}
                        isMulti={multiple}
                        closeMenuOnSelect={multiple ? false : true}
                        isDisabled={isDisabled}
                    />
                </div>
            : 
                <Select
                    name={field.name}
                    styles={customStyles}
                    className={clsx('mb-3 mb-lg-0',
                        // {'is-invalid': touched[field.name] && errors[field.name]},
                        // {'is-valid': touched[field.name] && !errors[field.name]},
                    )}
                    options={options}
                    value={getValue()}
                    onChange={onChange}
                    isMulti={multiple}
                    closeMenuOnSelect={multiple ? false : true}
                    isDisabled={isDisabled}
                />
            }
            
            {/* {touched[field.name] && errors[field.name] && (
                <div className={`fv-plugins-message-container ${formStyle==='inline' ? "row" : ""}`}>
                    {formStyle==='inline' && <div className="col-sm-3"></div>}
                    <div className={`fv-help-block ${formStyle==='inline' ? "col-sm-9" : ""}`}>
                        <span role='alert' className="ps-2">{errors[field.name]}</span>
                    </div>
                </div>
            )} */}
        </div>
    );
}