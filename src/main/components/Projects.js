import React from 'react';
import { rowParse } from '../utils';
import projects from '../data/projects.json';

export default function Projects() {
  return (
    !!projects.length && (
    <div className="projects subcontainer">
      <div className="header">Projects</div>
      <div className="project-container">
          {projects.map(({ group, details }, i) => {
              return (
                <div className="project-group" key={`proj-${i}`}>
                    <div className="subgroup-header">{group}</div>
                    <ul className="project-group-list">
                        {details.map((row, j) => {
                            const [ parsedRow, highlight ] = rowParse(row, 'projects');
                            return <li className={"project" + (highlight ? " highlight" : "")} key={`proj-${i}-${j}`}><div>{parsedRow}</div></li>
                        })}
                    </ul>
                </div>
              );
          })}
      </div>
    </div>
  ))
}