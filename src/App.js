import './App.scss';
import Me from './components/Me';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Footer from './components/Footer';

function App() {
  return (
    <div className="container">
      <Me/>
      <Skills/>
      <Experience/>
      <Projects/>
      <Footer/>
    </div>
  );
}

export default App;
