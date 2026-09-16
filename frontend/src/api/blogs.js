import api from "@/services/api";
import {
  setProfileLoading,
  setTotalArticles,
  setPrivateArticles,
  setTotalNoOfArticles,
  setPublicArticles,
  setRating,
} from "../Store/ProfileSlice";


export const fetchBlogs = async (page = 1, sort = "recent") => {
  const response = await api.get(
    `/api/v1/user/get/all/blogs/?page=${page}&sort=${sort}`,
  );
  return response.data;
};

export const searchBlogs = async (search) => {
  const response = await api.get(`/api/v1/user/search/blogs/?search=${search}`);
  return response.data;
};


async function fetchUserInformation() {
    try {
        const response = await api.get('/api/v1/user/profile/information');
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const fetchProfileDetails = async (dispatch) => {
  dispatch(setProfileLoading(true));
  try {
    const data = await fetchUserInformation();
    console.log("profile data:", data);

    dispatch(setTotalArticles(data?.blogs || []));
    dispatch(setPrivateArticles(data?.privateCount || 0));
    dispatch(setTotalNoOfArticles(data?.totalBlogs || 0));
    dispatch(setPublicArticles(data?.publicCount || 0));
    dispatch(setRating(4.4));

    return data;
  } catch (error) {
    console.log("Error while fetching profile details:", error.message);

    throw error;
  } finally {
    dispatch(setProfileLoading(false));
  }
};
