import React from 'react';
import { rowParse } from '../utils';
import experience from '../data/experience.json';

export default function Experience() {
  return (
    <div className="experience">
      <div className="header">Experience</div>
      <div className="history-container">
          {experience.map(({time, effective, title, place, nature, details}, i) => (
            <div className={"history" + (effective ? " present" : "")} key={`exp-${i}`}>
                <div className="history-time">{
                  effective ? time : <span>{time}</span>
                }</div>
                <div className={"history-content" + (effective ? " present" : "")}>
                    <div className="history-field place">{place}</div>
                    <div className="history-field title">{title}</div>
                    {/* <hr/> */}
                    <ul className="history-field desc">
                        {details.map((row, j) => {
                          const [ parsedRow, highlight ] = rowParse(row);
                          // console.log(parsedRow);
                          return <li className={"desc-item" + (highlight ? " highlight" : "")} key={`exp-${i}-${j}`}><div>{parsedRow}</div></li>
                        })}
                    </ul>
                </div>
            </div>
          ))}
      </div>
  </div>
  );
}