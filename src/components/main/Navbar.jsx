import React from 'react'
import { FaBars } from "react-icons/fa";

const Navbar = ({setSidebar}) => {
    return (
        <div className='flex justify-between h-15 bg-red-900 text-white'>
            <div className='flex min-h-full bg-red-500'>
                <div className='flex gap-4 justify-center'>
                    <label onClick={()=>setSidebar(true)}><FaBars/></label>
                    <label>NextChat</label>
                </div>
            </div>
            <div className='flex gap-3'>
                <div>vo</div>
                <div>vi</div>
                <div>dot</div>

            </div>
        </div>
    )
}

export default Navbar
