import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
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
    
    // Mock submission - replace with actual API call
    setTimeout(() => {
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for your interest. I'll get back to you within 24 hours.",
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        experience: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: "Email",
      content: "shriram@venturechess.com",
      action: "mailto:shriram@venturechess.com"
    },
    {
      icon: <Phone size={24} />,
      title: "Phone",
      content: "+91 98765 43210",
      action: "tel:+919876543210"
    },
    {
      icon: <MapPin size={24} />,
      title: "Location",
      content: "Mangalore, Karnataka, India",
      action: null
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
              I'm here to help you achieve your chess goals. Reach out to discuss personalized 
              training programs.
            </p>
            
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