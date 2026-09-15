import api from "@/services/api"

const getUser = async()=>{
    try {
        const response = await api.get('/api/v1/user/get/me');
        return response.data;
    } catch (error) {
        console.log(error)
    }
}
export default getUser