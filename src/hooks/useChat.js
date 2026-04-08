import { useDispatch, useSelector } from "react-redux"
import fetchChatService from "../service/chatService/fetchChatService";

const useChat = () => {
    const dispatch = useDispatch();
    
    try {
        
        const getChatroom = (id) => {
            fetchChatService(dispatch,id);
        }
        return { getChatroom }
    } catch (error) {
        console.log("CHAT HOOK" + error.message);
    }
}

export default useChat;