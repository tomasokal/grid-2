
import create from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

export default create(subscribeWithSelector((set) =>
{
    
    return {

        iconRotate: 0,
        clickIconRotate: () => set(state => ({ iconRotate: !state.iconRotate })),

    }

}))