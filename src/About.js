import React from 'react';

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

        <section className="about-section">
          <h2>Learning Through Play</h2>
          <p>
            Codee isn't just a game—it's a complete learning ecosystem built on the principle that 
            the best way to learn is by doing, exploring, and having fun along the way.
          </p>
          
          <h3>Game Features:</h3>
          <ul className="feature-list">
            <li>Story-driven levels with unique narratives for each learning path</li>
            <li>Interactive coding challenges that teach real-world skills</li>
            <li>Boss battles and special levels that unlock achievements</li>
            <li>XP progression, ranks, and unlockable titles</li>
            <li>Avatar customization to express your journey</li>
            <li>Leaderboards to see how you stack up with fellow coders</li>
          </ul>

          <h3>Safe Community Features:</h3>
          <ul className="feature-list">
            <li>Anonymous profiles protecting your privacy</li>
            <li>Moderated forums organized by topic (General, Achievements, Help, Python, HTML)</li>
            <li>Share your progress, ask questions, and celebrate wins</li>
            <li>Friend system to connect with other learners</li>
            <li>Child-safe design with no private messaging or personal data exposure</li>
          </ul>
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

        <section className="about-section codefest-section">
          <h2>About CodeFest Network</h2>
          <p>
            Codee is proudly part of the <strong>CodeFest Network</strong>, a global movement dedicated 
            to empowering the next generation of tech innovators through hands-on learning, community 
            building, and competitive programming opportunities.
          </p>

          <h3>The CodeFest Mission</h3>
          <p>
            CodeFest Network exists to democratize tech education and create pathways for young minds 
            to discover, develop, and deploy their potential in computer science and technology. Through 
            hackathons, bootcamps, educational programs, and now Codee, we're building a world where 
            every student has the opportunity to become a creator, problem-solver, and innovator.
          </p>

          <h3>From Bootcamp to Hackathon: Your Journey Continues</h3>
          <p>Codee is your starting point, but the CodeFest Network offers much more:</p>
          <p><strong>After Codee, you can:</strong></p>
          <ul className="feature-list">
            <li>Join CodeFest hackathons and work in teams to solve real-world challenges</li>
            <li>Compete for prizes while building your portfolio</li>
            <li>Connect with mentors and industry professionals</li>
            <li>Participate in bootcamps that deepen your skills</li>
            <li>Become part of a global community of young innovators</li>
          </ul>
          <p>
            Whether you're just beginning your coding journey in Codee or you're ready to compete in 
            your first hackathon, CodeFest Network provides the support, community, and opportunities 
            you need to thrive.
          </p>

          <h3>Building the Future, Together</h3>
          <p>At CodeFest Network, we believe that technology should be accessible to everyone. We're committed to:</p>
          <ul className="feature-list">
            <li>Creating safe, inclusive learning environments</li>
            <li>Fostering creativity and innovation</li>
            <li>Supporting students regardless of background or experience</li>
            <li>Preparing the next generation for careers that don't yet exist</li>
            <li>Making STEM education exciting, relevant, and achievable</li>
          </ul>
        </section>

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