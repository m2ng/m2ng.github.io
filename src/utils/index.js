export const parseTag = raw => {
  return raw.replace(/#/g, "").replace(/_/g, " ").replace(/\s{2,}/, "_")
}

export const rowParse = row => {
  const splits = row.replace(/^!!/, "").trim().split(" ");
  // console.log(row.startsWith("!!"));
  return [
    splits.flatMap((x, i) => {
      if (x.startsWith("#")) {
        return [<span className="tag" key={`tag-${i}`}>{parseTag(x)}</span>, " "]
      } else {
        return x + (i < splits.length ? " " : "")
      }
    }),
    row.startsWith("!!")
  ];
};
