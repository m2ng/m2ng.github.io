import './App.scss';
import Me from './components/Me';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Footer from './components/Footer';
import { useMediaQuery } from './components/Hooks';
// import Timeline from './components/Timeline';

function App() {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  return (
    isDesktop ? (
      <div className="container">
        <div className="column left">
          <Me/>
          <Skills/>
        </div>
        <div className="column right">
          {/* <Timeline/> */}
          <Experience/>
          <Projects/>
        </div>
        <Footer/>
      </div>
    ) : (
      <div className="container">
        <Me/>
        <Experience/>
        <Projects/>
        <Skills/>
        <Footer/>
      </div>
    )
  )
}

export default App;
