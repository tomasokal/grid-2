import './style.css'

import { StrictMode } from 'react'
import { Canvas } from '@react-three/fiber'
import { createRoot } from 'react-dom/client'

import Experience from './Experience'
import { OrbitControls } from '@react-three/drei'

const root = createRoot(document.querySelector('#root'))

root.render(
    <StrictMode>
        <Canvas>
            <OrbitControls />
            <Experience />
        </Canvas>
    </StrictMode>
)
