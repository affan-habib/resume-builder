import { ArrowRight, CheckCircle, Star, FileEdit, Layout, Download, Check, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-beige-50">
            {/* <NavBar /> */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
                <div className="text-center mt-20">
                    <h1 className="text-5xl font-bold text-beige-600 mb-6">
                        Create Your Professional Resume<br />in Minutes
                    </h1>
                    <p className="text-xl text-beige-600/80 mb-8 max-w-2xl mx-auto">
                        Build beautiful, professional resumes with our intuitive builder. Stand out from the crowd and land your dream job.
                    </p>
                    <button 
                        onClick={() => navigate('/resume/preview')}
                        className="bg-beige-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-beige-600 transition-colors flex items-center gap-2 mx-auto"
                    >
                        Create Your Resume <ArrowRight className="w-5 h-5" />
                    </button>
                </div>

                {/* Trust Indicators */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                        <Star className="w-8 h-8 text-beige-500 mb-4" />
                        <h3 className="text-xl font-semibold mb-2 text-beige-600">Professional Templates</h3>
                        <p className="text-beige-600/80">Crafted by professional designers and HR experts</p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                        <CheckCircle className="w-8 h-8 text-beige-500 mb-4" />
                        <h3 className="text-xl font-semibold mb-2 text-beige-600">ATS-Friendly</h3>
                        <p className="text-beige-600/80">Optimized to pass Applicant Tracking Systems</p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                        <Sparkles className="w-8 h-8 text-beige-500 mb-4" />
                        <h3 className="text-xl font-semibold mb-2 text-beige-600">Easy to Use</h3>
                        <p className="text-beige-600/80">Simple drag-and-drop interface for quick editing</p>
                    </div>
                </div>

                {/* How It Works */}
                <div className="mt-32">
                    <h2 className="text-3xl font-bold text-center mb-20 text-beige-600">Your Journey to the Perfect Resume</h2>
                    <div className="space-y-12 max-w-4xl mx-auto">
                        {/* Step 1 */}
                        <div className="flex items-center gap-12 group">
                            <div className="w-1/2">
                                <div className="bg-white p-8 rounded-2xl shadow-sm group-hover:shadow-md transition-shadow">
                                    <div className="w-16 h-16 bg-beige-200 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-beige-300 transition-colors">
                                        <Layout className="w-8 h-8 text-beige-600" />
                                    </div>
                                    <h3 className="text-2xl font-semibold mb-4 text-beige-600">Choose Your Template</h3>
                                    <p className="text-beige-600/80">Browse through our collection of professionally designed templates. Each one is crafted to highlight your unique strengths.</p>
                                </div>
                            </div>
                            <div className="w-1/2 hidden md:block opacity-95 group-hover:opacity-100 transition-opacity">
                                <img src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=500" alt="Resume template selection" className="rounded-2xl shadow-lg" />
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex items-center gap-12 group">
                            <div className="w-1/2 hidden md:block opacity-95 group-hover:opacity-100 transition-opacity">
                                <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=500" alt="Resume editing" className="rounded-2xl shadow-lg" />
                            </div>
                            <div className="w-1/2">
                                <div className="bg-white p-8 rounded-2xl shadow-sm group-hover:shadow-md transition-shadow">
                                    <div className="w-16 h-16 bg-beige-200 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-beige-300 transition-colors">
                                        <FileEdit className="w-8 h-8 text-beige-600" />
                                    </div>
                                    <h3 className="text-2xl font-semibold mb-4 text-beige-600">Customize Your Content</h3>
                                    <p className="text-beige-600/80">Our intuitive editor makes it easy to add your experience, skills, and achievements. Smart suggestions help you write compelling content.</p>
                                </div>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="flex items-center gap-12 group">
                            <div className="w-1/2">
                                <div className="bg-white p-8 rounded-2xl shadow-sm group-hover:shadow-md transition-shadow">
                                    <div className="w-16 h-16 bg-beige-200 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-beige-300 transition-colors">
                                        <Download className="w-8 h-8 text-beige-600" />
                                    </div>
                                    <h3 className="text-2xl font-semibold mb-4 text-beige-600">Download & Apply</h3>
                                    <p className="text-beige-600/80">Export your polished resume in multiple formats. Your professional journey begins with a single click.</p>
                                </div>
                            </div>
                            <div className="w-1/2 hidden md:block opacity-95 group-hover:opacity-100 transition-opacity">
                                <img src="https://images.unsplash.com/photo-1542626991-cbc4e32524cc?auto=format&fit=crop&q=80&w=500" alt="Resume download" className="rounded-2xl shadow-lg" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Plans Section */}
                <div className="mt-32">
                    <h2 className="text-3xl font-bold text-center mb-4 text-beige-600">Choose Your Path</h2>
                    <p className="text-beige-600/80 text-center mb-16">Select the plan that best fits your career goals</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {/* Basic Plan */}
                        <div className="bg-white p-10 rounded-2xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <h3 className="text-2xl font-semibold text-beige-600">Basic</h3>
                                    <p className="text-beige-600/80 mt-1">Perfect for getting started</p>
                                </div>
                                <p className="text-3xl font-bold text-beige-600">Free</p>
                            </div>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-center gap-3">
                                    <Check className="w-5 h-5 text-beige-500" />
                                    <span className="text-beige-600">1 Professional Template</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Check className="w-5 h-5 text-beige-500" />
                                    <span className="text-beige-600">Basic Editor Features</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Check className="w-5 h-5 text-beige-500" />
                                    <span className="text-beige-600">PDF Download</span>
                                </li>
                            </ul>
                            <button className="w-full py-3 px-6 border-2 border-beige-500 text-beige-600 rounded-full hover:bg-beige-100 transition-colors font-semibold">
                                Get Started
                            </button>
                        </div>

                        {/* Premium Plan */}
                        <div className="bg-gradient-to-br from-beige-200 to-white p-10 rounded-2xl shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <h3 className="text-2xl font-semibold text-beige-600">Premium</h3>
                                    <p className="text-beige-600/80 mt-1">For serious job seekers</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-3xl font-bold text-beige-600">$12</p>
                                    <p className="text-sm text-beige-600/80">per month</p>
                                </div>
                            </div>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-center gap-3">
                                    <Check className="w-5 h-5 text-beige-500" />
                                    <span className="text-beige-600">All Premium Templates</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Check className="w-5 h-5 text-beige-500" />
                                    <span className="text-beige-600">Advanced Editor & AI Assistant</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Check className="w-5 h-5 text-beige-500" />
                                    <span className="text-beige-600">Multiple Export Formats</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Check className="w-5 h-5 text-beige-500" />
                                    <span className="text-beige-600">Cover Letter Builder</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Check className="w-5 h-5 text-beige-500" />
                                    <span className="text-beige-600">Priority Support</span>
                                </li>
                            </ul>
                            <button className="w-full py-3 px-6 bg-beige-500 text-white rounded-full hover:bg-beige-600 transition-colors font-semibold">
                                Upgrade to Premium
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
