import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getUser from "./api/auth";
import { setError, setLoading, setUser } from "./Store/User.slice";
import { fetchProfileDetails } from "./api/blogs";

const Fetchdata = ({ children }) => {
  const { user, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  async function fetchUser() {
    dispatch(setLoading(true));
    try {
      const data = await getUser();
      dispatch(setUser(data.user));
    } catch (error) {
      console.log("error is here:", error.message);
      dispatch(
        setError(
          error.response?.data?.message ||
            "Session expired. Please login again",
        ),
      );
      dispatch(setUser(null));
    } finally {
      dispatch(setLoading(false));
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    fetchProfileDetails(dispatch);
  }, []);

  return children;
};

export default Fetchdata;
