import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Slide } from '../../components/Slide';
import { Navigation } from '../../components/Navigation';
import { MarketChart } from '../../components/MarketChart';
import {
  Rocket,
  Users,
  DollarSign,
  Building,
  LineChart,
  Zap,
  Shield,
  Star,
  Code,
  Sparkles,
  Clock,
  Target,
  Trophy,
  FileText,
  Mail,
  UserCheck,
} from 'lucide-react';

function PresentaionSlides() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, 6));
  };

  const previousSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        previousSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navigate = useNavigate()
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center" />

      <div className="relative w-full h-screen">
        {/* Slide 1: Team & Project */}
        <Slide isActive={currentSlide === 0}>
          <div className="flex flex-col items-center justify-center h-full px-8 text-center">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <h1 className="text-7xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                <Star className="w-12 h-12 text-yellow-400" />
                IdeaSmiths
                <Star className="w-12 h-12 text-yellow-400" />
              </h1>
              <h2 className="text-4xl font-semibold text-white/90">presents</h2>
            </motion.div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-12"
            >
              <div className="flex items-center justify-center gap-4 mb-4">
                <Rocket className="w-16 h-16 text-blue-400" />
                <h2 className="text-6xl font-bold text-white">ProfileCraft</h2>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 transform hover:scale-105 transition-transform">
                <div className="relative w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden border-4 border-purple-400">
                  <img
                    src="https://res.cloudinary.com/dhijllt3x/image/upload/v1737786511/WhatsApp_Image_2025-01-25_at_12.27.01_PM_b7rypm.jpg"
                    alt="Affan Habib"
                    className="object-cover w-full h-full"
                  />
                </div>
                <p className="text-2xl font-bold text-white">Affan Habib</p>
                <p className="text-white/70 text-lg">Team Leader</p>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 transform hover:scale-105 transition-transform">
                <div className="relative w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden border-4 border-blue-400">
                  <img
                    src="https://res.cloudinary.com/dhijllt3x/image/upload/v1737786511/WhatsApp_Image_2025-01-25_at_12.18.19_PM_hmvasq.jpg"
                    alt="Tasnuva Hossain Tuba"
                    className="object-cover w-full h-full"
                  />
                </div>
                <p className="text-2xl font-bold text-white">Tasnuva Hossain Tuba</p>
                <p className="text-white/70 text-lg">Team Member</p>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 transform hover:scale-105 transition-transform">
                <div className="relative w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden border-4 border-pink-400">
                  <img
                    src="https://res.cloudinary.com/dhijllt3x/image/upload/v1737786511/WhatsApp_Image_2025-01-25_at_9.53.00_AM_fseosg.jpg"
                    alt="Mehnaz Ameer"
                    className="object-cover w-full h-full"
                  />
                </div>
                <p className="text-2xl font-bold text-white">Mahnaz Ameer</p>
                <p className="text-white/70 text-lg">Team Member</p>
              </div>
            </motion.div>
          </div>
        </Slide>

        {/* Slide 2: The Problem */}
        <Slide isActive={currentSlide === 1}>
          <div className="flex flex-col items-center justify-center h-full px-8 text-center">
            <motion.h2
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-5xl font-bold text-white mb-8"
            >
              The Problem
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl text-white/80 max-w-3xl mb-12"
            >
              At Bacbon Ltd, we struggle with quickly customizing project proposal
              resumes. Job seekers often lack guidance on crafting quality resumes,
              while talent hunters need smarter tools to discover the best candidates.
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl"
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                <Building className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-white mb-2">Project Proposals</h3>
                <p className="text-xl text-white/80">
                  Complex resume requirements slow down proposal submissions.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                <Users className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-white mb-2">Job Seekers</h3>
                <p className="text-xl text-white/80">
                  Lack of clear, guided customization makes resume-building difficult.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                <Target className="w-12 h-12 text-pink-400 mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-white mb-2">Talent Hunters</h3>
                <p className="text-xl text-white/80">
                  Inefficient filtering leads to missed top talent and slow hiring.
                </p>
              </div>
            </motion.div>
          </div>
        </Slide>

        {/* Slide 3: About ProfileCraft (Solution) */}
        <Slide isActive={currentSlide === 2}>
          <div className="flex flex-col items-center justify-center h-full px-8 text-center">
            <motion.h2
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-5xl font-bold text-white mb-8"
            >
              The solution
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl text-white/80 max-w-2xl mb-12"
            >
              An AI-driven platform designed to empower professionals across all
              industries. We provide end-to-end support for project-specific resumes,
              AI-powered resume optimization, and cover-letter creation—making it easy
              to tailor your PresentaionSlideslication for any opportunity.
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                  <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-white mb-2">AI-Powered</h3>
                  <p className="text-xl text-white/80">
                    Create resumes using voice commands and tailored suggestions.
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                  <Shield className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-white mb-2">Smart Filtering</h3>
                  <p className="text-xl text-white/80">
                    Advanced options to identify top talent quickly.
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                  <DollarSign className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-white mb-2">Affordable</h3>
                  <p className="text-xl text-white/80">
                    Competitive plans starting at $9.99/month.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                  <FileText className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-white mb-2">Project-Specific</h3>
                  <p className="text-xl text-white/80">
                    Easily tailor resumes and proposals to fit every unique project.
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                  <UserCheck className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-white mb-2">All Professionals</h3>
                  <p className="text-xl text-white/80">
                    Effective for every industry and level of expertise.
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                  <Mail className="w-12 h-12 text-pink-400 mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-white mb-2">Cover Letters</h3>
                  <p className="text-xl text-white/80">
                    Generate compelling cover letters to strengthen PresentaionSlideslications.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </Slide>

        {/* Slide 4: Market Analysis */}
       {/* Slide 4: Market Analysis */}
