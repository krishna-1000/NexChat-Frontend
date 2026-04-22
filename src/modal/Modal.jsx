import React from 'react'
import ReactDOM from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setIsModalOpen } from '../features/modal/modalSlice';
import VoiceCallModal from './CallModal/VoiceCallModal';
import VideoCallContainer from '../containers/VideoCallContainer';
import CreateGroupModal from './CreateGroupModal';
import { GiCrossMark } from 'react-icons/gi';
import useVideoCall from '../hooks/useVideoCall';
import Profile from './Profile';
import GroupProfile from './GroupProfile';
const Modal = () => {
    const { isModalOpen, type } = useSelector((state) => state.modal);
    const {callData} = useSelector((state)=>state.call.callData);
    const dispatch = useDispatch();
    const loginUser = useSelector((state)=>state.profile.loginUserName);
    const { declineCall, HangUpCall } = useVideoCall();

    if (!isModalOpen || !type) return null;

    const render = () => {
        switch (type) {
            case "video-call":
                return <VideoCallContainer />
            case "incoming-call":
                return <VideoCallContainer />
            case "create-group":
                return <CreateGroupModal />
            case "voice-call":
                return <VideoCallContainer />
            case "Profile":
                return <Profile />
            case "GroupProfile":
                return <GroupProfile />
            default:
                return null;
        }
    }

    const handleOnCloseModal = () => {
        if (type == "incoming-call") {
            declineCall(loginUser, callData.sender)
        }
        else if (type == "video-call") {
            HangUpCall(loginUser, callData.sender)
            dispatch(setIsModalOpen(false))
        }

        dispatch(setIsModalOpen(false))
    }
    return ReactDOM.createPortal(


        <div
            className="fixed inset-0 flex items-center justify-center 
                  backdrop-blur-sm p-4 animate-in fade-in duration-900"
            onClick={() => {
                if (type != "video-call") {
                    handleOnCloseModal()
                }
            }}
        >
            <div onClick={(e) => e.stopPropagation()} className='p-2 shadow-2xl shadow-white z-999 rounded-2xl max-h-screen h-fit w-fit max-w-full bg-gray-900 text-white flex-col '>
                <div className=' flex justify-between border-b border-gray-500'>
                    <label className='text-center mb-2 font-bold'>{type}</label>
                    <span onClick={() => handleOnCloseModal()}><GiCrossMark /></span>
                </div>
                <div className='text-white'>
                    {render()}
                </div>


            </div>

        </div>
        , document.getElementById('modal-root'))
}

export default Modal
