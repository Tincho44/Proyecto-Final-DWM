import React from 'react';
import topbarCSS from '../styles/Bars.module.css';
import { Link } from 'react-router-dom';

function TopBar() {
  return (
    <div className={topbarCSS.topbar}>
      <div className={topbarCSS.logo}>
        <img src="/ucugram.svg" alt="UCU Gram" className={topbarCSS.logo} />
      </div>
      <nav className={topbarCSS.navigation}>
        <ul>
          <li>
            <Link to="/post" className={topbarCSS.navItem}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <g clipPath="url(#clip0_9_955)">
                  <path d="M2 12V15.45C2 18.299 2.698 19.455 3.606 20.394C4.546 21.303 5.704 22.002 8.552 22.002H15.448C18.296 22.002 19.454 21.302 20.394 20.394C21.302 19.455 22 18.3 22 15.45V8.552C22 5.703 21.302 4.546 20.394 3.607C19.454 2.7 18.296 2 15.448 2H8.552C5.704 2 4.546 2.699 3.606 3.607C2.698 4.547 2 5.703 2 8.552V12Z" stroke="#262626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M6.54504 12.001H17.455" stroke="#262626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12.0031 6.54498V17.455" stroke="#262626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </g>
                <defs>
                  <clipPath id="clip0_9_955">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <span>Postear</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default TopBar;
