import { useAuth } from "../auth/AuthContext";

export default function Profile() {
  const { user } = useAuth();
  return (
    <main className="profile-page">
      <h1>Profile</h1>
      <p>Welcome, {user?.username}!</p>

      {/* high scores based off boss section  */}
      <section className="high-scores-section">
        <h2>High Scores</h2>
        <div className="boss-scores">
          <div className="boss-score-card">
            <h3 className="boss-name">Plexus Sentinel</h3>
            <div className="score-list">
              {/* figure out how to get the scores from the database*/}
              {/* div for score-item -- <div className="score-item">
                  span for score-value --<span className="score-value">
                 span for score-date -- <span className="score-date"> */}
              <div className="empty-scores">No scores yet</div>
            </div>
          </div>

          <div className="boss-score-card">
            <h3 className="boss-name">Placeholder</h3>
            <div className="score-list">
              {/* figure out how to get the scores from the database*/}
              {/* div for score-item -- <div className="score-item">
                  span for score-value --<span className="score-value">
                 span for score-date -- <span className="score-date"> */}
              <div className="empty-scores">No scores yet</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
