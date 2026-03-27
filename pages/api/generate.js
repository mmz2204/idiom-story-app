export default function handler(req, res) {
  const { word } = req.query;

  if (!word) {
    return res.status(400).json({ error: "缺少成语参数" });
  }

  const fakeStories = {
    "守株待兔": "从前有个农夫偶然捡到一只撞树的兔子，于是天天守在树旁等待。结果再也没有兔子来。",
    "刻舟求剑": "一个人剑掉进水里，却在船上刻记号找剑，结果找不到。",
    "画蛇添足": "有人画蛇比赛，先画完却给蛇加脚，结果输了。"
  };

  const story =
    fakeStories[word] ||
    `这是关于${word}的故事：很久以前，人们通过这个成语学会了重要的道理。`;

  res.status(200).json({
    title: word + "的故事",
    story,
    moral: "寓意：做事要动脑，不要犯错误。"
  });
}
