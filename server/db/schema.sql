DROP TABLE IF EXISTS users_boss;
DROP TABLE IF EXISTS boss;
DROP TABLE IF EXISTS users;

-- USER TABLE
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

-- BOSS TABLE
CREATE TABLE boss (
    id SERIAL PRIMARY KEY,
    key TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    base_time INTERVAL
);

-- JOIN TABLE
CREATE TABLE users_boss (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    boss_id INT NOT NULL REFERENCES boss(id) ON DELETE CASCADE,
    completion_time INTERVAL NOT NULL
);

-- Table to connect users, scores, and bosses
CREATE TABLE user_boss_scores (
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  boss_id INT REFERENCES boss(id) ON DELETE CASCADE,
  best_time FLOAT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, boss_id)
);