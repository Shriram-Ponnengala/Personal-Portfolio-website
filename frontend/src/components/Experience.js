import React from "react";
import { Briefcase, Calendar, ChevronRight } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      title: "Founder & Head Coach",
      company: "Venture Chess Academy",
      companyUrl: "https://venturechessacademy.com/",
      period: "Present",
      status: "Current",
      achievements: [
        "Established and manage an academy focused on quality chess education",
        "Lead training programs (online & offline) tailored to student goals",
        "Mentor players from grassroots to competitive level, with proven rating growth",
        "Built a supportive and interactive learning culture at the academy",
        "Coached beginners to achieve official FIDE ratings and tournament wins"
      ]
    }
  ];

  return (
    <section id="experience" className="experience-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Experience</h2>
          <p className="section-subtitle">
            Building expertise through diverse coaching environments
          </p>
        </div>
        
        <div className="experience-timeline">
          {experiences.map((exp, index) => (
            <div key={index} className="experience-card">
              <div className="experience-header">
                <div className="experience-icon">
                  <Briefcase size={24} />
                </div>
                <div className="experience-info">
                  <h3 className="experience-title">{exp.title}</h3>
                  {exp.companyUrl ? (
                    <a 
                      href={exp.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="experience-company-link"
                    >
                      {exp.company}
                    </a>
                  ) : (
                    <h4 className="experience-company">{exp.company}</h4>
                  )}
                  <div className="experience-period">
                    <Calendar size={16} />
                    <span>{exp.period}</span>
                    <span className={`experience-status ${exp.status.toLowerCase()}`}>
                      {exp.status}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="experience-content">
                <ul className="achievements-list">
                  {exp.achievements.map((achievement, achIndex) => (
                    <li key={achIndex} className="achievement-item">
                      <ChevronRight size={16} />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;