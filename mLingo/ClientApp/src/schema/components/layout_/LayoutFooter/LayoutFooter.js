import React from "react";
import { FaYoutube, FaPodcast, FaFacebook, FaInstagram } from 'react-icons/fa';
import mlingo from '../../../../img/logo-wjite.svg'

const LayoutFooter = props => {
  return (
    <div className="footer__container">
      <div className="footer__details">
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
      <div className="footer__socials">
        <FaYoutube className="social__mlingo" />
        <FaPodcast className="social__mlingo" />
        <FaFacebook className="social__mlingo" />
        <FaInstagram className="social__mlingo" />
      </div>
    </div>
  );
};

export default LayoutFooter;
