import React from 'react'
import playstore from "../../../images/playstore.png"
import appStore from "../../../images/Appstore.png"
import "./Footer.css"
import {FaInstagram,FaLinkedin} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer id='footer'>
        <div className="leftFooter">
            <h4>Download the App</h4>
            <p>Download App for Android and IOS mobile phone</p>
            <img src={playstore} alt="playstore" />
            <img src={appStore} alt="appStore" />
        </div>

        <div className="midFooter">
            <h1>DJ</h1>
            <p>High Quality is our first priority</p>
            <p>Copyrights 2021 &copy; Dibyam Jalan</p>
        </div>

        <div className="rightFooter">
            <h4>Follow Us</h4>
            <a href='https://instagram.com/palakpalette?igshid=MzNlNGNkZWQ4Mg=='><FaInstagram/></a>
            <a href='https://www.linkedin.com/in/palak-jain-26296222a'><FaLinkedin/></a>
        </div>
    </footer>
  );
};

export default Footer;