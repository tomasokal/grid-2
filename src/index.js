import './style.css'
import * as ReactDOM from 'react-dom/client'
import { StrictMode, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'

import Experience from './Experience.js'
import Interface from './Interface'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <StrictMode>
        <Canvas
            shadows
            camera={ {
                fov: 45,
                near: 0.1,
                far: 100,
                position: [ 0, 15, 20 ]
            } }>
            <Suspense fallback={null}>
                <Experience /> 
            </Suspense>  
        </Canvas>
        <Interface />
    </StrictMode>
)