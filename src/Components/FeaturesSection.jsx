import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const FeaturesSection = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const videoRefs = [useRef(null), useRef(null), useRef(null)];
  
  // Feature data
  const features = [
    {
      id: 1,
      title: "ATS-Friendly Resume Scanner",
      description: "Our built-in ATS scanner analyzes your resume in real-time, ensuring it passes through applicant tracking systems with a high score. Get instant feedback and suggestions to optimize your resume for each job application.",
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      color: "from-blue-500 to-indigo-600",
      video: "https://example.com/videos/ats-scanner-demo.mp4",
      stats: [
        { value: "93%", label: "Higher interview rate" },
        { value: "2x", label: "More callbacks" },
        { value: "98%", label: "ATS pass rate" }
      ],
      features: [
        "Keyword optimization",
        "Format compatibility check",
        "Industry-specific scoring",
        "Recruiter eye-tracking simulation"
      ]
    },
    {
      id: 2,
      title: "AI Content Generator",
      description: "Transform your work experience into powerful, professional content with our AI-powered content generator. Simply input your basic information, and our AI will craft compelling bullet points and summaries tailored to your industry.",
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: "from-purple-500 to-indigo-600",
      video: "https://example.com/videos/ai-content-demo.mp4",
      stats: [
        { value: "85%", label: "Time saved" },
        { value: "3x", label: "More impactful content" },
        { value: "92%", label: "User satisfaction" }
      ],
      features: [
        "Industry-specific phrasing",
        "Action verb optimization",
        "Achievement quantification",
        "Skill-based content suggestions"
      ]
    },
    {
      id: 3,
      title: "AI Resume Assistant",
      description: "Get personalized guidance throughout your resume building process with our AI assistant. Receive real-time suggestions, feedback on your content, and expert tips to make your resume stand out to employers.",
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      color: "from-emerald-500 to-teal-600",
      video: "https://example.com/videos/ai-assistant-demo.mp4",
      stats: [
        { value: "78%", label: "Better quality resumes" },
        { value: "45%", label: "Higher completion rate" },
        { value: "4.8", label: "User rating" }
      ],
      features: [
        "Personalized improvement suggestions",
        "Content gap analysis",
        "Real-time feedback",
        "Industry expert recommendations"
      ]
    }
  ];

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  useEffect(() => {
    // Auto-rotate features every 6 seconds
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [features.length]);

  useEffect(() => {
    // Play video for active feature
    videoRefs.forEach((ref, index) => {
      if (ref.current) {
        if (index === activeFeature) {
          ref.current.play().catch(e => console.log("Video play prevented:", e));
        } else {
          ref.current.pause();
        }
      }
    });
  }, [activeFeature]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.span variants={itemVariants} className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
            POWERED BY AI
          </motion.span>
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Build better resumes with <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">intelligent features</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI-powered tools help you create professional, ATS-optimized resumes that stand out to employers
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Feature Navigation */}
          <motion.div 
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            className="lg:col-span-4 space-y-4"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                variants={itemVariants}
                className={`relative p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                  activeFeature === index 
                    ? `bg-white shadow-xl border-l-4 border-${feature.color.split(' ')[0].replace('from-', '')}-500` 
                    : 'bg-white/60 hover:bg-white hover:shadow-md'
                }`}
                onClick={() => setActiveFeature(index)}
              >
                <div className="flex items-start">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mr-4`}>
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{feature.title}</h3>
                    <p className={`text-sm ${activeFeature === index ? 'text-gray-600' : 'text-gray-500'} line-clamp-2`}>
                      {feature.description}
                    </p>
                  </div>
                </div>
                
                {activeFeature === index && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 pt-4 border-t border-gray-100"
                  >
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {feature.stats.map((stat, i) => (
                        <div key={i} className="text-center">
                          <div className={`text-xl font-bold bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                            {stat.value}
                          </div>
                          <div className="text-xs text-gray-500">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                    
                    <ul className="space-y-2">
                      {feature.features.map((item, i) => (
                        <li key={i} className="flex items-center text-sm text-gray-600">
                          <svg className="w-4 h-4 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
                
                {/* Active indicator */}
                {activeFeature === index && (
                  <motion.div 
                    layoutId="activeFeature"
                    className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-l-full"
                  />
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Feature Showcase */}
          <motion.div 
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            className="lg:col-span-8 relative"
          >
            <div className="relative rounded-2xl bg-white shadow-2xl overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
              <div className="absolute top-0 left-0 right-0 h-12 bg-gray-50 border-b border-gray-200 flex items-center px-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="mx-auto text-sm text-gray-500 font-medium">
                  {features[activeFeature].title} Demo
                </div>
              </div>
              
              <div className="pt-12 p-4">
                {features.map((feature, index) => (
                  <div 
                    key={feature.id} 
                    className={`transition-opacity duration-500 ${activeFeature === index ? 'block opacity-100' : 'hidden opacity-0'}`}
                  >
                    {/* Placeholder for video/demo content */}
                    <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden">
                      <video
                        ref={videoRefs[index]}
                        className="w-full h-full object-cover"
                        src={feature.video}
                        loop
                        muted
                        playsInline
                      >
                        {/* Fallback image if video doesn't load */}
                        <img 
                          src={`https://via.placeholder.com/800x450?text=${feature.title.replace(' ', '+')}`} 
                          alt={feature.title} 
                          className="w-full h-full object-cover"
                        />
                      </video>
                      
                      {/* Overlay with feature info */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center p-6 bg-black/50 backdrop-blur-sm rounded-lg max-w-md">
                          <h3 className="text-2xl font-bold text-white mb-2">{feature.title}</h3>
                          <p className="text-white/90">{feature.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-100 rounded-full opacity-50 blur-xl"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-purple-100 rounded-full opacity-50 blur-xl"></div>
          </motion.div>
        </div>
        
        {/* CTA Section */}
        <motion.div 
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="mt-20 text-center"
        >
          <motion.div variants={itemVariants} className="inline-block p-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 mb-8">
            <button className="px-8 py-3 bg-white rounded-full text-base font-medium text-blue-600 hover:bg-blue-50 transition-colors">
              Try Our AI Features Now
            </button>
          </motion.div>
          
          <motion.p variants={itemVariants} className="text-gray-500">
            Join 250,000+ professionals who've built successful resumes with our AI tools
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
