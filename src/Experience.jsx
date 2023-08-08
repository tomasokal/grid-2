
import { Center, Stage } from '@react-three/drei'
import { useControls } from 'leva'

import GridComponent from './GridComponent'

export default function Experience()
{

    const { rows, columns, gap} = useControls(
        { 
            rows: {
                value: 13,
                min: 1,
                max: 21,
                step: 1,
            }, 
            columns: {
                value: 7,
                min: 1,
                max: 21,
                step: 1,
            },
            gap: {
                value: 0.25,
                min: 0.01,
                max: 1,
                step: 0.01,
            }
        }
    )
    
    return <>

        <Stage
            environment={null}
        >
            <GridComponent 
                gap={gap}
                row={rows}
                col={columns}
            />
        </Stage>

    </>

}
