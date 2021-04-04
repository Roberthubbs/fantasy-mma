import axios from 'axios';
const allHeaders = {
    "Access-Control-Allow-Origin": "*"
};
export const receiveAll = async () => {
    return await axios.request('/all', {
        data: "",
        method: "post",
        headers: allHeaders
    });
}