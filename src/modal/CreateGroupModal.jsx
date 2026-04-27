import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { appendGroup, setGroup, setGroupId, setGroupName } from '../features/chat/groupSlice';
import { FaUserMinus, FaUserPlus } from 'react-icons/fa6';
import { setIsModalOpen } from '../features/modal/modalSlice';
import useUser from '../hooks/useUser';
import { toast } from 'react-toastify';

const CreateGroupModal = () => {
  const [inputData, setInputData] = useState("");
  const [members, setMembers] = useState([]);
  const dispatch = useDispatch();
  const loginUserId = localStorage.getItem("loginUserId")
  const { users } = useSelector((state) => state.user);
  const adminName = localStorage.getItem("loginUserName")
  const { createGroup } = useUser();
  const {loading} = useSelector((state)=>state.group.loading);

  const handleOnCreateGroup = async () => {
    if (!inputData || !adminName) {
      return;
    }
    const formData = {
      groupName: inputData,
      adminName: adminName,
      members: members
    }
    try {
      await createGroup(formData);
      toast.success("group created with name "+inputData)
    } catch (error) {
      toast.error(error)
    }

  }

  const handleOnAddMember = (memberName) => {
    if (!memberName) return;
    setMembers((prev) => [...prev, memberName]);
  }
  const handleOnRemoveMember = (memberId) => {
    if (!memberId) return;
    const newMembersList = members.filter((member) => member != memberId);
    setMembers(newMembersList);
  }
  return (
    <div className='flex flex-col  w-full  h-100 justify-between'>
      <header className=' h-20 flex flex-col gap-3 pl-1 mt-1'>
        <div className='flex gap-2 h-full'>
          <label className='w-fit whitespace-nowrap  font-mono h-full  flex justify-center items-center'>Group Name</label>
          <input placeholder='type group name ...' className='text-cyan-100 bg-gray-700 font-mono placeholder-gray-600 outline-none rounded-2xl font-semibold text-lg w-full h-full' type='text'
            name='groupName' value={inputData} onChange={(e) => setInputData(e.target.value)} ></input>
        </div>
        <div className=' pl-1s '>
          <label className='bg-gray-700 rounded-2xl pl-1 pr-5'>Total members : <span>{members.length}</span></label>
        </div>
      </header>
      <div className='flex-1  mb-1 ml-1 border-t border-gray-500 border-b mt-2 overflow-auto'>
        <ul className='flex flex-col gap-2 mt-1 overflow-auto '>
          {
            users && users.map((user) => {
              if (user.id == loginUserId) {
                return null;
              }
              return (
                <li className=' h-10 flex justify-between items-center hover:bg-gray-700 rounded-md' key={user.id}>
                  <span> {user.username}</span>
                  {
                    members.includes(user.id) ? <span className='mr-2'><FaUserMinus size={20} onClick={() => handleOnRemoveMember(user.id)} className='bg-red-500' /></span>
                      : <span className='mr-2'><FaUserPlus size={20} onClick={() => handleOnAddMember(user.id)} className='bg-green-500' /></span>
                  }

                </li>
              )

            })
          }
        </ul>
      </div>

      <div className=' text-center mb-1'>
        <button className={`${!loading?'bg-gray-400':'bg-green-500'} self-center rounded-md pl-2 pr-2`} onClick={() => handleOnCreateGroup()}>
          {loading?'Creating....':'Creat'
          }
          </button>
      </div>

    </div>
  )
}

export default CreateGroupModal
