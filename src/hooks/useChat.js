import { useDispatch, useSelector } from "react-redux"
import fetchChatService from "../service/chatService/fetchChatService";
import fetchGroupChatService from "../service/chatService/fetchGroupChatService";

const useChat = () => {
    const dispatch = useDispatch();
    const AllMessages = useSelector((state)=>state.chat.chatMessages);


    try {

        const getChatroom = (id) => {
    
            fetchChatService(dispatch, id);
        }
        const getChatroomGroup = (id) => {
            fetchGroupChatService(dispatch, id);
        }
        return { getChatroom ,getChatroomGroup}
    } catch (error) {
        console.log("CHAT HOOK" + error.message);
    }
}

export default useChat;