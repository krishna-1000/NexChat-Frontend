import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const ChatNavbar = ({member}) => {
    let user = useSelector(state => state.user.users.find((u)=> u.username == member));
 
    return (
    
        <div className='flex w-full justify-between h-15 bg-red-900 text-white'>
            <div className='flex min-h-full bg-red-500'>
                <div className='flex-col  justify-start items-center'>

                    <label>{user.username}</label>
                    <label>{user.email}</label>
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

export default ChatNavbar
