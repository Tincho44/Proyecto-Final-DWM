import React, { useContext, useEffect } from 'react';
import { PostContext } from 'shared/context/PostContext';
import { UserContext } from 'shared/context/UserContext';
import PostSkeleton from 'features/feed/components/PostSkeleton';
import UserChip from 'features/feed/components/UserChip';
import UserChipSkeleton from 'features/feed/components/UserChipSkeleton';
import Post from 'features/feed/components/Post';
import feedCSS from '../styles/Feed.module.css';

const FeedPage = () => {
  const { posts, loading, fetchPosts } = useContext(PostContext);
  const { getFriends, friends, loading: loadingFriends } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      await fetchPosts();
      await getFriends();
    };
    fetchData();
  }, []);

  return (
    <div className={feedCSS.feedWrapper}>
      <p className={feedCSS.friendsChipsText}>Mira el perfil de tus amigos</p>
      <div className={feedCSS.friendsChips}>
        {loadingFriends
          ? Array.from({ length: 5 }).map((_, i) => (
              <UserChipSkeleton key={i} />
            ))
          : friends.map((friend) => (
              <UserChip key={friend._id} user={friend} />
            ))}
      </div>
      <div className="separator postSeparator" />
      <div className={feedCSS.postList}>
        {loading
          ? Array.from({ length: 5 }).map((_, i) => (
              <PostSkeleton key={i} />
            ))
          : posts.map((post) => (
              <div key={post._id}>
                <Post
                  post={post}
                />
                <div className="separator postSeparator" />
              </div>
            ))}
      </div>
    </div>
  );
};

export default FeedPage;
