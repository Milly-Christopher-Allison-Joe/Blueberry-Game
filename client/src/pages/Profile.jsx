import { useAuth } from "../auth/AuthContext";
import { useEffect, useState } from "react";

export default function Profile() {
  const { user } = useAuth();
  const [scores, setScores] = useState([]);

  useEffect(() => {
    if (!user?.id) return;
    fetch(`/api/highscore?userId=${user.id}`)
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setScores(Array.isArray(data) ? data : []))
      .catch(() => setScores([]));
  }, [user]);
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
              {Array.isArray(scores) && scores.length === 0 ? (
                <div className="empty-scores">No scores yet</div>
              ) : (
                Array.isArray(scores) &&
                scores.map((score) => (
                  <div className="score-item" key={score.boss_id}>
                    <span className="score-value">{score.best_time}</span>
                    <span className="score-date">{score.updated_at || ""}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="boss-score-card">
            <h3 className="boss-name">Placeholder</h3>
            <div className="score-list">
              <div className="empty-scores">No scores yet</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
