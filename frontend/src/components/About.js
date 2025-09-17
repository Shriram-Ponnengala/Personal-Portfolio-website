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
              As Founder and Head Coach of Venture Chess Academy, I'm passionate about 
              developing chess talent at every level. With my FIDE National Instructor 
              certification and 4+ years of experience, I've trained students from age 4 
              to 40 - from complete beginners to state and national championship competitors.
            </p>
            
            <p className="about-description">
              I combine analytical thinking with creative teaching methods, developing not 
              just chess skills but critical thinking abilities. Beyond the board, I'm 
              passionate about international relations, technology, and building tools 
              for the chess community.
            </p>
            
            <div className="qualifications">
              <h3 className="qualifications-title">Qualifications</h3>
              <ul className="qualifications-list">
                <li>Peak FIDE Rating: 1665</li>
                <li>
                  Certified FIDE <a 
                    href="https://drive.google.com/file/d/1I-czhTw_gMMCkhjN-1G7RDgWGQJHyj7g/view?usp=sharing" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="fide-profile-link"
                  >
                    National Instructor
                  </a>
                </li>
                <li>
                  FIDE Profile: <a 
                    href="https://ratings.fide.com/profile/45044538" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="fide-profile-link"
                  >
                    45044538
                  </a>
                </li>
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