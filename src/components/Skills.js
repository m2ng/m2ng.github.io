import React from 'react';

export default function Skills() {
  return (
    <div className="skills">
      <div className="header">Skills</div>
      <div className="skills-subgroup">
          <div className="subgroup-header">Data-related</div>
          <ul className="skills-list">
              <li className="skill">TensorFlow</li>
              <li className="skill">Jupyter stack</li>
              <li className="skill">Tableau</li>
              <li className="skill">SQL</li>
              <li className="skill">Spark</li>
              <li className="skill">Hadoop</li>
              <li className="skill">Big data</li>
          </ul>
      </div>
      <div className="skills-subgroup">
          <div className="subgroup-header">Programming languages</div>
          <ul className="skills-list">
              <li className="skill">Python</li>
              <li className="skill">C++</li>
              <li className="skill">Java</li>
              <li className="skill">R</li>
              <li className="skill">Excel VBA</li>
          </ul>
      </div>
      <div className="skills-subgroup">
          <div className="subgroup-header">Web-related</div>
          <ul className="skills-list">
              <li className="skill">CSS</li>
              <li className="skill">Javascript</li>
              <li className="skill">React.js</li>
          </ul>
      </div>
    </div>
  );
}