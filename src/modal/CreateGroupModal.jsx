import React, { useState } from 'react'
import { createGroupApi } from '../api/user/createGroupApi';
import { useDispatch, useSelector } from 'react-redux'
import { appendGroup, setGroup, setGroupId, setGroupName } from '../features/chat/groupSlice';
import { FaUserMinus, FaUserPlus } from 'react-icons/fa6';
import { setIsModalOpen } from '../features/modal/modalSlice';

const CreateGroupModal = () => {
  const [inputData, setInputData] = useState("");
  const [members, setMembers] = useState([]);
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);

  const handleOnCreateGroup = async () => {
    if (!inputData) {
      return;
    }
    const adminName = localStorage.getItem("loginUser");
    const formData = {
      groupName: inputData,
      adminName: adminName,
      members : members
    }
    const data = await createGroupApi(formData)
    console.log(data)
    if (data) {
      dispatch(setGroupName(data.groupName))
      dispatch(setGroupId(data.groupId))
      dispatch(appendGroup({
        groupName: data.groupName,
        groupId: data.groupId
      }))
    }
    dispatch(setIsModalOpen(false))
  }

  const handleOnAddMember = (memberName) => {
    if (!memberName) return;
    setMembers((prev) => [...prev, memberName]);
  }
  return (
    <div className='flex flex-col bg-orange-300 w-full h-100 justify-between'>
      <div className='bg-red-400'>
        <label>Create Group</label>
        <div className='flex justify-between'>
          <label className='w-fit whitespace-nowrap'>Group Name</label>
          <input className='bg-black text-white w-full h-full' value={inputData} onChange={(e) => setInputData(e.target.value)} type='text'></input>
          <label className='bg-blue-600'>Add members</label>

        </div>
      </div>
      <div>
        <ul className='flex flex-col gap-2 overflow-y-scroll border-2 border-black'>
          {
            users && users.map((user) => (
              <li className='bg-cyan-300 flex justify-between hover:bg-gray-400' key={user.id}>
                <span> {user.username}</span>
                {
                  members.includes(user.id) ? <span><FaUserMinus className='bg-red-500' /></span>
                    : <span><FaUserPlus onClick={() => handleOnAddMember(user.id)} className='bg-green-500' /></span>
                }

              </li>
            ))
          }
        </ul>
      </div>

      <div>
        <button className='bg-green-500 ' onClick={() => handleOnCreateGroup()}>Create Group</button>
      </div>

    </div>
  )
}

export default CreateGroupModal
