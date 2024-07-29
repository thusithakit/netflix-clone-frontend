import React from 'react'
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Loading() {
    return (
        <div className='LoadingScreen'>
            <AiOutlineLoading3Quarters className='loading-icon' size={100} />
        </div>
    )
}

export default Loading
