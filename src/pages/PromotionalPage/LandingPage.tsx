import { ArrowRight, Layout, FileEdit, Download, Check } from 'lucide-react';

function LandingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-beige-50 to-beige-100">
            <section className="text-center py-20">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-5xl font-extrabold text-beige-600 leading-tight mb-6">
                        Create a Stunning Resume in Minutes
                    </h1>
                    <p className="text-lg text-beige-600/80 mb-10">
                        Elevate your job applications with professionally designed, customizable resumes and cover letters.
                    </p>
                    <button className="bg-beige-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-beige-600 transition-colors flex items-center gap-2 mx-auto">
                        Start Building Now <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-white">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center text-beige-600 mb-12">
                        Why Choose Us?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="flex flex-col items-center bg-beige-50 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                            <Layout className="w-12 h-12 text-beige-500 mb-4" />
                            <h3 className="text-xl font-semibold text-beige-600">Beautiful Templates</h3>
                            <p className="text-beige-600/80 mt-2 text-center">
                                Handcrafted by experts, our templates are designed to make an impression.
                            </p>
                        </div>
                        <div className="flex flex-col items-center bg-beige-50 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                            <FileEdit className="w-12 h-12 text-beige-500 mb-4" />
                            <h3 className="text-xl font-semibold text-beige-600">Customizable Designs</h3>
                            <p className="text-beige-600/80 mt-2 text-center">
                                Tailor every section to match your skills and experience effortlessly.
                            </p>
                        </div>
                        <div className="flex flex-col items-center bg-beige-50 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                            <Download className="w-12 h-12 text-beige-500 mb-4" />
                            <h3 className="text-xl font-semibold text-beige-600">Instant Download</h3>
                            <p className="text-beige-600/80 mt-2 text-center">
                                Export your resume in PDF, DOCX, or other formats instantly.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Plans Section */}
            <section className="py-20 bg-gradient-to-b from-white to-beige-50">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center text-beige-600 mb-12">
                        Flexible Plans
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Free Plan */}
                        <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="text-2xl font-bold text-beige-600 mb-4">Free</h3>
                            <p className="text-beige-600/80 mb-6">
                                Ideal for exploring our platform.
                            </p>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center gap-3">
                                    <Check className="w-5 h-5 text-beige-500" />
                                    <span>1 Basic Template</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Check className="w-5 h-5 text-beige-500" />
                                    <span>Simple Editing Features</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Check className="w-5 h-5 text-beige-500" />
                                    <span>PDF Download</span>
                                </li>
                            </ul>
                            <button className="w-full py-3 px-6 border-2 border-beige-500 text-beige-600 rounded-full hover:bg-beige-100 transition-colors font-medium">
                                Get Started
                            </button>
                        </div>
                        {/* Premium Plan */}
                        <div className="bg-gradient-to-br from-beige-100 to-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                            <h3 className="text-2xl font-bold text-beige-600 mb-4">Premium</h3>
                            <p className="text-beige-600/80 mb-6">
                                Unlock advanced features for success.
                            </p>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center gap-3">
                                    <Check className="w-5 h-5 text-beige-500" />
                                    <span>All Templates</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Check className="w-5 h-5 text-beige-500" />
                                    <span>Advanced Editing</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Check className="w-5 h-5 text-beige-500" />
                                    <span>Multiple File Formats</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Check className="w-5 h-5 text-beige-500" />
                                    <span>Priority Support</span>
                                </li>
                            </ul>
                            <button className="w-full py-3 px-6 bg-beige-500 text-white rounded-full hover:bg-beige-600 transition-colors font-medium">
                                Upgrade Now
                            </button>
                        </div>
                        {/* Enterprise Plan */}
                        <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="text-2xl font-bold text-beige-600 mb-4">Enterprise</h3>
                            <p className="text-beige-600/80 mb-6">
                                Designed for organizations and teams.
                            </p>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center gap-3">
                                    <Check className="w-5 h-5 text-beige-500" />
                                    <span>Team Collaboration</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Check className="w-5 h-5 text-beige-500" />
                                    <span>Custom Templates</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Check className="w-5 h-5 text-beige-500" />
                                    <span>Analytics Dashboard</span>
                                </li>
                            </ul>
                            <button className="w-full py-3 px-6 border-2 border-beige-500 text-beige-600 rounded-full hover:bg-beige-100 transition-colors font-medium">
                                Contact Sales
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default LandingPage;
