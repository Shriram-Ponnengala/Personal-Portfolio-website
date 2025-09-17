import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle, MessageCircle, Instagram, Linkedin, Facebook, Crown } from "lucide-react";
import { useToast } from "../hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${BACKEND_URL}/api/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (response.ok && responseData.success) {
        toast({
          title: "Message Sent Successfully!",
          description: responseData.message,
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          experience: '',
          sessionType: '',
          message: ''
        });
      } else {
        // Handle validation errors or server errors
        const errorMessage = responseData.detail || 
                           responseData.message || 
                           "Failed to send message. Please try again.";
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: "Connection Error",
        description: "Unable to connect to server. Please check your internet connection and try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: "Email",
      content: "Shrmpnga26@gmail.com",
      action: "mailto:Shrmpnga26@gmail.com"
    },
    {
      icon: <Phone size={24} />,
      title: "Phone",
      content: "+91 95670 27370",
      action: "tel:+919567027370"
    },
    {
      icon: <MapPin size={24} />,
      title: "Location",
      content: "Bangalore, Karnataka, India",
      action: null
    }
  ];

  const socialQuickLinks = [
    {
      name: "WhatsApp",
      icon: <MessageCircle size={20} />,
      url: "https://wa.me/+919567027370",
      color: "#25D366"
    },
    {
      name: "Instagram", 
      icon: <Instagram size={20} />,
      url: "https://www.instagram.com/shriram_ponnengala/",
      color: "#E4405F"
    },
    {
      name: "LinkedIn",
      icon: <Linkedin size={20} />,
      url: "https://www.linkedin.com/in/shriram-ponnengala-101642287/",
      color: "#0A66C2"
    },
    {
      name: "Facebook",
      icon: <Facebook size={20} />,
      url: "https://www.facebook.com/shriramponnengala",
      color: "#1877F2"
    },
    {
      name: "Lichess",
      icon: <Crown size={20} />,
      url: "https://lichess.org/@/Shriram_Ponnengala",
      color: "#F5F5F5"
    }
  ];

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Ready to start your chess journey? Let's discuss your goals
          </p>
        </div>
        
        <div className="contact-content">
          <div className="contact-info">
            <h3 className="contact-info-title">Let's Connect</h3>
            <p className="contact-info-description">
              Whether you're a complete beginner or looking to improve your competitive game, 
              I'm here to help you achieve your chess goals. When you submit this form, I'll 
              receive an instant notification on both WhatsApp and email to ensure quick response.
            </p>
            
            <div className="notification-info">
              <h4 className="notification-title">📱 Instant Notifications</h4>
              <ul className="notification-list">
                <li>WhatsApp notification for immediate response</li>
                <li>Email notification with full inquiry details</li>
                <li>Response within 2-4 hours during business hours</li>
              </ul>
            </div>
            
            <div className="contact-details">
              {contactInfo.map((info, index) => (
                <div key={index} className="contact-item">
                  <div className="contact-icon">
                    {info.icon}
                  </div>
                  <div className="contact-text">
                    <h4 className="contact-label">{info.title}</h4>
                    {info.action ? (
                      <a href={info.action} className="contact-value">
                        {info.content}
                      </a>
                    ) : (
                      <p className="contact-value">{info.content}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="social-quick-links">
              <h4 className="social-quick-title">Connect on Social Media</h4>
              <div className="social-icons-grid">
                {socialQuickLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon-link"
                    style={{ '--social-color': social.color }}
                  >
                    {social.icon}
                    <span>{social.name}</span>
                  </a>
                ))}
              </div>
            </div>
            
            <div className="coaching-info">
              <h4 className="coaching-title">Coaching Options</h4>
              <ul className="coaching-list">
                <li>Individual one-on-one sessions</li>
                <li>Group classes for beginners</li>
                <li>Tournament preparation</li>
                <li>Online and offline training</li>
              </ul>
            </div>
          </div>
          
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="form-input"
                required
                placeholder="Your full name"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-input"
                required
                placeholder="your.email@example.com"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="phone" className="form-label">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="form-input"
                placeholder="+91 98765 43210"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="experience" className="form-label">Chess Experience</label>
              <select
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                className="form-select"
              >
                <option value="">Select your level</option>
                <option value="complete-beginner">Complete Beginner</option>
                <option value="basic-knowledge">Basic Knowledge</option>
                <option value="intermediate">Intermediate Player</option>
                <option value="advanced">Advanced Player</option>
                <option value="competitive">Competitive Player</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="sessionType" className="form-label">Session Type</label>
              <select
                id="sessionType"
                name="sessionType"
                value={formData.sessionType || ''}
                onChange={handleInputChange}
                className="form-select"
              >
                <option value="">Select session type</option>
                <option value="consultation">Free Consultation</option>
                <option value="individual">Individual Coaching</option>
                <option value="group">Group Classes</option>
                <option value="tournament-prep">Tournament Preparation</option>
                <option value="online">Online Training</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="form-textarea"
                rows="4"
                placeholder="Tell me about your chess goals and what you'd like to achieve..."
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className="btn-primary form-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="loading-spinner"></div>
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <Send size={16} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;