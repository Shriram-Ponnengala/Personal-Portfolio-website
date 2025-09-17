import React from "react";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Muriel Shanessa Fernandes",
      role: "Parent of Student",
      content: "Shriram Sir is really a genuine coach who takes real pains to see his students rise higher and higher. My daughter got rating olympiad because of Shriram Sir. And now she achieved the State under 11 champion. Many thanks to Sir Shriram.",
      rating: 5
    },
    {
      name: "Ian Menezes", 
      role: "Student",
      content: "Want to Thank Sriram sir for motivating Ian when he stopped playing chess a year ago and training him to get back on track.",
      rating: 5
    },
    {
      name: "Arjun Sharma",
      role: "Student (Beginner to 1200 Rating)",
      content: "Shriram sir's teaching method is exceptional. He helped me understand chess from basics to achieving my first FIDE rating. His patience and structured approach made learning enjoyable.",
      rating: 5
    },
    {
      name: "Priya Nair", 
      role: "Parent of Student",
      content: "My daughter started as a complete beginner and now competes in tournaments confidently. Shriram's personalized coaching and mentoring have been incredible for her development.",
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">What Students Say</h2>
          <p className="section-subtitle">
            Success stories from the chess community
          </p>
        </div>
        
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-header">
                <div className="quote-icon">
                  <Quote size={24} />
                </div>
                <div className="rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="star-filled" />
                  ))}
                </div>
              </div>
              
              <p className="testimonial-content">
                "{testimonial.content}"
              </p>
              
              <div className="testimonial-author">
                <div className="author-avatar">
                  <div className="avatar-placeholder">
                    {testimonial.name.charAt(0)}
                  </div>
                </div>
                <div className="author-info">
                  <h4 className="author-name">{testimonial.name}</h4>
                  <p className="author-role">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="testimonials-cta">
          <h3 className="cta-title">Ready to Start Your Chess Journey?</h3>
          <p className="cta-description">
            Join our growing community of chess enthusiasts and take your game to the next level
          </p>
          <button 
            className="btn-primary"
            onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
          >
            Connect with Me
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;