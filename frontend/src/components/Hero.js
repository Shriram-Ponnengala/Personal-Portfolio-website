import React from "react";
import { ChevronRight, Award, Users, Trophy } from "lucide-react";

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge">
              <Award size={16} />
              <span>FIDE National Instructor</span>
            </div>
            
            <h1 className="hero-title">
              SHRIRAM
              <br />
              PONNENGALA
            </h1>
            
            <p className="hero-subtitle">
              Founder & Head Coach | <a href="https://venturechessacademy.com/" target="_blank" rel="noopener noreferrer" className="academy-link">Venture Chess Academy</a>
            </p>
            
            <p className="hero-description">
              Building the next generation of chess players with 4+ years of coaching experience. 
              From beginners to competitive tournaments, I help students achieve their chess goals 
              through personalized training and strategic development.
            </p>
            
            <div className="hero-stats">
              <div className="stat-item">
                <Users size={20} />
                <div>
                  <span className="stat-number">50+</span>
                  <span className="stat-label">Students Coached</span>
                </div>
              </div>
              <div className="stat-item">
                <Trophy size={20} />
                <div>
                  <span className="stat-number">1665</span>
                  <span className="stat-label">Peak FIDE Rating</span>
                </div>
              </div>
              <div className="stat-item">
                <Award size={20} />
                <div>
                  <span className="stat-number">4+</span>
                  <span className="stat-label">Years Experience</span>
                </div>
              </div>
            </div>
            
            <div className="hero-buttons">
              <button 
                className="btn-primary"
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              >
                Book a Session
                <ChevronRight size={16} />
              </button>
              <button 
                className="btn-secondary"
                onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
              >
                Learn More
              </button>
            </div>
          </div>
          
          <div className="hero-image">
            <div className="profile-card">
              <div className="profile-image-container">
                <img 
                  src="https://customer-assets.emergentagent.com/job_skill-display-47/artifacts/miaidge4_me.jpg"
                  alt="Shriram Ponnengala - Chess Coach"
                  className="profile-image"
                />
                <div className="profile-badge">
                  <Award size={16} />
                  <span>FIDE Certified</span>
                </div>
              </div>
              <div className="profile-info">
                <h3>FIDE Profile: 45044538</h3>
                <p>Certified National Instructor</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;