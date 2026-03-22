import { Link } from 'react-router-dom';
import { FaLeaf } from 'react-icons/fa';
import { useState } from 'react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-4 z-50 px-4">
      <div className="mx-auto w-fit">
        <div className="bg-gradient-to-r from-emerald-50/65 via-blue-50/65 to-teal-50/65 backdrop-blur-xl border border-white/60 shadow-lg shadow-primary-blue/10 rounded-2xl px-4 sm:px-6">
          <div className="flex justify-between items-center h-16 gap-6 sm:gap-10">
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
              <a href="/contact" className="border-2 border-primary-blue text-primary-blue px-4 py-2 rounded-xl hover:bg-primary-blue hover:text-white transition">
                Contact Us
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
              <span className="text-2xl">☰</span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-2 bg-gradient-to-r from-emerald-50/80 via-blue-50/80 to-teal-50/80 backdrop-blur-xl border border-white/60 shadow-lg shadow-primary-blue/10 rounded-2xl px-4 py-3 space-y-2">
            <Link to="/" className="block py-2 text-text-secondary hover:text-primary-green" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link to="/analyze" className="block py-2 text-text-secondary hover:text-primary-green" onClick={() => setIsOpen(false)}>
              Analyze
            </Link>
            <Link to="/about" className="block py-2 text-text-secondary hover:text-primary-green" onClick={() => setIsOpen(false)}>
              About
            </Link>
            <Link to="/contact" className="block border-2 border-primary-blue text-primary-blue px-4 py-2 rounded-lg hover:bg-primary-blue hover:text-white transition w-fit" onClick={() => setIsOpen(false)}>
              Contact Us
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;