import React from "react";
import { FaYoutube, FaPodcast, FaFacebook, FaInstagram } from 'react-icons/fa';
import mlingo from '../../../../img/logo-wjite.svg'

const LayoutFooter = props => {
  return (
    <div className="footer container">
      <div>
        <div>
          <img src={mlingo} />
        </div>
        <div>
          <p>a super awesome educational app</p>
        </div>
        <div>
          <p>© {new Date().getFullYear()} mLingo Team </p>
        </div>
      </div>
      <div>
        <FaYoutube className="social" />
        <FaPodcast className="social" />
        <FaFacebook className="social" />
        <FaInstagram className="social" />
      </div>
    </div>
  );
};

export default LayoutFooter;
