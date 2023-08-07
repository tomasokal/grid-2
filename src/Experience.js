import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

import Model  from './Model'
import useIcon from './stores/useIcon'
import Lights from './Lights'

export default function Experience()
{
  const ref = useRef()

  const clicked = useIcon((state) => state.iconRotate)

  useFrame((state, delta) => {
    ref.current.rotation.y = THREE.MathUtils.lerp(
      ref.current.rotation.y, 
      clicked ? ref.current.rotation.y += delta / 10 : ref.current.rotation.y += 0, 
      10
    )
  })

  return <>   

    <OrbitControls />
    <Lights />

        <group ref={ref}>
            <Model />
        </group>
          
  </>
}