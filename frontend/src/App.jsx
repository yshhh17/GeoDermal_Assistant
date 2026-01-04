import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Analyze from './pages/Analyze';
import Results from './pages/Results';
import About from './pages/About';
import HowItWorks from './pages/HowItWorks';
import Privacy from './pages/Privacy';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="bg-bg-main min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analyze" element={<Analyze />} />
          <Route path="/results" element={<Results />} />
          <Route path="/about" element={<About />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App