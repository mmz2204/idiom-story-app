import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import fs from "fs";
import path from "path";

export default function Story({ images, texts, storyName }) {
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (texts[page]) {
      const utter = new SpeechSynthesisUtterance(texts[page]);
      speechSynthesis.speak(utter);
    }
  }, [page, texts]);

  const next = () => setPage(p => Math.min(p + 1, images.length - 1));
  const prev = () => setPage(p => Math.max(p - 0, 0));

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", fontFamily: "Arial", textAlign: "center" }}>
      <h1>{storyName}</h1>
      <div style={{ position: "relative" }}>
        <img src={images[page]} style={{ width: "100%", borderRadius: 10 }} />
        <div style={{
          position: "absolute",
          bottom: 20,
          left: 0,
          width: "100%",
          textAlign: "center",
          color: "white",
          fontSize: 18,
          fontWeight: "bold",
          textShadow: "2px 2px 4px black"
        }}>
          {texts[page]}
        </div>
      </div>
      <div style={{ marginTop: 20 }}>
        <button onClick={prev} disabled={page===0} style={{ marginRight: 10 }}>上一页</button>
        <button onClick={next} disabled={page===images.length-1}>下一页</button>
      </div>
      <div style={{ marginTop: 10 }}>
        <a href="/">← 返回首页</a>
      </div>
    </div>
  )
}

export async function getStaticPaths() {
  const storiesDir = path.join(process.cwd(), "public/stories");
  const storyNames = fs.readdirSync(storiesDir).filter(f => fs.statSync(path.join(storiesDir,f)).isDirectory());
  const paths = storyNames.map(name => ({ params: { storyName: name }}));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const storyDir = path.join(process.cwd(), "public/stories", params.storyName);
  const files = fs.readdirSync(storyDir).filter(f => f.endsWith(".png")).sort();
  const images = files.map(f => `/stories/${params.storyName}/${f}`);
  const textPath = path.join(storyDir, "text.json");
  let texts = [];
  if (fs.existsSync(textPath)) {
    texts = JSON.parse(fs.readFileSync(textPath, "utf-8"));
  } else {
    texts = images.map((_,i)=>`第 ${i+1} 页故事文字`);
  }
  return { props: { images, texts, storyName: params.storyName } };
}