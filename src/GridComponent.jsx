import { cloneElement, useEffect, useState } from 'react'
import * as THREE from 'three'

export default function GridComponent(props)
{

    // Pull in and deconstruct props from above.
    const { gap, row, col } = props

    // Set up state for neighbor grid cells
    const [neighborCells, setNeighborCells] = useState({})
    const [pathCells, setPathCells] = useState({})

    const [start, setStart] = useState([0, 0])
    const [end, setEnd] = useState([1, 1])

    // Create function for interaction click based on row and col
    const handleLeftClick = (row, col) => {
        setStart([row, col])
    }

    // Create function for interaction click based on row and col
    const handleRightClick = (row, col) => {
        setEnd([row, col])
    }

    // Run findPath algorithm here whenever start or end changes and on mount.
    useEffect(() => {
        const path = findPath('bfs', start, end, row, col)
        setPathCells(path)
    }, [start, end])

    // Grid is set up and rendered based on type, then pushed.
    const grid = []

    // Helper items to calculate radius and inradius.
    // This is needed because grid cells are actually regular polygons.
    const radius = 1
    const inradius = radius / 2
    const a = 2 * inradius * Math.tan(Math.PI / 3)

    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            grid.push(
                <InteractionEffects
                    row={i}
                    col={j}
                    onLeftClick={handleLeftClick}
                    onRightClick={handleRightClick}
                    start={start}
                    end={end}
                    path={pathCells}
                >
                    <HexagonCell i={i} j={j} gap={gap} />
                </InteractionEffects>
            )
        }
    }
    
    return <>

        <group>
            {grid}
        </group>

    </>

}

function HexagonCell(props)
{

    const { i, j, gap, color } = props

    const position = HexagonPosition(i, j, gap)

    return <>

        <mesh position={position}>
            <cylinderGeometry args={[1, 1, 0.25, 6]} />
            <meshBasicMaterial color={color} />
        </mesh>

    </>

}

function HexagonPosition(i, j, gap)
{

    // Position is set by the center of the cell.
    // For the x axis, we multiply the unit by the square root of 3 and add the gap
    // We then multiply by i and add j % 2 * 0.5
    // This is because every other row is shifted by half the unit because of the rotation of the hexagon
    // For the z axis, we multiply the unit by 1.5 and add the gap
    const position=[
        (i + j % 2 * 0.5) * (Math.sqrt(3) + gap),
        0,
        j * (1.5 + gap)
    ]

    return position

}

function getHexagonNeighbors(q, r) {

    return [
        r % 2 ? [q + 1, r] : [q + 1, r],
        r % 2 ? [q, r - 1] : [q - 1, r - 1],
        r % 2 ? [q + 1, r - 1] : [q, r - 1],
        r % 2 ? [q - 1, r] : [q - 1, r],
        r % 2 ? [q + 1, r + 1] : [q, r + 1],
        r % 2 ? [q, r + 1] : [q - 1, r + 1]
    ]

}

// function InteractionEffects({ row, col, neighborCells, onClick, children })
// {

//     const [hovered, setHovered] = useState(false)
//     const [neighbor, setNeighbor] = useState(false)
  
//     // Define your hover logic here
//     const colorOnHover = hovered ? 'blue' : 'red'

//     const handleClick = () => {
//         onClick(row, col)
//     }

//     useEffect(() => {
//         setNeighbor(containsArray(neighborCells, [row, col]))
//     }, [neighborCells])
  
//     return <>

//         <group
//             position={neighbor ? [0, 1, 0] : [0, 0, 0]}
//             onPointerEnter={() => setHovered(true)}
//             onPointerLeave={() => setHovered(false)}
//             onClick={handleClick}
//         >
//             {cloneElement(children, { color: colorOnHover })}
//         </group>
    
//     </>
// }

function InteractionEffects({ row, col, onLeftClick, onRightClick, start, end, path, children })
{

    console.log(path)

    let color = '#CECBC4'

    if (row === start[0] && col === start[1]) {
        color = '#3E4163'
    }

    if (row === end[0] && col === end[1]) {
        color = '#5E4B3D'
    }

    if (containsArray(path, [row, col])) {
        color = '#906030'
    }

    const handleLeftClick = () => {
        onLeftClick(row, col)
    }

    const handleRightClick = () => {
        onRightClick(row, col)
    }   
  
    return <>

        <group
            position={[0, 0, 0]}
            onClick={handleLeftClick}
            onContextMenu={handleRightClick}
        >
            {cloneElement(children, { color: color })}
        </group>
    
    </>
}

function containsArray(objOfArrays, targetArray)
{

    for (const key in objOfArrays) {
        if (Array.isArray(objOfArrays[key])) {
            const array = objOfArrays[key]
            if (JSON.stringify(array) === JSON.stringify(targetArray)) {
                return true
            }
        }
    }

    return false
}

function findPath(algorithm, start, end, row, col)
{

    if (algorithm === 'bfs') 
    {
        return findPathBFS(start, end, row, col)
    }

}

function findPathBFS(start, end, row, col)
{

    console.log(start, end)

    const queue = []
    const visited = []
    const cameFrom = {}
    const path = {}

    queue.push(start)
    visited.push(start)
    cameFrom[start] = null

    while (queue.length > 0) {
        
        const current = queue.shift()
        
        if (current[0] === end[0] && current[1] === end[1]) {
            console.log("Found end")
            break
        }
        
        const neighbors = getHexagonNeighbors(current[0], current[1])

        for (const neighbor of neighbors) {
            // Only check if neighbor is in bounds of row and col
            if (neighbor[0] >= 0 && neighbor[0] < row && neighbor[1] >= 0 && neighbor[1] < col)
            {
                if (!containsArray(visited, neighbor)) {
                    queue.push(neighbor)
                    visited.push(neighbor)
                    cameFrom[neighbor] = current
                }
            }
        }

    }

    // Find path
    let current = end
    while (current !== start) {
        path[current] = cameFrom[current]
        current = cameFrom[current]
    }

    return path

}