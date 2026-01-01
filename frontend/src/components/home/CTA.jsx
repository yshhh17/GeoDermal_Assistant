import { Link } from 'react-router-dom';
import { FaLeaf } from 'react-icons/fa';

function CTA() {
  return (
    <section className="bg-gradient-to-r from-bg-secondary to-bg-accent py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center relative overflow-hidden">
          {/* Decorative elements */}
          <FaLeaf className="absolute top-4 right-4 text-6xl text-primary-green opacity-10" />
          <FaLeaf className="absolute bottom-4 left-4 text-6xl text-primary-green opacity-10" />

          <h2 className="text-4xl font-bold text-text-primary mb-4">
            Ready to Protect Your Skin?
          </h2>
          
          <p className="text-xl text-text-secondary mb-8">
            Get personalized skincare recommendations for your next trip
          </p>

          <Link 
            to="/analyze"
            className="inline-block bg-primary-green text-white px-10 py-4 rounded-xl text-lg font-semibold hover:shadow-xl transform hover:-translate-y-1 transition duration-200"
          >
            Start Your Analysis →
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CTA