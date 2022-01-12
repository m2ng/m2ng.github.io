import React from 'react';
import experience from '../data/experience.json';

// export default function Experience() {
//     return (
//         <div className="experience">
//             <div className="header">Experience</div>
//             <div className="history-container">
//                 {experience.map(({time, title, place, details}) => {
//                     return (
//                         <div className="history">
//                             <div className="history-time">{time}</div>
//                             <div className="history-content">
//                                 <div className="history-field title">{title}</div>
//                                 <div className="history-field place">{place}</div>
//                             {details.length > 0 ? (
//                                 <ul className="history-field desc">
//                                     {details.map(detail => (
//                                         <li className="desc-item"><div>{detail}</div></li>
//                                     ))}
//                                 </ul>
//                             ) : ''}
//                             </div>
//                         </div>
//                     )
//                 })}
//             </div>
//         </div>
//     )
// }


export default function Experience() {
  const rowParse = row => {
    const splits = row.replace(/^!!/, "").trim().split(" ");
    console.log(row.startsWith("!!"));
    return [
      splits.map((x, i) => {
        if (x.startsWith("#")) {
          return <span className="tag">{x.replace(/#/g, "").replace(/_/g, " ").replace(/\s{2,}/, "_")}</span>
        } else {
          return x + (i < splits.length ? " " : "")
        }
      }),
      row.startsWith("!!")
    ];
  };

  return (
    <div className="experience">
      <div className="header">Experience</div>
      <div className="history-container">
          {experience.map(({time, effective, title, place, nature, details}) => (
            <div className={"history" + (effective ? " present" : "")}>
                <div className="history-time">{
                  effective ? time : <span>{time}</span>
                }</div>
                <div className="history-content">
                    <div className="history-field place">{place}</div>
                    <div className="history-field title">{title}</div>
                    <hr/>
                    <ul className="history-field desc">
                        {details.map(row => {
                          const [ parsedRow, highlight ] = rowParse(row);
                          console.log(parsedRow);
                          return <li className={"desc-item" + (highlight ? " highlight" : "")}><div>{parsedRow}</div></li>
                        })}
                    </ul>
                </div>
            </div>
          ))}
      </div>
  </div>
  );
}