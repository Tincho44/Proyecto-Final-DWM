import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import TopBar from '../components/TopBar';
import CommentsPage from 'features/comments/pages/CommentsPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LayoutedRoute = () => {
    const [isCommentsOpen, setCommentsOpen] = useState(false);
    const [currentPostId, setCurrentPostId] = useState(null);
  
    const handleOpenComments = (postId) => {
      setCurrentPostId(postId);
      setCommentsOpen(true);
    };
  
    const handleCloseComments = () => {
      setCommentsOpen(false);
      setCurrentPostId(null);
    };
  
    return <div className="ucugramApp">
        <ToastContainer />
        <CommentsPage
            postId={currentPostId}
            isOpen={isCommentsOpen}
            onClose={handleCloseComments}
        />
        <TopBar />
        <div className="ucugramContent">
            <Outlet />
        </div>
        <NavBar />
    </div>;
};

export default LayoutedRoute;
