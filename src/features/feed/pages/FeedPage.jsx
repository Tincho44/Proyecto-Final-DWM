import React, { useContext, useEffect } from 'react';
import { PostContext } from 'shared/context/PostContext';
import { UserContext } from 'shared/context/UserContext';
import PostSkeleton from 'shared/skeleton/PostSkeleton';
import UserChip from 'features/feed/components/UserChip';
import Post from 'features/feed/components/Post';
import feedCSS from '../styles/Feed.module.css';

const FeedPage = () => {
  const { posts, loading, fetchPosts } = useContext(PostContext);
  const { getFriends, friends, currentUser, loading: loadingFriends } = useContext(UserContext);

  useEffect(() => {
    fetchPosts();
    getFriends();
  }, []);

  return (
    <div className={feedCSS.feedWrapper}>
      <div className={feedCSS.friendsChips}>
        { !loadingFriends && friends.map((friend) => (
          <UserChip key={friend._id} user={friend} currentUser={currentUser} />
        ))}
      </div>
      <div className={feedCSS.postList}>
        { loading && Array.from({ length: 5 }).map((_, i) => (
          <PostSkeleton key={i} />
        ))}
        { !loading && posts.map((post) => (
          <div key={post._id}>
            <Post
              id={post._id}
              imageUrl={post.imageUrl}
              profilePicture={post.user.profilePicture}
              username={post.user.username}
              caption={post.caption}
              createdAt={post.createdAt}
              likes={post.likes} />
            <div className="separator postSeparator" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedPage;
