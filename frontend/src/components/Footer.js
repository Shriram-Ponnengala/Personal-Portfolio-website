import React from "react";
import { Award, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-main">
            <div className="footer-brand">
              <div className="footer-logo">
                <span className="logo-text">SHRIRAM</span>
                <div className="logo-subtitle">Chess Coach</div>
              </div>
              <p className="footer-description">
                Building the next generation of chess players through personalized coaching 
                and strategic development. FIDE National Instructor with proven results.
              </p>
            </div>
            
            <div className="footer-links">
              <div className="footer-section">
                <h3 className="footer-title">Quick Links</h3>
                <ul className="footer-list">
                  <li>
                    <button 
                      className="footer-link"
                      onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
                    >
                      About Me
                    </button>
                  </li>
                  <li>
                    <button 
                      className="footer-link"
                      onClick={() => document.getElementById('experience').scrollIntoView({ behavior: 'smooth' })}
                    >
                      Experience
                    </button>
                  </li>
                  <li>
                    <button 
                      className="footer-link"
                      onClick={() => document.getElementById('achievements').scrollIntoView({ behavior: 'smooth' })}
                    >
                      Achievements
                    </button>
                  </li>
                  <li>
                    <button 
                      className="footer-link"
                      onClick={() => document.getElementById('testimonials').scrollIntoView({ behavior: 'smooth' })}
                    >
                      Testimonials
                    </button>
                  </li>
                </ul>
              </div>
              
              <div className="footer-section">
                <h3 className="footer-title">Academy</h3>
                <ul className="footer-list">
                  <li>
                    <a 
                      href="https://venturechessacademy.com/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="footer-link"
                    >
                      Venture Chess Academy
                    </a>
                  </li>
                  <li><span className="footer-text">Individual Coaching</span></li>
                  <li><span className="footer-text">Group Classes</span></li>
                  <li><span className="footer-text">Tournament Prep</span></li>
                </ul>
              </div>
              
              <div className="footer-section">
                <h3 className="footer-title">Contact</h3>
                <ul className="footer-list">
                  <li className="footer-contact">
                    <Mail size={16} />
                    <a href="mailto:shriram@venturechess.com" className="footer-link">
                      shriram@venturechess.com
                    </a>
                  </li>
                  <li className="footer-contact">
                    <Phone size={16} />
                    <a href="tel:+919876543210" className="footer-link">
                      +91 98765 43210
                    </a>
                  </li>
                  <li className="footer-contact">
                    <Award size={16} />
                    <span className="footer-text">FIDE ID: 45044538</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <div className="footer-copyright">
              <p>&copy; 2025 Shriram Ponnengala. All rights reserved.</p>
            </div>
            <div className="footer-credentials">
              <span className="credential-badge">
                <Award size={14} />
                FIDE National Instructor
              </span>
              <span className="credential-badge">
                Venture Chess Academy
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;