import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <span className="logo-text">SHRIRAM</span>
          </div>
          
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <button 
              className="nav-link" 
              onClick={() => scrollToSection('about')}
            >
              About
            </button>
            <button 
              className="nav-link" 
              onClick={() => scrollToSection('experience')}
            >
              Experience
            </button>
            <button 
              className="nav-link" 
              onClick={() => scrollToSection('achievements')}
            >
              Achievements
            </button>
            <button 
              className="nav-link" 
              onClick={() => scrollToSection('testimonials')}
            >
              Testimonials
            </button>
            <button 
              className="nav-link" 
              onClick={() => scrollToSection('social')}
            >
              Connect
            </button>
            <button 
              className="nav-link" 
              onClick={() => scrollToSection('contact')}
            >
              Contact
            </button>
          </nav>

          <button 
            className="mobile-menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;