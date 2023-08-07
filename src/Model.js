
import { useGLTF } from '@react-three/drei'

export default function Model()
{
    const model = useGLTF('./vintage_boiler.glb')
    
    return <>
        <primitive object={ model.scene } scale={ 2.5 } position-y={ -5 } />
        {/* <object={ model.scene } scale={ 2.5 } position-y={ -5 } /> */}
    </>
}

useGLTF.preload('./vintage_boiler.glb')
