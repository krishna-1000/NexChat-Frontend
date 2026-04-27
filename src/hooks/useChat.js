import { useDispatch, useSelector } from "react-redux"
import { fetchPrivateRoomApi } from "../api/chat/privateChatApi";
import { fetchGroupApi } from "../api/chat/groupApi";
import { setUserError, setUserLoading } from "../features/user/userSlice";
import { setChatError, setChatLoading, setChatMessages, setChatRoomsId, setselectedChatroomId } from "../features/chat/chatSlice";
import { setGroupAdmin } from "../features/chat/groupSlice";
import { asArray, asObject } from "../utils/dataResolver";
import { toast } from 'react-toastify'
const useChat = () => {
    const dispatch = useDispatch();
    const AllMessages = useSelector((state) => state.chat.chatMessages);
    const allroomId = useSelector((state) => state.chat.chatRoomsId);


    const getChatroom = async (id) => {
        const isRoomAlreadyFetched = allroomId[id];
        if (isRoomAlreadyFetched) {
            return;
        }

        try {
            dispatch(setChatLoading(true));
            const response = await fetchPrivateRoomApi(id);

            const responseId = response?.data.id
            const validMessages = response?.data.messages

            if (responseId) {
                dispatch(setselectedChatroomId(responseId));
                dispatch(setChatRoomsId({ userId: id, chatRoomId: responseId }));
                dispatch(setChatMessages({ roomId: responseId, messages: validMessages }));
            }
            else {
                throw ("Response is with emtyp Data")
            }



        } catch (error) {
            dispatch(setChatError(error))
            toast.error(error);
        }
        finally {
            dispatch(setUserLoading(false))
        }
    }

    const getChatGroup = async (groupId) => {
        const isGroupChatFetched = allroomId[groupId];
        if (isGroupChatFetched) {
            return;
        }

        try {
            dispatch(setChatLoading(true));
            const response = await fetchGroupApi(groupId);
            const { id, createdBy, messages = {} } = response.data
            if (id) {
                dispatch(setChatRoomsId({ userId: groupId, chatRoomId: id }));
                dispatch(setGroupAdmin(createdBy))
                dispatch(setChatMessages({ roomId: id, messages: messages }));
            }
            else {
                throw "group id not sent from server side";
            }
        } catch (error) {
            dispatch(setChatError(error.message))
            throw error
        }
        finally {
            dispatch(setChatLoading(false))
        }
    }
    return { getChatroom, getChatGroup }

}

export default useChat;