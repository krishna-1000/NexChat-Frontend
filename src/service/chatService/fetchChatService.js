import { fetchChatroom } from "../../api/chat/chatApi";
import { setChatMessages, setChatRoomId } from "../../features/chat/chatSlice";
import { setError, setLoading } from "../../features/user/userSlice"

const fetchChatService = async (dispatch, recieverId) => {

    

    try {
        dispatch(setLoading(true));
        const chat = await fetchChatroom(recieverId);
        if (chat.data) {
            dispatch(setChatRoomId(chat.data.id));
            dispatch(setChatMessages({ roomId: chat.data.id, messages: chat.data.messages }));
        }
        console.log(chat.data)
    } catch (error) {
        dispatch(setError(error.message))
        console.log(error.message)
    }
    finally {
        dispatch(setLoading(false))
    }

}

export default fetchChatService;