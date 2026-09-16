import ProfileFilter from "@/components/profile/ProfileFilter";
import ProfileInfo from "@/components/profile/ProfileInfo";
import UserArticles from "@/components/profile/UserArticles";
import api from "@/services/api";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const [articles, setArticles] = useState([]);
  const [filter, setFilter] = useState("All");
  const {totalArticles, privateArticles, publicArticles, totalNoOfArticles,rating} = useSelector(
    (state) => state.profile,
  );

  console.log("filter : ", filter);
  const privateBlogs = privateArticles;
  const publicBlogs = publicArticles;


  return (
    <div className="min-h-screen w-full flex flex-col gap-5 px-3 py-8 bg-[#F9F9F9] md:py-12 md:px-18">
      <ProfileInfo
        privateArticles={privateArticles}
        publicArticles={publicArticles}
        totalArticles={totalNoOfArticles}
        rating={rating}
      />
      <ProfileFilter filter={filter} setFilter={setFilter} />
      <div className="flex flex-col gap-5">
        <span className="font-medium ">Your Articles</span>
        <div className="flex flex-col md:flex-row flex-wrap justify-around gap-5 w-full">
          {filter === "All"
            ? totalArticles.length !== 0
              ? totalArticles?.map((article, idx) => {
                  return <UserArticles key={idx} article={article} />;
                })
              : "no blog created"
            : null}
          {filter === "Private"
            ? privateBlogs?.length !== 0
              ? privateBlogs?.map((article, idx) => {
                  return <UserArticles key={idx} article={article} />;
                })
              : "no blog created"
            : null}
          {filter === "Public"
            ? publicBlogs?.length !== 0
              ? publicBlogs?.map((article, idx) => {
                  return <UserArticles key={idx} article={article} />;
                })
              : "no blog created"
            : null}
        </div>
      </div>
    </div>
  );
};

export default Profile;
