import { toast } from "react-toastify";

export const getErrorMessage = (error) => {
    const response = error?.response;

    if (response?.data && typeof response.data === 'object') {

        return Object.values(response.data)[0];
    }

    if (response?.data && typeof response.data === 'string') {
        return response.data;
    }

    if (!response) {
        return "Network error: Server is unreachable.";
    }
    return error.message || "An unexpected error occurred.";
};