import React from 'react';

export default function Me() {
  return (
    <div className="me">
      <img className="profile-pic" src="assets/NGMingHin_pic.jpg" alt="profile"></img>
      <div className="name">NG Ming Hin</div>
      <div className="title">Data Scientist <br/>&amp;<br/> Research Assistant</div>
      <ul className="contact">
          <li className="contact-method"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path d="M0 0h24v24H0z" fill="none"/><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/></svg><span>(+852) 9349 1019</span></li>
          <li className="contact-method"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg><span><a href="mailto:ngmhmatthew@gmail.com">ngmhmatthew@gmail.com</a></span></li>
          <li className="contact-method"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path d="M0 0h24v24H0z" fill="none"/><path d="M9 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm6 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37C11.07 8.33 14.05 10 17.42 10c.78 0 1.53-.09 2.25-.26.21.71.33 1.47.33 2.26 0 4.41-3.59 8-8 8z"/></svg><span><a href="https://www.linkedin.com/in/matthew-ng-85690213b/" target="_blank" rel="noreferrer">LinkedIn</a> / <a href="https://github.com/m2ng/" target="_blank" rel="noreferrer">GitHub</a></span></li>
          <li className="contact-method"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path d="M0 0h24v24H0z" fill="none"/><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg><a href="https://m2ng.github.io">m2ng.github.io</a></li>
      </ul>
      <div className="intro">
          <p><strong>{">"}</strong> Hi, I am <strong>Matthew</strong>.</p>
          {/* <p><strong>{">"}</strong> I have a very strong interest in data, particularly in <span className="highlight-1">data science</span>, <span className="highlight-1">deep learning</span> and <span className="highlight-1">big data</span>. My willingness to learn allows me to familiarize myself with new things quickly and be open to others' opinions.</p> */}
          <p><strong>{">"}</strong> I have 4 years' experience in data science including 2 years' work experience and 2 years' research experience.</p>
      </div>
    </div>
  );
}