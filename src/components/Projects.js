import React from 'react';

export default function Projects() {
  return (
    <div className="projects">
      <div className="header">Projects</div>
      <div className="project-container">
          <div className="project-group">
              <div className="subgroup-header">Machine learning for business</div>
              <ul className="project-group-list">
                  <li className="project highlight"><div>E-commerce recommender system</div></li>
                  <li className="project highlight"><div>Transform product name and product description into comparable numeric vectors</div></li>
              </ul>
          </div>
          <div className="project-group">
              <div className="subgroup-header">Machine Learning</div>
              <ul className="project-group-list">
                  <li className="project highlight"><div>Passenger Screening Algorithm Challenge</div></li>
                  <li className="project"><div>Predicting winning probabilities in HK horse racing</div></li>
              </ul>
          </div>
          <div className="project-group">
              <div className="subgroup-header">Data acquisition</div>
              <ul className="project-group-list">
                  <li className="project highlight"><div>Stream web analytics data to MongoDB</div></li>
                  <li className="project"><div>Create profiles for websites</div></li>
              </ul>
          </div>
      </div>
    </div>
  );
}