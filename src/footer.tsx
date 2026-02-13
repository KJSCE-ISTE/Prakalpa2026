import React from "react";
import "./footer.css"; // We'll write this CSS

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Navigation */}
        <div className="footer-nav">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#themes">Themes</a></li>
            <li><a href="#prizes">Prizes</a></li>
            <li><a href="#timeline">Timeline</a></li>
            <li><a href="#gallery">Memories</a></li>
            <li><a href="#faqs">FAQ's</a></li>
            </ul>
            </div>


        {/* Contact Info */}
        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p>
            📍
            <a
              href="https://maps.app.goo.gl/6kroUKL37xDwHUh46"
              target="_blank"
              rel="noopener noreferrer"
            >
              K.J Somaiya School of Engineering
            </a>
          </p>

          <p>
            📞 Aditi Kanagala:{" "}
            <a href="tel:+919820493896">+91 98204 93896</a>
          </p>

          <p>
            📞 Tanish Shetty:{" "}
            <a href="tel:+917700048974">+91 77000 48974</a>
          </p>
        </div>

        {/* Social Links */}
        <div className="footer-social">
          <h3>MORE FROM US</h3>
          <div className="social-links">
            <a
              href="https://istekjsce.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              ISTE Website
            </a>

            <a
              href="https://www.instagram.com/istekjsse/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>

            <a
              href="https://chat.whatsapp.com/CgtnNwzmtxtCewidDt36rA"
              target="_blank"
              rel="noopener noreferrer"
            >
              Whatsapp
            </a>          
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Designed by ISTE KJSSE Council. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
