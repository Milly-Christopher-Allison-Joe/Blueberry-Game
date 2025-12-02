export default function About() {
  return (
    <main className="about-page">
      <h1>About Us</h1>
      <p> Our team is made up of Joe, Christopher, Allison, and Milly! </p>
      {/* ask teammates if they have any ideas for what to add in these sections?  */}
      <h2> Our Mission</h2>
      <p>
        {" "}
        We want to offer our players a game that allows you to practice raiding
        bosses for a better success in the game World of Warcraft.
      </p>

      <h2>Divison of workload</h2>
      <h3 className="team-member">Joe Loverde</h3>
      <p>
        Focused on most of the game play mechanics itself as well as setting up
        the scenes, menus, boss mechanics and bosses.
      </p>
      <h3 className="team-member">Christopher Wright</h3>
      <p>
        Worked on player machanics, backend with high scores and setting up
        deployment.
      </p>
      <h3 className="team-member">Allison Andres</h3>
      <p>
        Focused on setting up the database, account registration, user login,
        and the routes.
      </p>
      <h3 className="team-member">Milly Montes</h3>
      <p>
        Worked on the styling of the website, creating the About and Home page,
        created the user and boss sprites.
      </p>
      <h2>Contact</h2>
      <p>
        Do you have feedback that will improve your gaming experience or did you
        find a bug? <a href="mailto:team@blueberryman.com">Email Us!</a>
      </p>
    </main>
  );
}
