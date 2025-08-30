import React from "react";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
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
    },
    {
      name: "Vikram Reddy",
      role: "Advanced Student",
      content: "The tactical training and opening preparation I received helped me win my first district tournament. Shriram sir's strategic insights are invaluable for competitive play.",
      rating: 5
    },
    {
      name: "Meera Krishnan",
      role: "Student (Age 12)",
      content: "Chess classes are so much fun! Sir explains everything clearly and helps me solve puzzles. I love learning new tactics and strategies in each session.",
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
            Book Your First Session
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;