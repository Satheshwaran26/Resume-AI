import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar'
import Hero from './Components/Hero'
import TemplatesShowcase from './Components/TemplatesShowcase'
import FeaturesSection from './Components/FeaturesSection'
import HowItWorks from './Components/HowItWorks'
import TemplateSelection from './Components/TemplateSelection'
import ResumeBuilder from './Components/ResumeBuilder'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Home Page */}
        <Route path="/" element={
          <>
            <Hero />
            <TemplatesShowcase />
            <FeaturesSection />
            <HowItWorks />
          </>
        } />
        
        {/* Template Selection Page */}
        <Route path="/templates" element={<TemplateSelection />} />
        
        {/* Initial Create Resume Button redirects to template selection */}
        <Route path="/builder" element={<TemplateSelection />} />
        
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
    </BrowserRouter>
  )
}

export default App