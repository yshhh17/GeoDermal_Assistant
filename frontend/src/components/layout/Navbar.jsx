import { Link } from 'react-router-dom';
import { FaLeaf } from 'react-icons/fa';
import { useState } from 'react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <FaLeaf className="text-primary-green text-2xl" />
            <span className="text-xl font-bold text-text-primary">GeoDermal</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-text-secondary hover:text-primary-green transition">
              Home
            </Link>
            <Link to="/analyze" className="text-text-secondary hover:text-primary-green transition">
              Analyze
            </Link>
            <Link to="/about" className="text-text-secondary hover:text-primary-green transition">
              About
            </Link>
            <a href="#contact" className="border-2 border-primary-blue text-primary-blue px-4 py-2 rounded-lg hover:bg-primary-blue hover:text-white transition">
              Contact Us
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
            <span className="text-2xl">☰</span>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link to="/" className="block py-2 text-text-secondary hover:text-primary-green" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link to="/analyze" className="block py-2 text-text-secondary hover:text-primary-green" onClick={() => setIsOpen(false)}>
              Analyze
            </Link>
            <Link to="/about" className="block py-2 text-text-secondary hover:text-primary-green" onClick={() => setIsOpen(false)}>
              About
            </Link>
            <a href="#contact" className="block border-2 border-primary-blue text-primary-blue px-4 py-2 rounded-lg hover:bg-primary-blue hover:text-white transition w-fit" onClick={() => setIsOpen(false)}>
              Contact Us
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;