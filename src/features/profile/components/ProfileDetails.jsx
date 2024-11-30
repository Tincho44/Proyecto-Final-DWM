import React, { useState, useEffect, useContext } from 'react';
import profileCSS from '../styles/Profile.module.css';
import ChangePicture from './ChangePicture';
import ChangeDescription from './ChangeDescription';
import { AuthContext } from 'shared/context/AuthContext';
import { ProfileContext } from 'shared/context/ProfileContext';
import { UserContext } from 'shared/context/UserContext';
import Modal from 'shared/components/Modal';

const ProfileDetails = ({ userProfile }) => {
  const { user: currentUser } = useContext(AuthContext);
  const { getProfile } = useContext(ProfileContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFriend, setIsFriend] = useState(false);
  const { addFriend, removeFriend } = useContext(UserContext);

  const myProfile = currentUser && userProfile && currentUser._id === userProfile.user._id;

  useEffect(() => {
    if (userProfile && userProfile.user && userProfile.user.friends) {
      setIsFriend(userProfile.user.friends.some(friend => friend._id === currentUser._id));
    }
  }, [userProfile, currentUser]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleAddFriend = async () => {
    try {
      await addFriend(userProfile.user._id);
      await getProfile(userProfile.user._id);
    } catch (error) {
      console.error('Error adding friend:', error);
    }
  };

  const handleRemoveFriend = async () => {
    try {
      await removeFriend(userProfile.user._id);
      await getProfile(userProfile.user._id);
    } catch (error) {
      console.error('Error removing friend:', error);
    }
  };

  return (
    <div className={profileCSS.profileDetails}>
      <div className={profileCSS.profileInfo}>
        <img
          src={userProfile.user.profilePicture}
          alt="profile"
          className={profileCSS.profilePicture}
        />
        <h3>{userProfile.user.username}</h3>
        <p>{userProfile.user.description}</p>
      </div>
      <div className={profileCSS.profileStatsWrapper}>
        <div className={profileCSS.profileStats}>
          <div className={profileCSS.profileStatsItem}>
            <h2>{userProfile.posts.length}</h2>
            <p>Posts</p>
          </div>
          <div className={profileCSS.profileStatsItem}>
            <h2>{userProfile.user.friends.length}</h2>
            <p>Friends</p>
          </div>
        </div>
        {myProfile ? (
          <>
            <button className={profileCSS.editProfileButton} onClick={toggleModal}>
              Edit Profile
            </button>
            {isModalOpen && (
              <Modal isOpen={isModalOpen} onClose={toggleModal}>
                <div className={profileCSS.modalContent}>
                  <div className={profileCSS.modalLeft}>
                    <div className={profileCSS.profileInfo}>
                      <img
                        src={userProfile.user.profilePicture}
                        alt="profile"
                        className={profileCSS.profilePicture}
                      />
                      <h3>{userProfile.user.username}</h3>
                      <p>{userProfile.user.description}</p>
                    </div>
                  </div>
                  <div className={profileCSS.modalRight}>
                    <ChangePicture user={userProfile.user} />
                    <ChangeDescription userId={userProfile.user._id} />
                  </div>
                </div>
              </Modal>
            )}
          </>
        ) : isFriend ? (
          <button className={profileCSS.removeFriendButton} onClick={handleRemoveFriend}>
            Remove Friend
          </button>
        ) : (
          <button className={profileCSS.addFriendButton} onClick={handleAddFriend}>
            Add Friend
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileDetails;
