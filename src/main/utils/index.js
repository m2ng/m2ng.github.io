import tags from '../data/tags.json';

export const parseTag = (raw, section) => {
  const tagName = raw.replace(/#/g, "").replace(/_/g, " ").replace(/\s{2,}/, "_");
  const tooltips = tags.filter(x => x.section === section).flatMap(x => x.tags).filter(x => x.name === tagName).flatMap(x => x.tooltip);

  return [tagName, !!tooltips.length ? tooltips[0] : null];
}

export const rowParse = (row, section) => {
  const splits = row.replace(/^!!/, "").trim().split(" ");
  // console.log(row.startsWith("!!"));
  return [
    splits.flatMap((x, i) => {
      if (x.startsWith("#")) {
        const [tagName, tooltip] = parseTag(x, section);
        if (!!tooltip) {
          return [
            <span className="tag" key={`tag-${i}`}><span>{tagName}</span>
              <div className="tooltip disable-select">{tooltip}</div>
            </span>,
            " "
          ]
        } else {
          return [<span className="tag" key={`tag-${i}`}><span>{tagName}</span></span>, " "]
        }
        
      } else {
        return x + (i < splits.length ? " " : "")
      }
    }),
    row.startsWith("!!")
  ];
};

