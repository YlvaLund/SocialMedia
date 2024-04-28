import React, { useEffect, useState } from "react";
import { fetchPosts } from "../../client/fetchPosts";
import { useNavigate } from "react-router-dom";
import SocialCard from "../../components/SocialCard";

export default function Posts() {
  const [allPosts, setAllPosts] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const res = await fetchPosts();
        console.log(res);
        if (res.status === 200 && res.data?.length > 0) {
          setAllPosts(res.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchAllPosts();

    return () => {
      setAllPosts([]);
    };
  }, []);
  return (
    <>
      <button
        id="addNewPost"
        onClick={() => {
          console.log("new post");
          nav("/posts/new");
        }}
      >
        <i className="fa-solid fa-plus"></i>
      </button>
      <div className="posts__container">
        {allPosts.map((p) => {
          return <SocialCard key={p.id} post={p} />;
        })}
      </div>
      {allPosts?.length > 0 && (
        <button type="button" onClick={() => {}}>
          Load more!
        </button>
      )}
    </>
  );
}
