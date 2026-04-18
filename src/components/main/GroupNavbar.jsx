import React, { useEffect } from 'react'
import { FaDotCircle } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import useUser from '../../hooks/useUser';
import { setGroup, setSelectedGroup } from '../../features/chat/groupSlice';

const GroupNavbar = () => {
    const currentGroupId = useSelector((state) => state.group.selectedGroup);
    const admin = useSelector((state) => state.group.selectedGroupAdmin);
    const groups = useSelector((state) => state.group.groups);
    const currentLoginUserName = localStorage.getItem("loginUser");
    const currentLoginUserId = localStorage.getItem("loginUserId");
    const { deleteGroup, exitFromGroup } = useUser();
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(currentLoginUserName, admin)
    }, [])
    const handleOnDeleteGroup = () => {
        const res = deleteGroup(currentGroupId);
        const data = res.then(r => alert(r.data));
        const newGroups = groups.filter((group) => group.groupId != currentGroupId)
        dispatch(setGroup(newGroups));
        dispatch(setSelectedGroup(""))
    }

    const handleOnExitFromGroup = () => {
        const res = exitFromGroup(currentLoginUserId, currentGroupId);
        const data = res.then(r => alert(r.data));
        const newGroups = groups.filter((group) => group.groupId != currentGroupId)
        dispatch(setGroup(newGroups));
        dispatch(setSelectedGroup(""))

    }
    return (
        <div className='flex w-full justify-between h-15 bg-red-900 text-white'>
            <div className='flex min-h-full bg-red-500'>
                <div className='flex gap-4 justify-center'>

                    GroupNavbar
                </div>
            </div>
            <div className='flex gap-3'>
                {
                    (currentLoginUserName == admin) ? <div onClick={() => handleOnDeleteGroup()} className='cursor-pointer' >delete</div>
                        : <div onClick={() => handleOnExitFromGroup()} className='cursor-pointer' >exit</div>

                }

                <div className='cursor-pointer' >vo</div>
                <div >vi</div>
                <div className='cursor-pointer'><FaDotCircle /></div>

            </div>
        </div>
    )
}

export default GroupNavbar
