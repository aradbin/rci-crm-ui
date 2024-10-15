import { toAbsoluteUrl } from "../../../_metronic/helpers"

const AvatarComponent = ({avatar = '', name = 'N', style = 'square', size = '50', fontSize = '2', classNames = ''}) => {
    return (
        <div className={`symbol symbol-${style} symbol-${size}px ${classNames}`}>
            {avatar ? 
                <img src={avatar || toAbsoluteUrl('/media/avatars/blank.png')} alt={name} title={name} />
            :
                <div className={`symbol-label fs-${fontSize} fw-bold text-success`}>{name[0]?.toUpperCase()}</div>
            }
        </div>
    )
}

export {AvatarComponent}