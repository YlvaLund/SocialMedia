import React, { useState, useEffect } from "react";
import { fetchProfiles } from "../../client/profiles";
import ProfileCard from "../../components/ProfileCard";

export default function Profiles() {
  const [allProfiles, setAllProfiles] = useState([]);

  const handleFetchingOfProfiles = async () => {
    try {
      let tempProfiles = [];
      if (allProfiles?.length > 0) {
        tempProfiles = [...allProfiles];
      }
      const res = await fetchProfiles(allProfiles?.length);
      if (res.data.length > 0) {
        for (let p of res.data) {
          tempProfiles.push(p);
        }
      }

      setAllProfiles(tempProfiles);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    handleFetchingOfProfiles();

    return () => {
      setAllProfiles([]);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div style={{ display: "grid", maxWidth: "1100px", position: "relative", margin: "0px auto", gap: "24px" }}>
      {allProfiles?.map((profile) => {
        console.log(profile);
        return <ProfileCard profile={profile} key={profile.email} />;
      })}
      <button
        onClick={() => {
          handleFetchingOfProfiles();
        }}
      >
        Fetch more...
      </button>
    </div>
  );
}
