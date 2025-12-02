import joeImage from "../assets/creators/joe.png";
import christopherImage from "../assets/creators/christopher.jpeg";
import allisonImage from "../assets/creators/allison.jpeg";
import millyImage from "../assets/creators/milly.png";
import backgroundImage from "../assets/background.jpg";

export default function About() {
  return (
    <main
      className="about-page"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <h1> Our Mission</h1>
      <p>
        We want to offer our players a game that allows you to practice raiding
        bosses for a better success in the game World of Warcraft.
      </p>
      {/* added css and added a team grid to the about page with the teams pictures and their roles and a description of what they did  */}
      <h2>Division of Workload</h2>
      <div className="team-grid">
        <div className="team-card">
          <img src={joeImage} alt="Joe Loverde" className="team-photo" />
          <h3 className="team-member">Joe Loverde</h3>
          <h4>Role:</h4>
          <p className="role">Project Lead, Game Developer</p>
          <p className="description">
            Focused on most of the game play mechanics itself as well as setting
            up the scenes, menus, boss mechanics and bosses.
          </p>
        </div>

        <div className="team-card">
          <img
            src={christopherImage}
            alt="Christopher Wright"
            className="team-photo"
          />
          <h3 className="team-member">Christopher Wright</h3>
          <h4>Role:</h4>
          <p className="role">Game Developer, Backend Developer</p>
          <p className="description">
            Worked on player mechanics, backend with high scores and setting up
            deployment.
          </p>
        </div>

        <div className="team-card">
          <img src={allisonImage} alt="Allison Andres" className="team-photo" />
          <h3 className="team-member">Allison Andres</h3>
          <h4>Role:</h4>
          <p className="role">Backend Developer</p>
          <p className="description">
            Focused on setting up the database, account registration, user
            login, and the routes.
          </p>
        </div>

        <div className="team-card">
          <img src={millyImage} alt="Milly Montes" className="team-photo" />
          <h3 className="team-member">Milly Montes</h3>
          <h4>Role:</h4>
          <p className="role">Frontend Developer, Web Designer</p>
          <p className="description">
            Worked on the styling of the website, created the About and Home
            page, created the user and boss sprites.
          </p>
        </div>
      </div>

      <h2>Contact</h2>
      <p>
        Do you have feedback that will improve your gaming experience or did you
        find a bug? <a href="mailto:team@blueberryman.com">Email Us!</a>
      </p>
    </main>
  );
}
