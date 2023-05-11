import React from 'react';
import { rowParse } from '../utils';
import experience from '../data/experience.json';

function HistoryContainer({historyNature}) {
  return (
    <div className="history-container">
      {
        experience
        .filter(({visible, nature}) => (visible && nature === historyNature))
        .map(({time, effective, title, nature, place, url, details, education_details}, i) => (
          <div className={"history" + (effective ? " present" : "")} key={`exp-${i}`}>
            <div className="history-header names">
              {
                (nature === 'job')
                ? (<span className="position">{title}&nbsp;</span>)
                : (<span className="education-level">
                    <span className="level">{education_details.type}</span>
                    {" in "}
                    <span className="major">{education_details.major}&nbsp;</span>
                    <span className="grade">{`(${education_details.grade.type}: ${education_details.grade.score} / ${education_details.grade.max_score})`}</span>
                    &nbsp;
                  </span>)
              }
              <span className="place-group"><span className="at">at</span>&nbsp;{
                (!!url && url.length > 0 ) ? <a className="place" href={url}>{place}</a> : place
              }</span>
            </div>
            <div className={"history-header history-time" + (effective ? " present" : "")}>{time}</div>
            <div className={"full-row history-content" + (effective ? " present" : "")}>
              { (!!details && details.length > 0) && (
                <ul className="history-field desc">
                    {details.map((row, j) => {
                      const [ parsedRow, highlight ] = rowParse(row, "experience");
                      return <li className={"desc-item" + (highlight ? " highlight" : "")} key={`exp-${i}-${j}`}><div>{parsedRow}</div></li>
                    })}
                </ul>)
              }
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
      <div className="subcontainer">
        <div className="header">Working experience</div>
        <HistoryContainer historyNature="job"/>
      </div>
      <div className="subcontainer">
        <div className="header">Education</div>
        <HistoryContainer historyNature="degree"/>
      </div>
  </div>
  );
}