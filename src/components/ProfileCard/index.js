import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import ImageContainer from "../ImageContainer";
import Button from "../Button";
const ProfileStyle = styled.div`
  display: grid;
  grid-template-columns: 200px auto;
  height: 220px;
  padding: 10px;
  box-shadow: inset 0 0 10px #fff;
  max-width: 80vw;
`;
const CardContentStyle = styled.div`
  position: relative;
  padding: 8px 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: rgba(255, 255, 255, 0.5);
`;
const CardTitle = styled.h2`
  font-weight: 600;
  text-align: center;
  overflow: hidden;
  text-transform: uppercase;
`;
const FollowerDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
`;
const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
`;
const DetailedNumber = styled.span`
  font-size: 1.5rem;
  place-self: center;
`;

export default function ProfileCard({ profile }) {
  const navigate = useNavigate();
  let backgroundPath = profile.banner ? `url(${profile.banner})` : "linear-gradient(45deg, #FDBF89 0%, #FFF 70%, #FFF 100%)";
  if (isValidImageMedia(profile?.avatar)) {
    // Lets make sure the source text contains on of the image endings (png, gif, jpg etc.)

    return (
      <ProfileStyle style={{ background: backgroundPath, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center center" }}>
        <ImageContainer source={profile.avatar} alt={profile.name} />
        <CardContentStyle>
          <CardTitle>{profile.name}</CardTitle>
          <FollowerDetails>
            <DetailContainer>
              <DetailedNumber>{profile?._count?.posts}</DetailedNumber>
              <h3>Posts</h3>
            </DetailContainer>
            <DetailContainer>
              <DetailedNumber>{profile?._count?.followers}</DetailedNumber>
              <h3>Followers</h3>
            </DetailContainer>
            <DetailContainer>
              <DetailedNumber>{profile?._count?.following}</DetailedNumber>
              <h3>Following</h3>
            </DetailContainer>
          </FollowerDetails>
          <Button
            onClick={() => {
              navigate(`/profile/${profile.name}`);
            }}
            text={"To Profile"}
          />
        </CardContentStyle>
      </ProfileStyle>
    );
  }
  return (
    <ProfileStyle style={{ background: backgroundPath, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center center" }}>
      <div>NO AVATAR</div>
      <CardContentStyle>
        <CardTitle>{profile.name}</CardTitle>
        <FollowerDetails>
          <DetailContainer>
            <DetailedNumber>{profile?._count?.posts}</DetailedNumber>
            <h3>Posts</h3>
          </DetailContainer>
          <DetailContainer>
            <DetailedNumber>{profile?._count?.followers}</DetailedNumber>
            <h3>Followers</h3>
          </DetailContainer>
          <DetailContainer>
            <DetailedNumber>{profile?._count?.following}</DetailedNumber>
            <h3>Following</h3>
          </DetailContainer>
        </FollowerDetails>
        <Button
          onClick={() => {
            navigate(`/profile/${profile.name}`);
          }}
          text={"To Profile"}
        />
      </CardContentStyle>
    </ProfileStyle>
  );
}

// Unsplash links do not contain a proper image tag...
const approvedMedia = [".jpg", ".jpeg", ".png", ".svg", ".webp", ".gif", "unsplash"];

function isValidImageMedia(sourceString) {
  if (!sourceString || sourceString?.length === 0) {
    return false;
  }
  return approvedMedia.some((approvedTag) => sourceString.includes(approvedTag));
}
