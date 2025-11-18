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
      <p> do we want to add this section? </p>

      <h2>Contact</h2>
      <p>
        Do you have feedback that will improve your gaming experience or did you
        find a bug? <a href="mailto:team@blueberryman.com">Email Us!</a>
      </p>
    </main>
  );
}
