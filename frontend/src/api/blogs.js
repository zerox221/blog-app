import api from "@/services/api";
export const fetchBlogs = async (page = 1,sort="recent") => {
    const response = await api.get(`/api/v1/user/get/all/blogs/?page=${page}&sort=${sort}`);
    return response.data;
  
};
export const searchBlogs = async(search)=>{
    const response = await api.get(`/api/v1/user/search/blogs/?search=${search}`)
    return response.data
}
