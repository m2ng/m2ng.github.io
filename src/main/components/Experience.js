import React from 'react';
import { rowParse } from '../utils';
import experience from '../data/experience.json';

function HistoryContainer({historyNature}) {

  return (
    <div className="history-container">
      {
        experience
        .filter(({nature}) => nature === historyNature)
        .map(({time, effective, title, place, url, details}, i) => (
          <div className={"history" + (effective ? " present" : "")} key={`exp-${i}`}>
              <div className="history-time subgroup-header">{
                effective ? time : <span>{time}</span>
              }</div>
              <div className={"history-content" + (effective ? " present" : "")}>
                    <>
                      <div className="history-field names">
                        <span className="position">{title}&nbsp;</span>
                        <span className="place">{"@"}&nbsp;{
                          (!!url && url.length > 0 ) ? <a href={url}>{place}</a> : place
                        }</span>
                      </div>
                    { (!!details && details.length > 0) && (
                      <ul className="history-field desc">
                          {details.map((row, j) => {
                            const [ parsedRow, highlight ] = rowParse(row, "experience");
                            return <li className={"desc-item" + (highlight ? " highlight" : "")} key={`exp-${i}-${j}`}><div>{parsedRow}</div></li>
                          })}
                      </ul>)
                    }
                    </>
              </div>
          </div>
        ))
      }
    </div>
  );
}

export default function Experience() {
  return (
    <div className="experience">
      <div className="experience-container">
        <div className="header">Working experience</div>
        <HistoryContainer historyNature="job"/>
      </div>
      <div className="experience-container">
        <div className="header">Education</div>
        <HistoryContainer historyNature="degree"/>
      </div>
  </div>
  );
}