import { useState } from "react";

export default function Home() {
  const [word, setWord] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!word) {
      alert("请输入成语");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`/api/generate?word=${encodeURIComponent(word)}`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
      alert("生成失败，请重试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "50px auto", fontFamily: "Arial" }}>
      <h1>📚 AI成语故事生成器</h1>

      <input
        style={{ width: "100%", padding: 10, marginTop: 10 }}
        value={word}
        onChange={(e) => setWord(e.target.value)}
        placeholder="输入成语，比如：守株待兔"
      />

      <button
        onClick={generate}
        style={{ marginTop: 10, padding: 10, width: "100%" }}
      >
        {loading ? "生成中..." : "生成故事"}
      </button>

      {data && (
        <div style={{ marginTop: 30, padding: 20, border: "1px solid #ddd" }}>
          <h2>{data.title}</h2>
          <p>{data.story}</p>
          <b>{data.moral}</b>
        </div>
      )}
    </div>
  );
}