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
  return (
    <div className="experience">
      <div className="header">Experience</div>
      <div className="history-container">
          <div className="history present">
              <div className="history-time">July 2021 &mdash; Present</div>
              <div className="history-content">
                  <div className="history-field place">LORA Technologies</div>
                  <div className="history-field title">Data Scientist</div>
              </div>
          </div>
          <div className="history">
              <div className="history-time"><span>July 2019 &mdash; June 2021</span></div>
              <div className="history-content">
                  <div className="history-field place">The Chinese University of Hong Kong</div>
                  <div className="history-field degree">MPhil in Statistics (CGPA: 3.910 / 4.000)</div>
                  <hr/>
                  <ul className="history-field desc">
                      <li className="desc-item highlight"><div>Equipped myself with a set of transferable problem-solving skills during research</div></li>
                      <li className="desc-item"><div>Developed a scalable machine learning method to enable association detection over a million of genetic loci for a million of individuals</div></li>
                      <li className="desc-item"><div>Tags: <span className="tag">C++ &amp; OpenMP</span><span className="tag">Parallel computing</span><span className="tag">Big data analysis</span></div></li>
                  </ul>
              </div>
          </div>
          <div className="history">
              <div className="history-time"><span>June 2018 &mdash; July 2019</span></div>
              <div className="history-content">
                  <div className="history-field place">Hong Kong Telecom</div>
                  <div className="history-field title">Data Science Analyst</div>
                  <hr/>
                  <ul className="history-field desc">
                      <li className="desc-item"><div>Gathered <em>hundreds of thousands of products</em> with efficient <span className="tag">web crawling</span> techniques from a popular e-commerce platform</div></li>
                      <li className="desc-item"><div>Designed and developed the <span className="tag">recommender system</span> for an e-commerce platform</div></li>
                      <li className="desc-item"><div>Enabled streaming of web analytics data to a <span className="tag">MongoDB</span> database</div></li>
                      <li className="desc-item"><div>User behavior analysis driven by <span className="tag">Apache Spark</span></div></li>
                      <li className="desc-item"><span className="tag">Agile</span> project management using <span className="tag">Jira</span></li>
                      <li className="desc-item"><div>Familiar with using <span className="tag">AWS</span> EC2 instances</div></li>
                  </ul>
              </div>
          </div>
          <div className="history">
              <div className="history-time"><span>Sep 2014 &mdash; July 2018</span></div>
              <div className="history-content">
                  <div className="history-field place">The Chinese University of Hong Kong</div>
                  <div className="history-field degree">BSc in Statistics (CGPA: 3.363 / 4.000)</div>
                  <hr/>
                  <ul className="history-field desc">
                      <li className="desc-item"><div>Programming coursework: <span className="tag">Python</span><span className="tag">Excel & VBA</span><span className="tag">Java</span><span className="tag">R</span></div></li>
                      <li className="desc-item"><div>Department of Statistics Scholarship 2015/16, 2017/18; Academic Merit in 07/2017; Advantage Trust Statistics Scholarship 2015/2016</div></li>
                  </ul>
              </div>
          </div>
      </div>
  </div>
  );
}