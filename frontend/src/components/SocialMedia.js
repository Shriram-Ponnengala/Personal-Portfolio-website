import React from "react";
import { MessageCircle, Instagram, Linkedin, Facebook, Crown, ExternalLink } from "lucide-react";

const SocialMedia = () => {
  const socialLinks = [
    {
      name: "WhatsApp",
      icon: <MessageCircle size={24} />,
      url: "https://wa.me/+919567027370",
      description: "Quick coaching inquiries & consultations",
      color: "#25D366",
      bgColor: "rgba(37, 211, 102, 0.1)"
    },
    {
      name: "Instagram",
      icon: <Instagram size={24} />,
      url: "https://www.instagram.com/shriram_ponnengala/",
      description: "Chess tips, student highlights & academy updates",
      color: "#E4405F",
      bgColor: "rgba(228, 64, 95, 0.1)"
    },
    {
      name: "LinkedIn",
      icon: <Linkedin size={24} />,
      url: "https://www.linkedin.com/in/shriram-ponnengala-101642287/",
      description: "Professional networking & career achievements",
      color: "#0A66C2",
      bgColor: "rgba(10, 102, 194, 0.1)"
    },
    {
      name: "Facebook",
      icon: <Facebook size={24} />,
      url: "https://www.facebook.com/shriramponnengala",
      description: "Community updates & chess discussions",
      color: "#1877F2",
      bgColor: "rgba(24, 119, 242, 0.1)"
    },
    {
      name: "Lichess",
      icon: <Crown size={24} />,
      url: "https://lichess.org/@/Shriram_Ponnengala",
      description: "Live games, puzzles & online coaching sessions",
      color: "#F5F5F5",
      bgColor: "rgba(245, 245, 245, 0.1)"
    }
  ];

  const handleSocialClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="social" className="social-media-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Connect With Me</h2>
          <p className="section-subtitle">
            Follow my chess journey and stay updated with coaching insights
          </p>
        </div>
        
        <div className="social-grid">
          {socialLinks.map((social, index) => (
            <div 
              key={index} 
              className="social-card"
              style={{ '--social-color': social.color, '--social-bg': social.bgColor }}
              onClick={() => handleSocialClick(social.url)}
            >
              <div className="social-icon" style={{ color: social.color }}>
                {social.icon}
              </div>
              
              <div className="social-content">
                <h3 className="social-name">{social.name}</h3>
                <p className="social-description">{social.description}</p>
                
                <div className="social-action">
                  <span className="social-cta">
                    {social.name === 'WhatsApp' ? 'Message Now' :
                     social.name === 'Lichess' ? 'View Profile' : 'Follow'}
                  </span>
                  <ExternalLink size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="social-cta-section">
          <div className="whatsapp-highlight">
            <div className="whatsapp-content">
              <MessageCircle size={32} />
              <div>
                <h3>Ready to Start Learning?</h3>
                <p>Message me directly on WhatsApp for quick consultation and booking</p>
              </div>
            </div>
            <button 
              className="btn-primary whatsapp-btn"
              onClick={() => handleSocialClick("https://wa.me/+919567027370")}
            >
              <MessageCircle size={18} />
              Start Conversation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialMedia;