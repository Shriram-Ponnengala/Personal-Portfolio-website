import React from "react";
import { Trophy, Medal, Users, Target } from "lucide-react";

const Achievements = () => {
  const competitiveAchievements = [
    {
      title: "4th Place",
      event: "Premier Chess Academy World Chess Fiesta, Kozhikode",
      date: "Feb 2024",
      type: "Tournament"
    },
    {
      title: "Team Captain",
      event: "Mangalore University Chess Team",
      date: "2022",
      type: "Leadership"
    },
    {
      title: "SGFI State Level",
      event: "Competed four times",
      date: "Multiple Years",
      type: "State Competition"
    },
    {
      title: "District Champion",
      event: "District-level tournaments",
      date: "Multiple Wins",
      type: "Championship"
    },
    {
      title: "South Zone Inter-University",
      event: "Represented twice",
      date: "Multiple Years",
      type: "University Level"
    }
  ];

  const teachingHighlights = [
    {
      icon: <Users size={24} />,
      title: "Beginners to Rated Players",
      description: "Successfully coached beginners to achieve official FIDE ratings"
    },
    {
      icon: <Trophy size={24} />,
      title: "Tournament Winners",
      description: "Multiple students achieved tournament wins under guidance"
    },
    {
      icon: <Target size={24} />,
      title: "Competitive Transition",
      description: "Helped students transition from casual learners to competitive players"
    },
    {
      icon: <Medal size={24} />,
      title: "Academy Culture",
      description: "Built supportive and interactive learning environment"
    }
  ];

  return (
    <section id="achievements" className="achievements-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Achievements</h2>
          <p className="section-subtitle">
            Competitive excellence and coaching success
          </p>
        </div>
        
        <div className="achievements-content">
          <div className="competitive-achievements">
            <h3 className="subsection-title">Competitive Achievements</h3>
            <div className="achievements-grid">
              {competitiveAchievements.map((achievement, index) => (
                <div key={index} className="achievement-card">
                  <div className="achievement-badge">
                    <Trophy size={20} />
                  </div>
                  <h4 className="achievement-title">{achievement.title}</h4>
                  <p className="achievement-event">{achievement.event}</p>
                  <div className="achievement-meta">
                    <span className="achievement-date">{achievement.date}</span>
                    <span className="achievement-type">{achievement.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="teaching-highlights">
            <h3 className="subsection-title">Student Success Stories</h3>
            <div className="highlights-grid">
              {teachingHighlights.map((highlight, index) => (
                <div key={index} className="highlight-card">
                  <div className="highlight-icon">
                    {highlight.icon}
                  </div>
                  <h4 className="highlight-title">{highlight.title}</h4>
                  <p className="highlight-description">{highlight.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;