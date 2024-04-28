import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { styled } from "styled-components";
import { fetchProfileByName, followProfileName, unFollowProfileName, updateProfileMedia } from "../../client/profiles";
import { getProfile } from "../../storage/token";
import SocialCard from "../../components/SocialCard";
import Button from "../../components/Button";
import ImageContainer from "../../components/ImageContainer";
const FollowerDetails = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
`;

export default function Profile() {
  const [profileData, setProfileData] = useState({});
  const avatarRef = useRef(null);
  const bannerRef = useRef(null);
  const { name } = useParams();
  const myProfile = getProfile();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchProfileByName(name);
        console.log(result);
        if (result?.status === 200) {
          setProfileData(result.data);
          if (result?.data?.avatar) {
            avatarRef.current.value = result.data.avatar;
          }
          if (result?.data?.banner) {
            bannerRef.current.value = result.data.banner;
          }
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (name) {
      fetchData();
    }

    return () => {
      setProfileData([]);
    };
  }, [name]);

  return (
    <div style={{ display: "grid", gap: "12px", paddingTop: "10vh" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "200px auto",
          backgroundImage: profileData.banner ? `url(${profileData.banner})` : "linear-gradient(45deg, #FDBF89 0%, #FFF 70%, #FFF 100%)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          height: "220px",
          padding: "10px",
          gap: "12px",
          position: "relative",
          maxWidth: "800px",
          width: "50vw",
          margin: "0 auto",
        }}
      >
        <ImageContainer source={profileData?.avatar} alt="Profile" />
        <div>
          <h1>{profileData?.name}</h1>
          <FollowerDetails>
            <span>Posts: {profileData?._count?.posts}</span>
            <span>Following: {profileData?._count?.following}</span>
            <span>Followers: {profileData?._count?.followers}</span>
          </FollowerDetails>
          <div style={{ position: "absolute", bottom: "2rem", right: "2rem", display: "flex", flexDirection: "row", gap: "1rem" }}>
            <Button
              text={"Follow Me!"}
              onClick={async () => {
                try {
                  const res = await followProfileName(profileData.name);
                  console.log(res);
                } catch (err) {
                  console.error(err);
                }
              }}
            />
            <Button
              text={"Unfollow"}
              onClick={async () => {
                try {
                  const res = await unFollowProfileName(profileData.name);
                  console.log(res);
                } catch (err) {
                  console.error(err);
                }
              }}
            />
          </div>
        </div>
      </div>
      {myProfile?.name && myProfile.name === name && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "220px",
            padding: "10px",
            gap: "12px",
            position: "relative",
            maxWidth: "800px",
            width: "50vw",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <h3>Change My Profile</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateProfileMedia(name, avatarRef.current.value, bannerRef.current.value).then((res) => {
                console.log(res);
              });
            }}
            style={{ display: "grid", gap: "8px" }}
          >
            <label>
              Avatar
              <input type="uri" ref={avatarRef} />
            </label>
            <label>
              Banner
              <input type="url" ref={bannerRef} />
            </label>
            <button type="submit">Update</button>
          </form>
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", maxWidth: "1100px", position: "relative", margin: "20px auto", gap: "12px" }}>
        {profileData?.posts?.map((post) => {
          return <SocialCard post={post} />;
        })}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        <div style={{ padding: "12px" }}>
          <h3>Following</h3>
          {profileData?.following?.map((profile, i) => {
            return (
              <span key={profile.name}>
                <Link to={`/profile/${profile.name}`}>{profile.name}</Link>
                {i < profileData?.following?.length - 1 ? ", " : ""}
              </span>
            );
          })}
        </div>
        <div style={{ padding: "12px" }}>
          <h3>Followers</h3>
          {profileData?.followers?.map((follower, i) => {
            return (
              <span key={follower.name}>
                <Link to={`/profile/${follower.name}`}>{follower.name}</Link>
                {i < profileData?.followers?.length - 1 ? ", " : ""}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
