import { Link } from 'react-router-dom';
import { FaLeaf } from 'react-icons/fa';

function Navbar() {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <FaLeaf className="text-primary-green text-2xl" />
            <span className="text-xl font-bold text-text-primary">GeoDermal</span>
          </Link>

          {/* Nav Links */}
          <div className="flex items-center space-x-8">
            <Link to="/analyze" className="text-text-secondary hover:text-primary-green transition">
              Analyze
            </Link>
            <Link to="/" className="text-text-secondary hover:text-primary-green transition">
              About
            </Link>
            <button className="border-2 border-primary-blue text-primary-blue px-4 py-2 rounded-lg hover:bg-primary-blue hover:text-white transition">
              Login
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar