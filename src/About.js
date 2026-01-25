import React from 'react';
import './About.css';  

function About() {
  return (
    <div className="about-page">
      <div className="about-header">
        <div className="about-header-content">
          <div className="about-icon">
            <img src="/Codee Icon.png" alt="Codee Logo" />
          </div>
          <div className="about-header-text">
            <h1>About Codee</h1>
            <p>Welcome to Your Coding Adventure</p>
          </div>
        </div>
      </div>

      <div className="about-content">
        <section className="about-section">
          <p className="intro-text">
            Codee (Code With Me) is an interactive educational mobile game and community platform 
            designed to make learning programming fun, engaging, and accessible for everyone—especially 
            students, children, and beginners who dream of creating the future through code.
          </p>
        </section>

        <section className="about-section">
          <h2>What is Codee?</h2>
          <p>
            Codee transforms the sometimes intimidating world of programming into an exciting 8-bit 
            adventure. Players embark on story-driven quests, solve coding challenges, and build real 
            skills in HTML or Python while exploring a vibrant retro-pixel world. Whether you're 
            interested in building websites or diving into AI and machine learning, Codee makes your 
            first steps in programming feel like an epic adventure.
          </p>
        </section>

        <section className="about-section">
          <h2>Two Paths. One Journey. Endless Possibilities.</h2>
          <p>Choose your adventure:</p>
          <div className="learning-paths">
            <div className="path-card">
              <div className="path-icon">🌐</div>
              <h3>Web Development Path</h3>
              <p>
                Master HTML and learn to build websites, structure content, create forms, and bring 
                ideas to life on the internet
              </p>
            </div>
            <div className="path-card">
              <div className="path-icon">🤖</div>
              <h3>AI / Machine Learning Path</h3>
              <p>
                Explore Python fundamentals, unlock the logic behind intelligent systems, and 
                understand the technology shaping tomorrow
              </p>
            </div>
          </div>
        </section>

        {/* --- LEARNING THROUGH PLAY BENTO --- */}
        <section className="about-section">
          <h2>Learning Through Play</h2>
          <p className="section-intro">
            Codee isn't just a game—it's a complete learning ecosystem built on the principle that 
            the best way to learn is by doing, exploring, and having fun along the way.
          </p>
          
          <div className="bento-grid">
            <div className="bento-card card-wide">
              <div className="bento-icon">⚡</div>
              <h3>Immersive Learning Adventure</h3>
              <p>
                Codee isn't just a lesson—it's a journey. We combine story-driven quests with 
                real-world programming challenges, allowing you to instantly translate code 
                into in-game actions and narrative progress.
              </p>
            </div>

            <div className="bento-card card-tall">
              <div className="bento-icon">🛠️</div>
              <h3>The Gamification Core</h3>
              <ul className="bento-list">
                <li>Interactive Boss Battles</li>
                <li>XP & Global Ranking System</li>
                <li>Unlockable Titles & Badges</li>
                <li>Character Customization</li>
                <li>Competitive Leaderboards</li>
                <li>Real-time Progress Tracking</li>
                <li>Daily Streak Rewards</li>
              </ul>
            </div>

            <div className="bento-card card-square">
              <div className="bento-icon">👥</div>
              <h3>Safe Community</h3>
              <p>
                Share progress, ask questions, and celebrate wins in a moderated environment 
                designed specifically for student safety.
              </p>
            </div>

            <div className="bento-card card-square">
              <div className="bento-icon">🛡️</div>
              <h3>Privacy First</h3>
              <p>
                Built with digital safety in mind. Anonymous profiles and strict data protection 
                ensure a worry-free experience for parents.
              </p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Why Codee Matters</h2>
          <p>
            Programming is the literacy of the future. Yet too many young minds are intimidated by 
            complex syntax, boring tutorials, and the fear of making mistakes. Codee removes these 
            barriers by:
          </p>
          <ul className="feature-list">
            <li><strong>Making it safe to fail</strong> - In Codee, mistakes are part of the adventure</li>
            <li><strong>Building confidence</strong> - Progress is visible, achievements are celebrated</li>
            <li><strong>Creating community</strong> - You're never alone on your coding journey</li>
            <li><strong>Keeping it fun</strong> - Retro gaming meets modern education</li>
            <li><strong>Preparing for tomorrow</strong> - Build skills that open doors to hackathons, competitions, and tech careers</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Who is Codee For?</h2>
          <div className="audience-grid">
            <div className="audience-card">
              <div className="audience-icon">🎓</div>
              <p>Students exploring computer science and looking for a fun entry point into programming</p>
            </div>
            <div className="audience-card">
              <div className="audience-icon">👶</div>
              <p>Children (ages 8+) who love games and are curious about how technology works</p>
            </div>
            <div className="audience-card">
              <div className="audience-icon">🌱</div>
              <p>Beginners of any age taking their first steps into web development or AI/ML</p>
            </div>
            <div className="audience-card">
              <div className="audience-icon">💡</div>
              <p>Future innovators preparing to participate in hackathons, coding competitions, and the tech community</p>
            </div>
            <div className="audience-card">
              <div className="audience-icon">✨</div>
              <p>Anyone who believes learning should be an adventure, not a chore</p>
            </div>
          </div>
        </section>

        {/* --- NEW CODEFEST BENTO SECTION --- */}
        <section className="about-section codefest-section">
          <h2>About CodeFest Network</h2>
          <p className="section-intro">
             Empowering the next generation of tech innovators through hands-on learning and global opportunities.
          </p>

          <div className="bento-grid">
            {/* 1. Wide Card: Mission & Intro */}
            <div className="bento-card card-wide">
              <div className="bento-icon">🌍</div>
              <h3>The Global Mission</h3>
              <p style={{marginBottom: '16px'}}>
                Codee is proudly part of the <strong>CodeFest Network</strong>. We exist to democratize tech education and create pathways for young minds to discover, develop, and deploy their potential.
              </p>
              <p>
                Through hackathons, bootcamps, and educational programs, we're building a world where every student has the opportunity to become a creator, problem-solver, and innovator.
              </p>
            </div>

            {/* 2. Tall Card: Journey List */}
            <div className="bento-card card-tall">
              <div className="bento-icon">🚀</div>
              <h3>Your Journey Continues</h3>
              <p style={{marginBottom: '20px', fontSize: '14px', color: '#9ca3af'}}>
                Codee is just the start. After mastering the basics, you can:
              </p>
              <ul className="bento-list check-list">
                <li>Join CodeFest Hackathons</li>
                <li>Solve Real-World Challenges</li>
                <li>Compete for Global Prizes</li>
                <li>Connect with Mentors</li>
                <li>Deepen Skills in Bootcamps</li>
                <li>Join a Network of Innovators</li>
              </ul>
            </div>

            {/* 3. Wide Card: Future List (Split Layout) */}
            <div className="bento-card card-wide">
              <div className="bento-icon">🤝</div>
              <h3>Building the Future, Together</h3>
              <p style={{marginBottom: '20px'}}>
                At CodeFest Network, we believe technology should be accessible to everyone. We are committed to:
              </p>
              <ul className="bento-list check-list two-col-list">
                <li>Creating inclusive environments</li>
                <li>Fostering creativity & innovation</li>
                <li>Supporting all students</li>
                <li>Preparing for future careers</li>
                <li>Making STEM exciting & achievable</li>
              </ul>
            </div>
          </div>
        </section>
        {/* --- END CODEFEST BENTO SECTION --- */}

        <section className="about-section cta-section">
          <h2>Join the Adventure</h2>
          <p>
            Ready to start your coding journey? Download Codee, choose your path, and discover what 
            you're capable of creating. Your adventure begins now.
          </p>
          <p className="tagline"><strong>Play. Learn. Create. Connect.</strong></p>
          
          <div className="cta-buttons">
            <a href="https://codefest.network/" target="_blank" rel="noopener noreferrer" className="cta-button">
              Visit CodeFest Network
            </a>
          </div>

          <div className="help-section">
            <h3>Have Questions?</h3>
            <p>
              Visit our Help forum in the community section, where experienced players and moderators 
              are ready to support your learning journey.
            </p>
          </div>

          <p className="closing-text">
            <strong>Codee and CodeFest Network</strong> - Empowering tomorrow's innovators, one quest at a time.
          </p>
        </section>
      </div>
    </div>
  );
}

export default About;