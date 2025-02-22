import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = [
        { title: 'Templates', href: '#' },
        { title: 'Features', href: '#' },
        { title: 'Pricing', href: '#' },
    ];

    const handleClick = (href) => {
        setIsOpen(false);
        if (href.startsWith('#')) {
            if (location.pathname !== '/') {
                navigate(`/${href}`);
            } else {
                const element = document.querySelector(href);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }
    };

    return (
        <nav className="fixed top-5 left-0 right-0 w-full z-50 bg-beige-400/50 backdrop-blur-md border-b border-gray-200 rounded-full max-w-7xl mx-auto">
            <div className="flex justify-between h-16 px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
                    <FileText className="h-8 w-8 text-beige-500" />
                    <span className="ml-2 text-xl font-bold text-beige-600">Talent-Tuner</span>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    {menuItems.map((item) => (
                        <a
                            key={item.title}
                            href={location.pathname === '/resume' ? `/${item.href}` : item.href}
                            onClick={() => handleClick(item.href)}
                            className="text-beige-900 transition-colors"
                        >
                            {item.title}
                        </a>
                    ))}
                    <Link
                        to="/resume/preview"
                        className="px-6 py-2 text-sm font-medium rounded-full text-white bg-beige-500 hover:bg-beige-600 transition-colors"
                    >
                        Get Started
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <div className="flex items-center md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 rounded-lg hover:bg-gray-100"
                    >
                        {isOpen ? (
                            <X className="w-6 h-6 text-beige-600" />
                        ) : (
                            <Menu className="w-6 h-6 text-beige-600" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-beige-50/80 backdrop-blur-md border-b border-gray-200 rounded-xl shadow-lg"
                    >
                        <div className="px-4 py-3 space-y-1">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.title}
                                    to={location.pathname === '/resume' ? `/${item.href}` : item.href}
                                    onClick={() => handleClick(item.href)}
                                    className="block px-3 py-2 rounded-md text-base font-medium text-beige-600/80 hover:text-beige-600 transition-colors"
                                >
                                    {item.title}
                                </Link>
                            ))}
                            <Link
                                to="/resume/preview"
                                className="block w-full text-center px-4 py-2 text-sm font-medium rounded-full text-white bg-beige-500 hover:bg-beige-600 transition-colors"
                            >
                                Get Started
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default NavBar;
