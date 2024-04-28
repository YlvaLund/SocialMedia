import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchPostById } from "../../client/fetchPosts";
import { getProfile } from "../../storage/token";
import { createNewPost, updatePost, deletePost, createNewComment } from "../../client/fetchPosts";
import Button from "../../components/Button";

export default function Post() {
  const [postData, setPostData] = useState({});
  const [comment, setComment] = useState("");
  const myProfile = getProfile();
  const { id } = useParams();

  let edit = myProfile?.name === postData?.author?.name;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(postData);
      // Need to split the tags.

      if (edit) {
        // Update post
        const res = await updatePost(postData);
        console.log(res);
      } else {
        // New post
        let newTags = postData?.tags?.split(" ") ?? [];
        postData.tags = newTags;
        const res = await createNewPost(postData);
        console.log(res);
      }
    } catch (err) {
      console.log(err);
      console.log(err.response);
    }
  };

  useEffect(() => {
    const completeFetch = async () => {
      try {
        const res = await fetchPostById(id);
        setPostData(res?.data);
      } catch (err) {
        console.error(err?.response ?? err?.message ?? err);
      }
    };

    if (id) {
      completeFetch();
    }
  }, [id]);

  if (!id || id === "new" || edit) {
    return (
      <div>
        <h1>{edit ? "Edit Post" : "Create new Post"}</h1>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div>
            <form style={{ display: "flex", flexDirection: "column", padding: "12px" }} onSubmit={handleSubmit}>
              <label style={{ display: "flex", flexDirection: "column" }}>
                <span>Title</span>
                <input
                  type="text"
                  value={postData?.title}
                  onChange={(e) => {
                    setPostData({ ...postData, title: e.target.value });
                  }}
                />
              </label>
              <label style={{ display: "flex", flexDirection: "column" }}>
                <span>Text:</span>
                <textarea
                  value={postData?.body ?? ""}
                  style={{ height: "100px", border: "1px solid #ccc", resize: "none" }}
                  onChange={(e) => {
                    setPostData({ ...postData, body: e.target.value });
                  }}
                />
              </label>
              <label style={{ display: "flex", flexDirection: "column" }}>
                <span>Media</span>
                <input
                  type="text"
                  value={postData?.media ?? ""}
                  onChange={(e) => {
                    setPostData({ ...postData, media: e.target.value });
                  }}
                />
              </label>
              <label style={{ display: "flex", flexDirection: "column" }}>
                <span>Tags</span>
                <input
                  type="text"
                  value={postData?.tags ?? ""}
                  onChange={(e) => {
                    setPostData({ ...postData, tags: e.target.value });
                  }}
                />
              </label>

              <Button type="submit" text={edit ? "Save Changes" : "Create Post"}></Button>
            </form>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", padding: "12px", gap: "12px" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h2>{postData?.title ?? ""}</h2>

              <p style={{ height: "100px", border: "1px solid #ccc", whiteSpace: "pre-wrap" }}>{postData?.body ?? ""}</p>
            </div>
            <img src={postData?.media ?? "#"} alt={"test of media"} width={"200"} />
          </div>
        </div>
        <Button
          type="button"
          onClick={async () => {
            const res = await deletePost(postData);
            console.log(res);
          }}
          text="Delete"
        >
          <i className="fa-solid fa-trash" />
        </Button>
      </div>
    );
  }

  return (
    <div style={{ margin: "48px 0px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <div>
          <h1>{postData?.title}</h1>
          <p>{postData?.body}</p>

          <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
            {postData?.tags?.map((tag) => {
              return (
                <div key={tag}>
                  <span>{tag}</span>
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
            {postData?.reactions?.map((r) => {
              return (
                <div key={r.symbol}>
                  <span>{r.symbol}</span>
                  <span>{r.count}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <img src={postData?.media} alt="test" width="400" style={{ maxHeight: "60vh", objectFit: "cover" }} />
        </div>
      </div>
      {postData?.author?.name && (
        <div>
          <h2>Author</h2>
          <Link to={`/profile/${postData.author.name}`}>
            <span>{postData.author.name}</span>
          </Link>
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Message</th>
            <th>User</th>
          </tr>
        </thead>
        <tbody>
          {postData?.comments?.map((comment) => {
            console.log(comment);
            return (
              <tr key={comment.id}>
                <td>{new Date(comment?.created).toLocaleDateString()}</td>
                <td>{comment?.body}</td>
                <td>
                  <Link to={`/profile/${comment?.owner}`}>{comment?.owner}</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            if (comment?.length < 1) {
              alert("You need to add text to your comment...");
            }

            let inputObject = {
              replyToId: myProfile?.id,
              body: comment,
            };

            try {
              const res = await createNewComment(postData.id, inputObject);
              console.log(res);
            } catch (err) {
              console.log(err);
            }
          }}
          style={{ display: "flex", flexDirection: "row", gap: "12px" }}
        >
          <label>Your comment:</label>
          <input
            type="text"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
          <Button text="Send" type="submit"></Button>
        </form>
      </div>
    </div>
  );
}
