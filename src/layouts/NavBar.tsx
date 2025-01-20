import { useState } from 'react';
import { Menu, X, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <nav className="bg-white shadow-sm fixed w-full z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
                        <FileText className="h-8 w-8 text-beige-500" />
                        <span className="ml-2 text-xl font-bold text-beige-600">ResumeBuilder</span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#" className="text-beige-600/80 hover:text-beige-600 transition-colors">
                            Templates
                        </a>
                        <a href="#" className="text-beige-600/80 hover:text-beige-600 transition-colors">
                            Features
                        </a>
                        <a href="#" className="text-beige-600/80 hover:text-beige-600 transition-colors">
                            Pricing
                        </a>
                        <button
                            onClick={() => navigate('/resume/preview')}
                            className="bg-beige-500 text-white px-6 py-2 rounded-full hover:bg-beige-600 transition-colors"
                        >
                            Get Started
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-beige-600/80 hover:text-beige-600 focus:outline-none"
                            aria-label="Toggle Menu"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white shadow-md">
                    <div className="px-4 py-3 space-y-2">
                        <a href="#" className="block text-beige-600/80 hover:text-beige-600 px-3 py-2 rounded-md">
                            Templates
                        </a>
                        <a href="#" className="block text-beige-600/80 hover:text-beige-600 px-3 py-2 rounded-md">
                            Features
                        </a>
                        <a href="#" className="block text-beige-600/80 hover:text-beige-600 px-3 py-2 rounded-md">
                            Pricing
                        </a>
                        <button
                            onClick={() => navigate('/resume/preview')}
                            className="block w-full bg-beige-500 text-white py-2 rounded-full text-center hover:bg-beige-600 transition-colors"
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default NavBar;
