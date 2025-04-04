import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import Hero from './Components/Hero';
import ModernTemplatesShowcase from './Components/TemplatesShowcase';
import FeaturesSection from './Components/FeaturesSection';
import HowItWorks from './Components/HowItWorks';
import TemplateSelection from './Components/TemplateSelection';
import ResumeBuilder from './Components/ResumeBuilder';
import ResumeOptions from './Components/ResumeOptions';
import TestimonialsSection from './Components/TestimonialsSection';
import FAQSection from './Components/FAQSection';
import Footer from './Components/Footer';
import ATSScanner from './Components/ATSScanner';

import ErrorBoundary from './Components/ErrorBoundary';

function App() {


  return (
    <ErrorBoundary>
      <Router>
        <Navbar />
        <Routes>
          {/* Home Page */}
          <Route path="/ats-scanner" element={<ATSScanner />} />
          <Route path="/" element={
            <>
              <Hero />
              <ModernTemplatesShowcase />
              <FeaturesSection />
              <HowItWorks />
              <TestimonialsSection />
              <FAQSection />
              <Footer />
            </>
          } />
          
          {/* Resume Options Page - NEW */}
          <Route path="/builder" element={<ResumeOptions />} />
          
          {/* Template Selection Page */}
          <Route path="/templates" element={<TemplateSelection />} />
          
          {/* AI Resume Builder - will need to be created */}
          <Route path="/ai-builder" element={<ResumeBuilder aiAssisted={true} />} />
          
          {/* Resume Builder/Editor Page */}
          <Route path="/builder/edit" element={<ResumeBuilder />} />
          
          {/* Resume Builder Page */}
          <Route path="/resume-builder" element={<ResumeBuilder />} />
          
          {/* Resume Builder Page with template ID */}
          <Route path="/resume-builder/:templateId" element={<ResumeBuilder />} />
          
          {/* Fallback for any other routes */}
          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900">Page not found</h2>
                <p className="mt-2 text-gray-600">Sorry, we couldn't find the page you're looking for.</p>
              </div>
            </div>
          } />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;