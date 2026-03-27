import Link from "next/link";

export default function Home({ stories }) {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", fontFamily: "Arial" }}>
      <h1>📚 AI成语图文故事</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
        {stories.map(story => (
          <Link key={story.name} href={`/story/${story.name}`}>
            <div style={{ position: "relative", width: 200, cursor: "pointer" }}>
              <img src={`/stories/${story.name}/0.png`} style={{ width: "100%", borderRadius: 10 }} />
              <div style={{
                position: "absolute",
                bottom: 10,
                left: 0,
                width: "100%",
                textAlign: "center",
                color: "white",
                fontWeight: "bold",
                textShadow: "1px 1px 3px black"
              }}>
                {story.name}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const fs = require("fs");
  const path = require("path");

  const storiesDir = path.join(process.cwd(), "public/stories");
  const storyNames = fs.readdirSync(storiesDir).filter(f => fs.statSync(path.join(storiesDir,f)).isDirectory());
  const stories = storyNames.map(name => ({ name }));
  return { props: { stories } };
}