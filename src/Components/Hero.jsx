import { FaFileAlt } from 'react-icons/fa'
import { FaRocket } from 'react-icons/fa'
import { FaMagic } from 'react-icons/fa'
import { FaShieldAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const features = [
  { 
    text: 'ATS-Friendly Templates',
    icon: <FaShieldAlt className="h-6 w-6" />,
  },
  { 
    text: 'AI-Powered Content',
    icon: <FaMagic className="h-6 w-6" />,
  },
  { 
    text: 'Professional Design',
    icon: <FaRocket className="h-6 w-6" />,
  }
]

const Hero = () => {
  const handleStartBuilding = () => {
    // Any tracking or analytics could go here
    console.log("User started the resume building process");
  }

  const handleViewTemplates = () => {
    // TODO: Implement view templates functionality
    console.log('View templates clicked')
  }

  return (
    <section className="relative min-h-svh pt-32 flex items-center justify-center overflow-hidden bg-white">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Animated Gradient Orbs */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-24 left-1/4 w-[800px] h-[800px] bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-1/4 right-1/4 w-[800px] h-[800px] bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-[800px] h-[800px] bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e5_1px,transparent_1px),linear-gradient(to_bottom,#4f46e5_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_110%)] opacity-5"></div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
         <div className="inline-flex items-center font-normal space-x-2 px-4 py-2 rounded-full bg-blur  mb-6 shadow-sm border border-gray-400/20">
          <FaFileAlt className="h-4 w-4" />
          <span className="text-sm font-light">AI-Powered Resume Builder</span>
        </div>

        {/* Animated Main Heading */}
        <h1 className="text-[3.3em] md:text-8xl max-w-7xl font-extralight text-gray-900 mb-8 leading-tight animate-slide-up">
          Create Your Perfect Resume with{' '}
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
            AI
          </span>
        </h1>

        {/* Animated Subheading */}
        <p className="text-lg md:text-lg text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto animate-slide-up animation-delay-200">
          Build stunning resumes in minutes using our AI-powered platform. Get hired faster with ATS-friendly templates and smart content suggestions.
        </p>

        {/* Animated CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Link
            to="/builder"
            className="px-6 py-3 rounded-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition duration-200"
            onClick={handleStartBuilding}
          >
            Start Building Your Resume
          </Link>
          <button 
            onClick={handleViewTemplates}
            className="px-6 py-3 rounded-lg font-medium text-indigo-600 border border-indigo-600 hover:bg-indigo-50 transition duration-200"
          >
            View Templates
          </button>
        </div>

        {/* Animated Features */}
        <div className="flex flex-wrap justify-center gap-6 text-gray-700 mb-10">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex items-center space-x-3  px-4 py-2 rounded-lg shadow-sm "
            >
              <div className="p-2 rounded-full bg-indigo-100 text-indigo-600">
                {feature.icon}
              </div>
              <span className="font-medium">{feature.text}</span>
            </div>
          ))}
        </div>

        

        {/* Trusted Brands */}
        <div className="mt-28 animate-slide-up animation-delay-1000">
          <h3 className="text-gray-500 font-medium text-lg mb-10">Trusted By Professionals From</h3>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center">
            {[
              {name: 'Google', src: '/logos/google.svg'},
              {name: 'Microsoft', src: '/logos/microsoft.svg'},
              {name: 'Apple', src: '/logos/apple.svg'},
              {name: 'Amazon', src: '/logos/amazon.svg'},
              {name: 'Meta', src: '/logos/meta.svg'},
              {name: 'Netflix', src: '/logos/netflix.svg'}
            ].map((brand, index) => (
              <div key={index} className="flex justify-center">
                <div className="h-8 opacity-70 hover:opacity-100 transition-opacity duration-300">
                  {/* You can replace this with actual logo images */}
                  <div className="text-gray-700 text-2xl font-semibold">{brand.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero