import React from "react";
import { styled } from "styled-components";
import ImageContainer from "../ImageContainer";
import Reactions from "../Reactions";
import { Link } from "react-router-dom";

const CardStyle = styled.div`
  position: relative;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 8px 12px;
  width: 300px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 2px 6px rgba(40, 50, 60, 0.2);
`;
const CardStyleWithImage = styled.div`
  position: relative;
  border: 1px solid #ccc;
  border-radius: 0px 6px 6px 0px;
  width: 500px;
  display: grid;
  grid-template-columns: 200px auto;
  box-shadow: 0px 2px 6px rgba(40, 50, 60, 0.2);
`;
const CardContentStyle = styled.div`
  position: relative;
  padding: 8px 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const CardTitle = styled.h2`
  font-weight: 600;
  text-align: center;
  overflow: hidden;
  text-transform: uppercase;
`;
const CardBody = styled.p`
  height: 100px;
  overflow-y: auto;
`;

const ReactionContainer = styled.div`
  font-size: 0.8rem;
  color: #c77;
  display: flex;
  gap: 4px;
  flex-direction: row;
  place-content: flex-end;
  flex-wrap: wrap;
  text-transform: lowercase;
  position: absolute;
  bottom: 4px;
  right: 4px;
  &:before {
    content: "#";
  }
`;

export default function SocialCard({ post }) {
  let tags = [];
  for (let i = 0; i < post?.tags?.length; i++) {
    tags.push(
      <span>
        {tags?.length > 0 && ","}
        {post.tags[i]}
      </span>
    );
  }

  if (isValidImageMedia(post?.media)) {
    // Lets make sure the source text contains on of the image endings (png, gif, jpg etc.)

    return (
      <CardStyleWithImage>
        <ImageContainer source={post.media} alt={post.title} />
        <CardContentStyle>
          <CardTitle>{post.title}</CardTitle>
          <CardBody>{post.body}</CardBody>
          <div>
            <Link to={`/posts/${post.id}`}>More information...</Link>
          </div>
          {tags?.length > 0 && <ReactionContainer>{tags}</ReactionContainer>}
          <Reactions postId={post.id} reactions={post?.reactions ?? []} />
        </CardContentStyle>
      </CardStyleWithImage>
    );
  }
  return (
    <CardStyle>
      <CardTitle>{post.title ?? "error: missing title"}</CardTitle>
      <CardBody>{post.body ?? "..."}</CardBody>
      <div>
        <Link to={`/posts/${post.id}`}>More information...</Link>
      </div>
      {tags?.length > 0 && <ReactionContainer>{tags}</ReactionContainer>}
      <Reactions postId={post.id} reactions={post?.reactions ?? []} />
    </CardStyle>
  );
}

const approvedMedia = [".jpg", ".jpeg", ".png", ".svg", ".webp", ".gif", "unsplash.com"];

function isValidImageMedia(sourceString) {
  if (!sourceString || sourceString?.length === 0) {
    return false;
  }
  return approvedMedia.some((approvedTag) => sourceString.includes(approvedTag));
}