<Slide isActive={currentSlide === 3}>
  <div className="flex flex-col items-center justify-center h-full px-8">
    <motion.h2
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="text-5xl font-bold text-white mb-8"
    >
      Market Analysis
    </motion.h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full">
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white/10 rounded-xl p-6 backdrop-blur-lg"
      >
        <h3 className="text-3xl font-bold text-white mb-6">Market Growth</h3>
        <div className="h-64">
          <MarketChart />
        </div>
        <div className="mt-4 text-xl text-white/80">
          <p>Projected growth from $1.2B (2022) to $3.5B (2030)</p>
          <p className="text-green-400 font-semibold">CAGR: 13.7%</p>
        </div>
      </motion.div>
      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-white/10 rounded-xl p-6 backdrop-blur-lg"
      >
        <h3 className="text-3xl font-bold text-white mb-6">Key Trends</h3>
        <ul className="text-xl text-white/80 space-y-4">
          <li className="flex items-center gap-3">
            <Zap className="w-6 h-6 text-yellow-400" />
            <span>68% of companies will adopt AI in hiring by 2025.</span>
          </li>
          <li className="flex items-center gap-3">
            <Target className="w-6 h-6 text-blue-400" />
            <span>36% of recruiters use AI for resume matching.</span>
          </li>
          <li className="flex items-center gap-3">
            <Trophy className="w-6 h-6 text-purple-400" />
            <span>98% of Fortune 500 companies rely on ATS.</span>
          </li>
          <li className="flex items-center gap-3">
            <Star className="w-6 h-6 text-pink-400" />
            <span>
              Resumes tailored with generative AI increase success rates.
            </span>
          </li>
          <li className="flex items-center gap-3">
            <Users className="w-6 h-6 text-green-400" />
            <span>
              75% of executives prioritize diversity hiring initiatives.
            </span>
          </li>
        </ul>
      </motion.div>
    </div>
  </div>
</Slide>


        {/* Slide 5: How It Works */}
        <Slide isActive={currentSlide === 4}>
          <div className="flex flex-col items-center justify-center h-full px-8">
            <h2 className="text-5xl font-bold text-white mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white/10 rounded-xl p-6 backdrop-blur-lg"
              >
                <h3 className="text-3xl font-bold text-white mb-6">For Job Seekers</h3>
                <ul className="text-xl text-white/80 space-y-4">
                  <li className="flex items-center gap-3">
                    <div className="bg-blue-400/20 p-2 rounded-lg">
                      <Zap className="w-6 h-6 text-blue-400" />
                    </div>
                    <span>AI-powered resume generation</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="bg-green-400/20 p-2 rounded-lg">
                      <Users className="w-6 h-6 text-green-400" />
                    </div>
                    <span>Customizable templates</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="bg-yellow-400/20 p-2 rounded-lg">
                      <Shield className="w-6 h-6 text-yellow-400" />
                    </div>
                    <span>ATS optimization</span>
                  </li>
                </ul>
              </motion.div>
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-white/10 rounded-xl p-6 backdrop-blur-lg"
              >
                <h3 className="text-3xl font-bold text-white mb-6">For Employers</h3>
                <ul className="text-xl text-white/80 space-y-4">
                  <li className="flex items-center gap-3">
                    <div className="bg-purple-400/20 p-2 rounded-lg">
                      <LineChart className="w-6 h-6 text-purple-400" />
                    </div>
                    <span>Smart candidate filtering</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="bg-pink-400/20 p-2 rounded-lg">
                      <Building className="w-6 h-6 text-pink-400" />
                    </div>
                    <span>Project proposal automation</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </Slide>

        {/* Slide 6: Pricing Plans */}
       
        {/* Slide 7: Final Words & Navigation */}
        <Slide isActive={currentSlide === 5}>
          <div className="flex items-center justify-center h-full px-8 text-center">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center w-full max-w-3xl mx-auto"
            >
              <h2 className="text-5xl font-bold text-white mb-6">
                Shape Your Future With ProfileCraft
              </h2>
              <p className="text-2xl text-white/80 mb-8">
                Ready to transform your resume and land the opportunities you deserve?
              </p>
              <button
                onClick={() => navigate('/resume/preview')} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold rounded-full transition-colors"
              >
                Build Your Resume
              </button>
            </motion.div>
          </div>
        </Slide>

        <Navigation
          currentSlide={currentSlide}
          totalSlides={6}
          onPrevious={previousSlide}
          onNext={nextSlide}
        />
      </div>
    </div>
  );
}

export default PresentaionSlides;
