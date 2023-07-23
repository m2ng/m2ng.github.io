// import React from 'react';
import { parseTag } from '../utils';
import skills from '../data/skills.json';

export default function Skills() {
  return (
    <div className="skills left subcontainer">
      <div className="header">Skills</div>
      {
          skills.map(({ group, skills }, i) => (
            <div className="skills-subgroup" key={`skill-${i}`}>
                <div className="subgroup-header">{group}</div>
                <ul className="skills-list">
                    {skills.map((row, j) => {
                        return <li className="skill tag" key={`li-skill-${i}-${j}`}>{parseTag(row)}</li>;
                    })}
                </ul>
            </div>
          ))
      }
    </div>
  );
}