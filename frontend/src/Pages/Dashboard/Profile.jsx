import ProfileFilter from "@/components/profile/ProfileFilter";
import ProfileInfo from "@/components/profile/ProfileInfo";
import UserArticles from "@/components/profile/UserArticles";
import api from "@/services/api";
import React, { useEffect, useState } from "react";

const Profile = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalArticles, setTotalArticles] = useState(0);
  const [privateArticles, setPrivateArticles] = useState(0);
  const [publicArticles, setPublicArticles] = useState(0);
  const [filter, setFilter] = useState("All");

  async function fetchUserInformation() {
    try {
      const response = await api.get("api/v1/user/user/profil/info");
      console.log(response.data);
      setArticles(response.data.blogs);
      setTotalArticles(response.data.blogs.length);
      setPrivateArticles(response.data.privateCount);
      setPublicArticles(response.data.publicCount);
    } catch (error) {
      console.log(error);
    }
  }

  console.log("filter : ",filter);
  const privateBlogs = privateArticles;
  const publicBlogs = publicArticles;

  useEffect(() => {
    fetchUserInformation();
  }, []);

  

  return (
    <div className="min-h-screen w-full flex flex-col gap-5 px-3 py-8 bg-[#F9F9F9] md:py-12 md:px-18">
      <ProfileInfo
        privateArticles={privateArticles}
        publicArticles={publicArticles}
        totalArticles={totalArticles}
      />
      <ProfileFilter filter={filter} setFilter={setFilter} />
      <div className="flex flex-col gap-5">
        <span className="font-medium ">Your Articles</span>
        <div className="flex flex-col md:flex-row flex-wrap justify-around gap-5 w-full">
        {
          filter==="All" ? articles.length!==0 ?
          articles?.map((article,idx)=>{
            return <UserArticles key={idx} article = {article}/>
          }) : "no blog created"
          :null
        }
        {
          filter==="Private" ?  privateBlogs?.length!==0 ?
          privateBlogs?.map((article,idx)=>{
            return <UserArticles key={idx} article = {article}/>
          }) : "no blog created"
          :null
        }
        {
          filter==="Public" ? publicBlogs?.length!==0 ?
          publicBlogs?.map((article,idx)=>{
            return <UserArticles key={idx} article = {article}/>
          }) : "no blog created"
          :null
        }
        </div>
      </div>
    </div>
  );
};

export default Profile;
