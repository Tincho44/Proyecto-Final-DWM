import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import profileCSS from '../styles/Profile.module.css';
import { ProfileContext } from 'shared/context/ProfileContext';
import ProfileDetails from '../components/ProfileDetails';
import FadeLoader from 'react-spinners/FadeLoader';
import Posts from '../components/Posts';

const ProfilePage = () => {
  const { userProfile, loading, getProfile } = useContext(ProfileContext);
  const { idUser } = useParams();

  useEffect(() => {
    getProfile(idUser);
  }, [idUser]);

  return (
    <div className={profileCSS.profileWrapper}>
      {loading ? (
        <FadeLoader />
      ) : (
        <div className={profileCSS.profile}>
          <ProfileDetails userProfile={userProfile} />
          <Posts posts={userProfile.posts} />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
