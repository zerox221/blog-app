import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getUser from "./api/auth";
import { setError, setLoading, setUser } from "./Store/User.slice";

const Fetchdata = ({ children }) => {
  const { user, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchUser() {
  try {
    const data = await getUser();
    dispatch(setUser(data.user));
  } catch (error) {
    console.log("error is here:", error.message);
    dispatch(
      setError(
        error.response?.data?.message ||
          "Session expired. Please login again"
      )
    );
    dispatch(setUser(null));
  } finally {
    
    dispatch(setLoading(false));
  }
}

fetchUser();
  }, []);
  return children;
};

export default Fetchdata;
