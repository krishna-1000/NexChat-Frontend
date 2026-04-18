import { createGroupApi } from "../../api/user/createGroupApi"

const createGroup = async (data) => {

    console.info(data)
    return await createGroupApi(data);

}
export default  createGroup;