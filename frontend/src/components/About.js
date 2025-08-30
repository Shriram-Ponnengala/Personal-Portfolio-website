import React from "react";
import { GraduationCap, Brain, Users, Zap } from "lucide-react";

const About = () => {
  const skills = [
    {
      icon: <Users size={24} />,
      title: "Chess Coaching",
      description: "Beginners to rated competitive players"
    },
    {
      icon: <Brain size={24} />,
      title: "Curriculum Design",
      description: "Academy management and structured learning"
    },
    {
      icon: <GraduationCap size={24} />,
      title: "Player Development",
      description: "Openings, tactics, strategies, and mindset training"
    },
    {
      icon: <Zap size={24} />,
      title: "AI Integration",
      description: "Tech-savvy with keen interest in AI and digital tools"
    }
  ];

  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">
            Combining deep chess knowledge with innovative teaching methods
          </p>
        </div>
        
        <div className="about-content">
          <div className="about-text">
            <p className="about-description">
              As the Founder and Head Coach of Venture Chess Academy, I'm dedicated to 
              building the next generation of chess players. With my FIDE National 
              Instructor certification and 4+ years of coaching experience, I blend 
              deep knowledge of theory and strategy with engaging, personalized teaching.
            </p>
            
            <p className="about-description">
              My approach combines analytical thinking with creativity, helping students 
              not just learn chess moves, but develop critical thinking skills that 
              extend beyond the board. I'm particularly interested in integrating 
              AI and digital learning tools to enhance the chess education experience.
            </p>
            
            <div className="qualifications">
              <h3 className="qualifications-title">Qualifications</h3>
              <ul className="qualifications-list">
                <li>Peak FIDE Rating: 1665</li>
                <li>Certified FIDE National Instructor</li>
                <li>FIDE Profile: 45044538</li>
              </ul>
            </div>
          </div>
          
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div key={index} className="skill-card">
                <div className="skill-icon">
                  {skill.icon}
                </div>
                <h3 className="skill-title">{skill.title}</h3>
                <p className="skill-description">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;