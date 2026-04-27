import React, { useEffect } from 'react'
import { FaDotCircle } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import useUser from '../../hooks/useUser';
import { setGroup, setSelectedGroup } from '../../features/chat/groupSlice';
import { MdCall, MdDeleteOutline } from 'react-icons/md';
import { IoIosVideocam, IoMdExit } from 'react-icons/io';
import { CiAlarmOn } from 'react-icons/ci';
import { HiOutlineDotsVertical } from "react-icons/hi";
import { setIsModalOpen, setType } from '../../features/modal/modalSlice';
import { toast } from 'react-toastify';


const GroupNavbar = () => {
    const currentGroupId = useSelector((state) => state.group.selectedGroup);
    const currentGroupName = useSelector((state) => state.group.groupName);
    const admin = useSelector((state) => state.group.selectedGroupAdmin);
    const groups = useSelector((state) => state.group.groups);
    const currentLoginUserName = localStorage.getItem("loginUserName")
    const currentLoginUserId = localStorage.getItem("loginUserId");
    const { deleteGroup, exitFromGroup } = useUser();
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(currentLoginUserName, admin)
    }, [])
    const handleOnDeleteGroup = async () => {
        try {
            const res = await deleteGroup(currentGroupId);
            const newGroups = groups.filter((group) => group.groupId != currentGroupId)
            dispatch(setGroup(newGroups));
            dispatch(setSelectedGroup(""))
            toast.success("group deleted")
        } catch (error) {
            toast.error(error)
        }

    }

    const handleOnExitFromGroup = async () => {
        try {
            const res = await exitFromGroup(currentLoginUserId, currentGroupId);
            const newGroups = groups.filter((group) => group.groupId != currentGroupId)
            dispatch(setGroup(newGroups));
            dispatch(setSelectedGroup(""))
            toast.success("exit successfully")
        } catch (error) {
            toast.error(error)
        }


    }
    return (
        <div className='flex w-full justify-between h-15 bg-gray-900 text-white'>
            <div className='flex gap-2 min-h-full items-center w-45 '>
                <div className='flex justify-center items-center bg-cyan-700 rounded-2xl h-13 w-13'>
                    <CiAlarmOn onClick={() => {
                        dispatch(setType("GroupProfile"))
                        dispatch(setIsModalOpen(true))
                    }} size={40} />
                </div>
                <div className='flex flex-col  mt-2 '>
                    <label className='text-xl font-bold '>{currentGroupName}</label>
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
                    }} color='red' size={25} />
                }


            </div>
        </div>
    )
}

export default GroupNavbar
