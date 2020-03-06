import React from "react";
import { FaYoutube, FaPodcast, FaFacebook, FaInstagram } from 'react-icons/fa';

const Footer = props => {
  return (
    <div className="footer container">
      <FaYoutube className="social" />
      <FaPodcast className="social" />
      <FaFacebook className="social" />
      <FaInstagram className="social" />
      <div className="footer-end-text">
        <p>© {new Date().getFullYear()} mLingo Team </p>
      </div>
    </div>
  );
};

export default Footer;
