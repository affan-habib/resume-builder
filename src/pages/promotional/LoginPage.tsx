import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { signInWithGoogle } from '../../auth/authFunctions';

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/resume/preview'; // Default route after login

    const handleGoogleSignIn = async () => {
        try {
            const user = await signInWithGoogle(dispatch);
            console.log('User Info:', user);

            // Redirect to the intended route
            navigate(from, { replace: true });
        } catch (error) {
            console.error('Error during Google Sign-In:', error);
            alert('Failed to sign in with Google. Please try again.');
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-beige-100"
            style={{
                backgroundImage: 'linear-gradient(to bottom, #F9F6F0, #F3EDE2)',
            }}
        >
            <div className="w-full max-w-md bg-beige-50 rounded-lg shadow-2xl p-8">
                <h2 className="text-3xl font-extrabold text-center text-beige-600 mb-6">
                    Welcome Back
                </h2>
                <form>
                    {/* Email Field */}
                    <div className="mb-6">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-beige-500 mb-2"
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border border-beige-300 rounded-lg bg-beige-50 text-beige-700 focus:outline-none focus:ring-2 focus:ring-beige-400 shadow-sm"
                        />
                    </div>

                    {/* Password Field */}
                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-beige-500 mb-2"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 border border-beige-300 rounded-lg bg-beige-50 text-beige-700 focus:outline-none focus:ring-2 focus:ring-beige-400 shadow-sm"
                        />
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-beige-400 hover:bg-beige-500 text-beige-50 font-semibold py-2 px-4 rounded-lg transition-all duration-300 shadow-md"
                    >
                        Log In
                    </button>

                    {/* Forgot Password */}
                    <div className="text-center mt-4">
                        <a
                            href="#"
                            className="text-beige-500 text-sm hover:text-beige-600 underline"
                        >
                            Forgot Password?
                        </a>
                    </div>
                </form>

                {/* Divider */}
                <div className="flex items-center my-6">
                    <div className="flex-grow border-t border-beige-300"></div>
                    <span className="px-2 text-beige-500 text-sm">OR</span>
                    <div className="flex-grow border-t border-beige-300"></div>
                </div>

                {/* Google Login */}
                <div>
                    <button
                        onClick={handleGoogleSignIn} // Connect function here
                        className="flex items-center justify-center w-full bg-white border border-beige-300 hover:bg-beige-200 text-beige-600 font-semibold py-2 px-4 rounded-lg transition-all duration-300 shadow-md"
                    >
                        <img
                            src="https://www.svgrepo.com/show/355037/google.svg"
                            alt="Google Icon"
                            className="w-5 h-5 mr-2"
                        />
                        Sign in with Google
                    </button>
                </div>

                {/* Sign Up */}
                <div className="text-center mt-6">
                    <p className="text-beige-500 text-sm">
                        Don’t have an account?{' '}
                        <a
                            href="#"
                            className="text-beige-600 font-semibold hover:underline"
                        >
                            Sign Up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
