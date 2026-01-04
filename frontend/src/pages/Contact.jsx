import { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { FaEnvelope, FaGithub, FaLinkedin, FaTwitter, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email:  '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target. name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create mailto link with form data
    const mailtoLink = `mailto:yshhh173@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    
    window.location.href = mailtoLink;
    
    // Show success message
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-secondary to-bg-accent">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-primary-green rounded-full mb-4">
            <FaEnvelope className="text-5xl text-white" />
          </div>
          <h1 className="text-5xl font-bold text-text-primary mb-4">
            Get In Touch
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Have questions, feedback, or suggestions? We'd love to hear from you! 
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-text-primary mb-6">Send Us a Message</h2>
            
            {submitted && (
              <div className="bg-status-success/10 border-2 border-status-success rounded-xl p-4 mb-6 flex items-center">
                <FaCheckCircle className="text-status-success text-2xl mr-3" />
                <span className="text-status-success font-semibold">Message sent!  We'll get back to you soon. </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-green focus:outline-none transition"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData. email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-green focus: outline-none transition"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-green focus:outline-none transition"
                  placeholder="How can we help?"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-green focus:outline-none transition resize-none"
                  placeholder="Tell us what's on your mind..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary-green text-white py-4 rounded-lg font-semibold text-lg hover:shadow-lg transform hover:-translate-y-1 transition duration-200 flex items-center justify-center group"
              >
                <span>Send Message</span>
                <FaPaperPlane className="ml-3 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>

          {/* Contact Info & Social */}
          <div className="space-y-6">
            {/* Direct Contact */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-text-primary mb-6">Direct Contact</h2>
              
              <div className="space-y-4">
                <a
                  href="mailto:yshhh173@gmail.com"
                  className="flex items-center p-4 bg-bg-secondary rounded-xl hover:shadow-md transition group"
                >
                  <div className="bg-primary-green p-3 rounded-lg mr-4 group-hover:scale-110 transition">
                    <FaEnvelope className="text-2xl text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-text-primary">Email</div>
                    <div className="text-text-secondary">yshhh173@gmail.com</div>
                  </div>
                </a>

                <a
                  href="https://github.com/yshhh17/GeoDermal_Assistant"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 bg-bg-secondary rounded-xl hover:shadow-md transition group"
                >
                  <div className="bg-text-primary p-3 rounded-lg mr-4 group-hover:scale-110 transition">
                    <FaGithub className="text-2xl text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-text-primary">GitHub</div>
                    <div className="text-text-secondary">@yshhh17</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-gradient-to-r from-primary-green to-primary-blue text-white rounded-3xl shadow-xl p-8">
              <h2 className="text-2xl font-bold mb-4">Connect With Us</h2>
              <p className="mb-6">Follow our journey and stay updated with the latest features</p>
              
              <div className="flex gap-4">
                <a
                  href="https://github.com/yshhh17"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/20 p-4 rounded-xl hover:bg-white/30 transition"
                >
                  <FaGithub className="text-3xl" />
                </a>
                <a
                  href="https://www.linkedin.com/in/yash-tiwari-b36343289"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/20 p-4 rounded-xl hover:bg-white/30 transition"
                >
                  <FaLinkedin className="text-3xl" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/20 p-4 rounded-xl hover:bg-white/30 transition"
                >
                  <FaTwitter className="text-3xl" />
                </a>
              </div>
            </div>

            {/* FAQ Quick Links */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">Quick Links</h2>
              <div className="space-y-3">
                <a href="/about" className="block text-primary-green hover:text-primary-blue transition font-semibold">
                  → About Us
                </a>
                <a href="/how-it-works" className="block text-primary-green hover:text-primary-blue transition font-semibold">
                  → How It Works
                </a>
                <a href="/privacy" className="block text-primary-green hover:text-primary-blue transition font-semibold">
                  → Privacy Policy
                </a>
                <a href="https://github.com/yshhh17/GeoDermal_Assistant" target="_blank" rel="noopener noreferrer" className="block text-primary-green hover:text-primary-blue transition font-semibold">
                  → View on GitHub
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Response Time */}
        <div className="mt-8 bg-white rounded-3xl shadow-xl p-6 text-center">
          <p className="text-text-secondary">
            <span className="font-semibold text-primary-green">💬 Average Response Time:</span> We typically respond within 24-48 hours
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Contact;