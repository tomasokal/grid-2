
import { useRef } from "react"

export default function Lights()
{

    const keyLight = useRef()
    const fillLight = useRef()
    const backLight = useRef()

    return <>

        {/* Key Light */}
        <spotLight
            ref={keyLight} 
            color={"#ff992d"}
            intensity={100}
            angle={Math.PI / 8}
            distance={25}
            penumbra={1}
            decay={2}
            focus={1}
            castShadow
            position={ [-8, 8, -8] }      
        />

        {/* Fill Light */}
        <spotLight
            ref={fillLight} 
            color={"#54c5ff"}
            intensity={25}
            angle={Math.PI / 8}
            distance={25}
            penumbra={1}
            decay={2}
            focus={1}
            castShadow
            position={ [8, 8, 8] }      
        />

        {/* Back Light */}
        <spotLight
            ref={backLight} 
            color={"#2d4cff"}
            intensity={25}
            angle={Math.PI / 8}
            distance={35}
            penumbra={1}
            decay={2}
            focus={1}
            castShadow
            position={ [20, 2.5, -5] }      
        />
        
    </>
}
