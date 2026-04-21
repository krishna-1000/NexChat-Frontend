import { useDispatch, useSelector } from "react-redux"
import fetchChatService from "../service/chatService/fetchChatService";
import fetchGroupChatService from "../service/chatService/fetchGroupChatService";

const useChat = () => {
    const dispatch = useDispatch();
    const AllMessages = useSelector((state) => state.chat.chatMessages);
    const allroomId = useSelector((state) => state.chat.chatRoomsId);

    try {

        const getChatroom = (id) => {

            const currentChatRoomId = allroomId[id];
            if (currentChatRoomId) {
                return;

            }

            fetchChatService(dispatch, id);
        }
        const getChatroomGroup = (id) => {
            const currentChatRoomId = allroomId[id];
            if (currentChatRoomId) {
                return;

            }

            fetchGroupChatService(dispatch, id);
        }
        return { getChatroom, getChatroomGroup }
    } catch (error) {
        console.log("CHAT HOOK" + error.message);
    }
}

export default useChat;