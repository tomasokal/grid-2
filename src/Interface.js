
import { Icon } from '@iconify/react'

import useIcon from './stores/useIcon'

export default function Interface()
{

    const clickIconRotate = useIcon((state) => state.clickIconRotate) 

    const linkClick = () => {
        location.href = `https://github.com/tomasokal`
    }

    return <div className="interface">

        <Icon 
            icon="uil:rotate-360" 
            onClick={clickIconRotate} 
        />
        <Icon 
            icon="uil:arrow"
            onClick={linkClick}
        />

    </div>

}
