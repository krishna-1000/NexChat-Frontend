import React from 'react'
import ReactDOM from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setIsModalOpen } from '../features/modal/modalSlice';
import VoiceCallModal from './CallModal/VoiceCallModal';
import VideoCallContainer from '../containers/VideoCallContainer';
import CreateGroupModal from './CreateGroupModal';
const Modal = () => {
    const { isModalOpen,type, data } = useSelector((state) => state.modal);
    const dispatch = useDispatch();

    if (!isModalOpen || !type) return null;

    const render = () => {
        switch (type) {
            case "video-call":
                return <VideoCallContainer />
            case "incoming-call":
                return <VideoCallContainer />
            case "create-group":
                return <CreateGroupModal />
            default:
                return null;
        }
    }

    const handleOnCloseModal = () => {
        dispatch(setIsModalOpen(false))
    }
    return ReactDOM.createPortal(
        <div className='fixed top-10 left-90 min-h-100 min-w-100  h-fit w-fit bg-black text-white flex-col '>
            <div className='black flex justify-between'>
                <label>Modal Name</label>
                <span onClick={() => handleOnCloseModal()}>X</span>
            </div>
            <div className='text-white'>
                {render()}
            </div>


        </div>, document.getElementById('modal-root'))
}

export default Modal
