import { FaLeaf, FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-text-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <FaLeaf className="text-primary-green text-2xl" />
              <span className="text-xl font-bold">GeoDermal</span>
            </div>
            <p className="text-text-muted text-sm">
              Empowering your skin and hair health on every journey
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-bold mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-text-muted">
              <li><Link to="/analyze" className="hover:text-primary-green transition">Analysis</Link></li>
              <li><Link to="/#features" className="hover:text-primary-green transition">Features</Link></li>
              <li><Link to="/how-it-works" className="hover:text-primary-green transition">How it Works</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-text-muted">
              <li><Link to="/about" className="hover:text-primary-green transition">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary-green transition">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-primary-green transition">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/yshhh17" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-2xl hover:text-primary-green transition"
              >
                <FaGithub />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-2xl hover:text-primary-green transition"
              >
                <FaTwitter />
              </a>
              <a 
                href="https://www.linkedin.com/in/yash-tiwari-b36343289" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-2xl hover:text-primary-green transition"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-text-muted">
          <p>© 2026 GeoDermal Assistant. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;