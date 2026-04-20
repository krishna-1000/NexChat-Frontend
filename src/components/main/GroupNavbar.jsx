import React, { useEffect } from 'react'
import { FaDotCircle } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import useUser from '../../hooks/useUser';
import { setGroup, setSelectedGroup } from '../../features/chat/groupSlice';
import { MdCall, MdDeleteOutline } from 'react-icons/md';
import { IoIosVideocam, IoMdExit } from 'react-icons/io';
import { CiAlarmOn } from 'react-icons/ci';
import { HiOutlineDotsVertical } from "react-icons/hi";


const GroupNavbar = () => {
    const currentGroupId = useSelector((state) => state.group.selectedGroup);
    const currentGroupName = useSelector((state) => state.group.groupName);
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
        <div className='flex w-full justify-between h-15 bg-gray-900 text-white'>
            <div className='flex gap-2 min-h-full items-center w-45 '>
                <div className='flex justify-center items-center bg-cyan-700 rounded-2xl h-13 w-13'>
                    <CiAlarmOn size={40} />
                </div>
                <div className='flex flex-col  mt-2 '>
                    <label className='text-xl font-bold '>{currentGroupName}</label>
                    <div className='text-sm truncate'>xl ksdut user</div>
                </div>
            </div>
            <div className='flex gap-3 justify-center items-center'>
                {
                    (currentLoginUserName == admin) ? <MdDeleteOutline color='red' onClick={() => {
                        const ans = window.confirm("do you want to delete group?")
                        if (ans) {
                            handleOnDeleteGroup()
                        }
                    }} size={25} /> : <IoMdExit onClick={() => {
                        const ans = window.confirm("do you want to delete group?")
                        if (ans) {
                            handleOnExitFromGroup()
                        }
                    }}  color='red' size={25} />
                }
                <div><HiOutlineDotsVertical />
                </div>

            </div>
        </div>
    )
}

export default GroupNavbar
