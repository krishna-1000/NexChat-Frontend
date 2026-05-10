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
import { SiGooglegemini } from "react-icons/si";
import { toast } from 'react-toastify';
import { IoAirplane } from 'react-icons/io5';
import useChat from '../../hooks/useChat';
import { LoaderPinwheelIcon } from 'lucide-react';
import Avatar from './Avatar';


const GroupNavbar = () => {
    const currentGroupId = useSelector((state) => state.group.selectedGroup);
    const currentGroupName = useSelector((state) => state.group.groupName);
    const admin = useSelector((state) => state.group.selectedGroupAdmin);
    const { loading, error, summary, remainingChances } = useSelector((state) => state.summary);
    const groups = useSelector((state) => state.group.groups);
    const currentLoginUserName = localStorage.getItem("loginUserName")
    const currentLoginUserId = localStorage.getItem("loginUserId");
    const { deleteGroup, exitFromGroup } = useUser();
    const { summarizeGroupChat } = useChat();
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(currentLoginUserName + admin)
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

    const handleSummary = (currentGroupId) => {
        const summaryPromise = summarizeGroupChat(currentGroupId).then(res => res.data);

        toast.promise(
            summaryPromise,
            {
                pending: ' AI is analyzing your chat...',
                success: {
                    render({ data }) {
                        return (
                            <div className="flex flex-col gap-2">
                                <span className="font-bold border-b pb-1">Chat Summary</span>
                                <p className="text-xs leading-relaxed text-gray-700 dark:text-gray-300">
                                    {data.summary}
                                </p>
                            </div>
                        );
                    },
                    autoClose: false,
                    closeOnClick: false,
                },
                error: ' Failed to generate summary. Try again later.'
            }
        );
    }
    return (
        <div className='flex w-full justify-between h-15 bg-gray-900 text-white'>
            <div className='flex gap-2 min-h-full items-center w-45 '>
                <div className='flex justify-center items-center bg-cyan-700 rounded-2xl h-13 w-13'>

                    <div className='hover:cursor-pointer' onClick={() => {
                        dispatch(setType("GroupProfile"))
                        dispatch(setIsModalOpen(true))
                    }}>
                        <Avatar username={currentGroupName} />
                    </div>
                </div>
                <div className='flex flex-col  mt-2 '>
                    <label className='text-xl font-bold '>{currentGroupName}</label>
                </div>
            </div>
            <div className='flex gap-3 justify-center items-center'>
                <button className={`${summary ? 'visible' : 'hidden'}  font-bold bg-gray-500 rounded-2xl`} onClick={() => toast.info(summary?.summary)}>LastSummary</button>
                <div className='flex bg-gray-700 text-white gap-1  items-center rounded-2xl justify-cente'>
                    <span title='reaminig chances' className='hover:cursor-pointer text-xs font-extrabold'> {remainingChances}</span>
                    <button title="Summerize Chat" disabled={loading ? true : false} className='hover:cursor-pointer r ' onClick={() => handleSummary(currentGroupId)}><SiGooglegemini size={20} color='cyan' />
                    </button>

                </div>

                <div title='delete group'>
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
        </div>
    )
}

export default GroupNavbar
