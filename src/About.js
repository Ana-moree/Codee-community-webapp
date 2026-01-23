import React, { useState } from 'react';
import {
  Smartphone, Users, Shield, Globe, Brain,
  Heart, ChevronRight, Download, Lock,
  Gamepad2
} from 'lucide-react';
import './About.css';

function About() {
  const [activeFeature, setActiveFeature] = useState(null);

  const characters = [
  {
    name: 'Ada',
    title: 'The Innovator',
    color: '#FF6B9D',
    image: '/character profile pics/Ada profile.png'
  },
  {
    name: 'Alan',
    title: 'The Codebreaker',
    color: '#4ECDC4',
    image: '/character profile pics/Alan profile.png'
  },
  {
    name: 'Grace',
    title: 'The Debugger',
    color: '#95E1D3',
    image: '/character profile pics/Grace profile.png'
  },
  {
    name: 'Linus',
    title: 'The Open Architect',
    color: '#F38181',
    image: '/character profile pics/Linus profile.png'
  },
  {
    name: 'Mark',
    title: 'The Networker',
    color: '#AA96DA',
    image: '/character profile pics/Mark profile.png'
  }
];


  const features = [
    {
      icon: Gamepad2,
      title: 'Play & Learn',
      description: 'Download the mobile game to start your coding adventure',
      details: 'Choose between HTML (Web Development) or Python (AI/ML) paths and progress through story-driven levels'
    },
    {
      icon: Users,
      title: 'Connect',
      description: 'Join the community website to share and learn together',
      details: 'Post achievements, ask questions, and connect with fellow coders in a safe environment'
    },
    {
      icon: Shield,
      title: 'Stay Safe',
      description: 'Anonymous profiles protect your identity',
      details: 'No personal data, real names, or photos required. Children can learn safely'
    }
  ];

  const learningPaths = [
    {
      path: 'Web Development',
      language: 'HTML',
      icon: Globe,
      type: 'html',
      skills: ['Build websites', 'Structure content', 'Create forms', 'Design layouts']
    },
    {
      path: 'AI / Machine Learning',
      language: 'Python',
      icon: Brain,
      type: 'python',
      skills: ['Logic & variables', 'Loops & functions', 'Data analysis', 'Problem solving']
    }
  ];

  const safetyFeatures = [
    { icon: Lock, text: 'No personal data required' },
    { icon: Users, text: 'Anonymous usernames only' },
    { icon: Shield, text: 'Moderated community' },
    { icon: Heart, text: 'Child-safe design' }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-icon">
             <img src="/Codee Icon.png" alt="CODEE Logo" />
        </div>

        
        <h1 className="hero-title">Welcome to CODEE</h1>
        
        <p className="hero-description">
          Where coding becomes an adventure! Play the mobile game, level up your skills, 
          and connect with a community of young innovators.
        </p>

        <div className="hero-buttons">
          <button className="btn-primary">
            <Download size={20} />
            Download Mobile Game
          </button>

          <button className="btn-secondary">
            Learn More
            <ChevronRight size={20} />
          </button>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="section-header">
          <h2 className="section-title">How CODEE Works</h2>
          <p className="section-subtitle">
            Your journey from player to community member
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            
            return (
              <div
                key={index}
                className="feature-card"
                onMouseEnter={() => setActiveFeature(index)}
                onMouseLeave={() => setActiveFeature(null)}
              >
                <div className="feature-icon">
                  <Icon size={32} color="#000" />
                </div>
                
                <h3 className="feature-title">{feature.title}</h3>
                
                <p className="feature-description">{feature.description}</p>
                
                <p className="feature-details">{feature.details}</p>
              </div>
            );
          })}
        </div>

        {/* Journey Flow */}
        <div className="journey-flow">
          <h3 className="journey-title">Your CODEE Journey</h3>
          
          <div className="journey-steps">
            <div className="journey-step">
              <div className="journey-icon">📱</div>
              <p className="journey-step-title">Download Game</p>
              <p className="journey-step-desc">iOS or Android</p>
            </div>

            <div className="journey-arrow">→</div>

            <div className="journey-step">
              <div className="journey-icon">🎮</div>
              <p className="journey-step-title">Choose Path</p>
              <p className="journey-step-desc">HTML or Python</p>
            </div>

            <div className="journey-arrow">→</div>

            <div className="journey-step">
              <div className="journey-icon">⭐</div>
              <p className="journey-step-title">Earn XP</p>
              <p className="journey-step-desc">Complete quests</p>
            </div>

            <div className="journey-arrow">→</div>

            <div className="journey-step">
              <div className="journey-icon">🌐</div>
              <p className="journey-step-title">Join Community</p>
              <p className="journey-step-desc">Share & connect</p>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="learning-paths">
        <div className="paths-container">
          <div className="section-header">
            <h2 className="section-title">Choose Your Path</h2>
            <p className="section-subtitle">
              Two exciting journeys, endless possibilities
            </p>
          </div>

          <div className="paths-grid">
            {learningPaths.map((path, index) => {
              const Icon = path.icon;
              return (
                <div key={index} className={`path-card ${path.type}`}>
                  <div className="path-gradient"></div>

                  <div className="path-icon">
                    <Icon size={28} color="#000" />
                  </div>

                  <h3 className="path-name">{path.path}</h3>

                  <div className="path-language">{path.language}</div>

                  <div className="path-skills">
                    {path.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="skill-item">
                        <div className="skill-dot"></div>
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Characters */}
      <section className="characters-section">
        <div className="section-header">
          <h2 className="section-title">Meet Your Coding Heroes</h2>
          <p className="section-subtitle">
            Choose a character inspired by legendary programmers
          </p>
        </div>

        <div className="characters-grid">
          {characters.map((character, index) => (
            <div
              key={index}
              className="character-card"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = character.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(112, 234, 213, 0.2)';
              }}
            >
              <div className="character-icon">
                <img src={character.image} alt={`${character.name} profile`} />
              </div>

              
              <h3 className="character-name">{character.name}</h3>
              
              <p className="character-title" style={{ color: character.color }}>
                {character.title}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Safety & Privacy */}
      <section className="safety-section">
        <div className="safety-container">
          <div className="safety-icon">
            <Shield size={40} color="#000" />
          </div>

          <h2 className="safety-title">Safety First</h2>

          <p className="safety-description">
            We've designed CODEE with children's safety as our top priority. 
            All accounts are anonymous, and we never ask for personal information.
          </p>

          <div className="safety-grid">
            {safetyFeatures.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="safety-item">
                  <Icon size={24} color="#70ead5" />
                  <span className="safety-text">{item.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2 className="cta-title">Ready to Start Your Adventure?</h2>
        
        <p className="cta-description">
          Download CODEE today and join thousands of young coders building the future
        </p>

        <button className="btn-download-large">
          <Download size={24} />
          Download CODEE Mobile
        </button>

        <div className="platform-text">Available on iOS and Android</div>
      </section>
    </div>
  );
}

export default About;